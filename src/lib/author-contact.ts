/**
 * Shapes for the "talk to the author" form inside blog posts.
 *
 * Outside `app/actions/author-contact.ts` for the usual reason: a
 * `"use server"` module may only export async functions.
 */

export type AuthorContactField = "name" | "email" | "message";

export type AuthorContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<AuthorContactField, string>>;
  /** Echoed back so a failed submit does not wipe the form. */
  values?: Partial<Record<AuthorContactField, string>>;
};

export const initialAuthorContactState: AuthorContactState = { status: "idle" };

/**
 * The copy a post gives its contact block, in `meta.contact`: a title that
 * picks up the article's subject, a subtitle of up to 40 words, and the
 * button text, which the form's submit button repeats.
 */
export type PostContactCopy = {
  title: string;
  subtitle: string;
  cta: string;
};
