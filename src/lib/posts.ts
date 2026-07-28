import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * Blog posts are `.mdx` files in `src/content/blog`. Each one exports a `meta`
 * object alongside its default component:
 *
 *   export const meta = { title, description, date, author, readingTime, tags }
 *
 * The filename is the slug. `meta` is deliberately not called `metadata` so it
 * is never confused with the Next.js route metadata convention.
 *
 * Server-only: these functions touch the filesystem.
 */

export type PostMeta = {
  title: string;
  description: string;
  /** ISO date, `YYYY-MM-DD`. Sorted as a string, so keep the format. */
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
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
