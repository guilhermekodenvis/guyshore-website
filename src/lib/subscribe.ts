/**
 * Shape for the blog subscribe form.
 *
 * Lives outside `app/blog/actions.ts` for the same reason the contact state
 * does: a `"use server"` module may only export async functions, so a plain
 * constant cannot sit next to the action.
 */

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Echoed back so a failed submit does not wipe the field. */
  email?: string;
};

export const initialSubscribeState: SubscribeState = { status: "idle" };
