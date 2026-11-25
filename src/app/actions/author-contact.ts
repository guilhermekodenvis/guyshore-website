"use server";

import type {
  AuthorContactField,
  AuthorContactState,
} from "@/lib/author-contact";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A person needs a few seconds to read the form and type a message. */
const MIN_FILL_MS = 3000;

/**
 * "Talk to the author" from a blog post. Posts to its own n8n workflow
 * (`N8N_AUTHOR_WEBHOOK_URL`, see automation/README.md), which emails the team
 * and sends the visitor a copy of their message with business@ in cc.
 */
export async function contactAuthor(
  _prev: AuthorContactState,
  formData: FormData,
): Promise<AuthorContactState> {
  const lang = String(formData.get("lang") ?? "");
  const locale = hasLocale(lang) ? lang : "en";
  const t = getDictionary(locale).authorContact;
  const values: Partial<Record<AuthorContactField, string>> = {
    name: String(formData.get("name") ?? "").trim().slice(0, 120),
    email: String(formData.get("email") ?? "").trim().slice(0, 200),
    message: String(formData.get("message") ?? "").trim().slice(0, 5000),
  };

  const errors: NonNullable<AuthorContactState["errors"]> = {};
  if (!values.name) errors.name = t.nameRequired;
  if (!values.email) errors.email = t.emailRequired;
  else if (!EMAIL.test(values.email)) errors.email = t.emailInvalid;
  if (!values.message) errors.message = t.messageRequired;
  else if (values.message.length < 20) errors.message = t.messageShort;

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: t.checkFields, errors, values };
  }

  // Bots: the honeypot is filled, or a complete, valid form came back faster
  // than a person can type it. Answer as if it worked and send nothing, so
  // the workflow never mails a copy to an address a bot typed in. Checked
  // after validation, so a person who submits too early sees the errors.
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (
    String(formData.get("website") ?? "").length > 0 ||
    !startedAt ||
    Date.now() - startedAt < MIN_FILL_MS
  ) {
    return { status: "success", message: t.sent };
  }

  const webhook = process.env.N8N_AUTHOR_WEBHOOK_URL;
  if (!webhook) {
    console.warn(
      "[author-contact] N8N_AUTHOR_WEBHOOK_URL is not set; message was not delivered",
    );
    return { status: "error", message: t.failed(site.email), values };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        newsletter: formData.get("newsletter") === "on",
        lang: locale,
        articleTitle: String(formData.get("articleTitle") ?? "").slice(0, 300),
        articleUrl: String(formData.get("articleUrl") ?? "").slice(0, 300),
        position: String(formData.get("position") ?? ""),
        source: "blog-author",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);

    // Same as the contact form: a rejection can arrive as a 200 with
    // `ok: false` in the body, depending on the n8n version.
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
      throw new Error(`Webhook rejected the message: ${raw.slice(0, 200)}`);
    }
  } catch (error) {
    console.error("[author-contact] delivery failed", error);
    return { status: "error", message: t.failed(site.email), values };
  }

  return { status: "success", message: t.sent };
}
