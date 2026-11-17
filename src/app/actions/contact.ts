"use server";

import type { ContactField, ContactState } from "@/lib/contact";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // The form says which language it was shown in, so the reply matches it.
  const lang = String(formData.get("lang") ?? "");
  const t = getDictionary(hasLocale(lang) ? lang : "en").contactAction;
  const values: Partial<Record<ContactField, string>> = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    need: String(formData.get("need") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot: real people leave this empty. Answer as if it succeeded.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: t.honeypot };
  }

  const errors: NonNullable<ContactState["errors"]> = {};
  if (!values.name) errors.name = t.nameRequired;
  if (!values.email) {
    errors.email = t.emailRequired;
  } else if (!EMAIL.test(values.email)) {
    errors.email = t.emailInvalid;
  }
  if (!values.message) {
    errors.message = t.messageRequired;
  } else if (values.message.length < 20) {
    errors.message = t.messageShort;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: t.checkFields,
      errors,
      values,
    };
  }

  const webhook = process.env.N8N_CONTACT_WEBHOOK_URL;

  // Without a webhook the message cannot be delivered. Preserve the form and
  // tell the visitor instead of showing a false success confirmation.
  if (!webhook) {
    console.warn(
      "[contact] N8N_CONTACT_WEBHOOK_URL is not set; submission was not delivered",
    );
    return {
      status: "error",
      message: t.notConfigured(site.email, site.phone.display),
      values,
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        source: String(formData.get("source") ?? "website"),
        lang: hasLocale(lang) ? lang : "en",
        submittedAt: new Date().toISOString(),
      }),
      // Never let a slow automation hang the form.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}`);
    }

    // The automation reports a rejection in the body, and depending on the n8n
    // version it may still answer 200. Treat an explicit `ok: false` as a
    // failure so the visitor is never told a dropped message was delivered.
    const raw = await response.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = raw ? JSON.parse(raw) : null;
    } catch {
      payload = null;
    }

    if (
      payload !== null &&
      typeof payload === "object" &&
      (payload as { ok?: unknown }).ok === false
    ) {
      throw new Error(`Webhook rejected the submission: ${raw.slice(0, 200)}`);
    }
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message: t.failed(site.email),
      values,
    };
  }

  return {
    status: "success",
    message: t.success,
  };
}
