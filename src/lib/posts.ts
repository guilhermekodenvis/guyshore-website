import { readdir } from "node:fs/promises";
import path from "node:path";
import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";
import { htmlLang, type Locale } from "@/lib/i18n";

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
  /**
   * Language of a post not written in English: "pt-PT". Absent means English.
   * Decides which blog the post belongs to: an English post lives at
   * `/blog/<slug>` and is listed only on the English blog, a Portuguese one
   * at `/pt/blog/<slug>` and listed only on the Portuguese blog.
   */
  lang?: string;
  /**
   * Slugs of the same article in the other language, when it has been
   * translated, e.g. `{ en: "how-much-does-n8n-cost" }` on the Portuguese
   * post. The language switch and the hreflang links use it; a post without
   * a translation exists in its own language only.
   */
  translations?: Partial<Record<Locale, string>>;
};

export type Post = {
  slug: string;
  meta: PostMeta;
  /** Accepts MDX component overrides, see postComponents in mdx-components. */
  Content: ComponentType<{ components?: MDXComponents }>;
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

/** The site language a post belongs to. */
export function postLocale(meta: PostMeta): Locale {
  return meta.lang?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

/** The public path of a post in the language it is written in. */
export function postPath(lang: Locale, slug: string): string {
  return lang === "en" ? `/blog/${slug}` : `/pt/blog/${slug}`;
}

/** Newest first. With `lang`, only the posts written in that language. */
export async function getAllPosts(lang?: Locale): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  return posts
    .filter((post): post is Post => post !== null)
    .filter((post) => !lang || postLocale(post.meta) === lang)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

/** A post in a given language, or null if it is written in the other one. */
export async function getPostIn(
  lang: Locale,
  slug: string,
): Promise<Post | null> {
  const post = await getPost(slug);
  return post && postLocale(post.meta) === lang ? post : null;
}

/**
 * The address of each language version of a post: its own, plus any
 * translation it names that exists and is written in that other language.
 */
export async function postPaths(
  post: Post,
): Promise<Partial<Record<Locale, string>>> {
  const own = postLocale(post.meta);
  const paths: Partial<Record<Locale, string>> = { [own]: postPath(own, post.slug) };
  for (const [key, slug] of Object.entries(post.meta.translations ?? {})) {
    const lang = key as Locale;
    if (lang === own || !slug) continue;
    if (await getPostIn(lang, slug)) paths[lang] = postPath(lang, slug);
  }
  return paths;
}

/**
 * Every post's language versions, keyed by public path. The language switch
 * in the header uses it to send a reader to the translation of the post they
 * are on, or to the other blog when there is none.
 */
export async function postAlternates(): Promise<
  Record<string, Partial<Record<Locale, string>>>
> {
  const posts = await getAllPosts();
  const map: Record<string, Partial<Record<Locale, string>>> = {};
  for (const post of posts) {
    const paths = await postPaths(post);
    for (const p of Object.values(paths)) if (p) map[p] = paths;
  }
  return map;
}

export function formatPostDate(date: string, lang: Locale = "en"): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === "pt" ? htmlLang.pt : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
