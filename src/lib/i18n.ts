import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * The site's two languages and the URL rules that tie them together.
 *
 * English lives at the root (`/about`), Portuguese under `/pt` (`/pt/about`).
 * Internally every page sits under `app/[lang]`; `next.config.ts` rewrites an
 * unprefixed path to `/en/...` so English keeps the URLs it was indexed under,
 * and redirects a typed `/en/...` back to the root so each page has one URL.
 *
 * Slugs are shared between languages for services and portfolio projects, so
 * switching language keeps the path. Blog posts are the exception: each post
 * is written in one language and may name its translation (see posts.ts).
 */

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** `<html lang>` and `inLanguage`. Portuguese is European Portuguese. */
export const htmlLang: Record<Locale, string> = { en: "en", pt: "pt-PT" };

/** Open Graph `og:locale`. */
export const ogLocale: Record<Locale, string> = { en: "en_US", pt: "pt_PT" };

/** Name of each language in its own language, for the switch. */
export const localeLabel: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

/**
 * The public path of a page in a language. `path` is the language-neutral
 * path and starts with "/" ("/" for the home page).
 */
export function localePath(lang: Locale, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/pt" : `/pt${path}`;
}

/**
 * Splits a pathname into its language and the language-neutral path.
 *
 * Accepts both the browser path (`/about`, `/pt/about`) and the internal one
 * a prerendered page sees on the server (`/en/about`), so a client component
 * reading `usePathname()` gets the same answer on both sides of hydration.
 */
export function splitPath(pathname: string): { lang: Locale; path: string } {
  const match = /^\/(en|pt)(?=\/|$)/.exec(pathname);
  if (!match) return { lang: "en", path: pathname || "/" };
  const rest = pathname.slice(match[0].length);
  return { lang: match[1] as Locale, path: rest || "/" };
}

/**
 * Canonical and hreflang links for a page that exists in `available`
 * languages, under the same neutral path in each.
 */
export function alternates(
  lang: Locale,
  path: string,
  available: readonly Locale[] = locales,
): Metadata["alternates"] {
  return alternatesFor(
    lang,
    Object.fromEntries(available.map((l) => [l, localePath(l, path)])) as Partial<
      Record<Locale, string>
    >,
  );
}

/** Canonical and hreflang links from explicit per-language paths. */
export function alternatesFor(
  lang: Locale,
  paths: Partial<Record<Locale, string>>,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    const p = paths[l];
    if (p) languages[htmlLang[l]] = p;
  }
  const fallback = paths.en ?? paths.pt;
  if (fallback && Object.keys(languages).length > 1) {
    languages["x-default"] = fallback;
  }
  return {
    canonical: paths[lang],
    languages: Object.keys(languages).length > 1 ? languages : undefined,
  };
}

/** Reads `lang` from route params, or 404s on anything else. */
export async function resolveLang(
  params: Promise<{ lang: string }>,
): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}
