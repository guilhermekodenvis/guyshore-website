import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * Blog posts are `.mdx` files in `src/content/blog`. Each one exports a `meta`
 * object alongside its default component:
 *
 *   export const meta = { title, description, date, author, readingTime, tags }
 *
 * plus the optional `seoTitle`, `updated` and `faq` described on PostMeta.
 *
 * The filename is the slug. `meta` is deliberately not called `metadata` so it
 * is never confused with the Next.js route metadata convention.
 *
 * Server-only: these functions touch the filesystem.
 */

export type PostMeta = {
  /** The on-page h1. Also the <title> unless `seoTitle` is set. */
  title: string;
  description: string;
  /** ISO date, `YYYY-MM-DD`. Sorted as a string, so keep the format. */
  date: string;
  /** Set when the text was revised after publishing; feeds dateModified. */
  updated?: string;
  author: string;
  readingTime: string;
  tags: string[];
  /**
   * Optional <title> for search results when it should differ from the h1,
   * for example a question-shaped title with the year in it. Used verbatim,
   * without the site suffix.
   */
  seoTitle?: string;
  /**
   * Optional social and structured-data image, as a path under `public`.
   * Falls back to the site image when absent. Must be 1200x630: the template
   * declares those dimensions, and a file that is not that shape gets cropped
   * badly by the sharing preview.
   */
  image?: string;
  /**
   * Optional FAQ, emitted as FAQPage structured data. Keep it a faithful copy
   * of the FAQ section in the body: search engines require the schema answers
   * to be visible on the page.
   */
  faq?: { question: string; answer: string }[];
};

export type Post = {
  slug: string;
  meta: PostMeta;
  Content: ComponentType;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export async function getPostSlugs(): Promise<string[]> {
  let entries: string[];
  try {
    entries = await readdir(BLOG_DIR);
  } catch {
    // No content directory yet (it is empty, so git may not carry it).
    return [];
  }
  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    return { slug, meta: mod.meta as PostMeta, Content: mod.default };
  } catch {
    return null;
  }
}

/** Newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
