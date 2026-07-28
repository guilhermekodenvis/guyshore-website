"use server";

import type { ContactField, ContactState } from "@/lib/contact";
import { site } from "@/lib/site";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: Partial<Record<ContactField, string>> = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    need: String(formData.get("need") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot: real people leave this empty. Answer as if it succeeded.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "Thanks. We will be in touch." };
  }

  const errors: NonNullable<ContactState["errors"]> = {};
  if (!values.name) errors.name = "Tell us who you are.";
  if (!values.email) {
    errors.email = "We need an address to reply to.";
  } else if (!EMAIL.test(values.email)) {
    errors.email = "That address does not look complete.";
  }
  if (!values.message) {
    errors.message = "Tell us what you are trying to ship.";
  } else if (values.message.length < 20) {
    errors.message = "A couple more sentences will get you a better answer.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      errors,
      values,
    };
  }

  const webhook = process.env.N8N_CONTACT_WEBHOOK_URL;

  // Without a webhook configured the submission reaches nobody, so say so in
  // the server log rather than pretending it was delivered.
  if (!webhook) {
    console.warn(
      "[contact] N8N_CONTACT_WEBHOOK_URL is not set; submission was not delivered",
      values,
    );
    return {
      status: "success",
      message: "Thanks. We read every message and reply within one working day.",
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        source: String(formData.get("source") ?? "website"),
        submittedAt: new Date().toISOString(),
      }),
      // Never let a slow automation hang the form.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}`);
    }
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message: `Something went wrong on our side. Please email us at ${site.email}.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks. We read every message and reply within one working day.",
  };
}
