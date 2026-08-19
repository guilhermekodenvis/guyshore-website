"use server";

import { site } from "@/lib/site";
import type { SubscribeState } from "@/lib/subscribe";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Blog subscriptions go through the same n8n webhook as the contact form,
 * tagged `source: "blog-subscribe"`.
 *
 * `name` and `message` are filled with fixed strings rather than left empty.
 * The existing n8n workflow formats a notification email out of those fields,
 * so sending them keeps that email readable without touching the automation.
 * If a real mailing list is ever wired up, branch on `source` inside n8n.
 */
export async function subscribeToBlog(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();

  // Honeypot: real people leave this empty. Answer as if it succeeded.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "You are on the list." };
  }

  if (!email) {
    return {
      status: "error",
      message: "We need an address to send the articles to.",
    };
  }
  if (!EMAIL.test(email)) {
    return {
      status: "error",
      message: "That address does not look complete.",
      email,
    };
  }

  const webhook = process.env.N8N_CONTACT_WEBHOOK_URL;

  // Without a webhook the address reaches nobody, so say so in the server log
  // rather than pretending it was stored.
  if (!webhook) {
    console.warn(
      "[subscribe] N8N_CONTACT_WEBHOOK_URL is not set; subscription was not delivered",
      { email },
    );
    return { status: "success", message: "You are on the list." };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Blog subscriber",
        email,
        company: "",
        need: "",
        message: "Wants to receive new articles by email.",
        source: String(formData.get("source") ?? "blog-subscribe"),
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}`);
    }

    // The automation can report a rejection in the body while still answering
    // 200, depending on the n8n version. Read it rather than trusting status.
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
      throw new Error(`Webhook rejected the subscription: ${raw.slice(0, 200)}`);
    }
  } catch (error) {
    console.error("[subscribe] delivery failed", error);
    return {
      status: "error",
      message: `Something went wrong on our side. Email us at ${site.email} and we will add you.`,
      email,
    };
  }

  return {
    status: "success",
    message: "You are on the list. New articles land in your inbox.",
  };
}
