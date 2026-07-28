/**
 * Shapes for the contact form.
 *
 * These live outside `app/contact/actions.ts` on purpose: a `"use server"`
 * module may only export async functions, so constants like the initial state
 * cannot sit next to the action.
 */

export type ContactField = "name" | "email" | "company" | "need" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back so a failed submit does not wipe the form. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle" };

export const CONTACT_NEEDS = [
  "An embedded team",
  "One or two engineers",
  "Discovery and architecture",
  "Platform and reliability",
  "Not sure yet",
] as const;
