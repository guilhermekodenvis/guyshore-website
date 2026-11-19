import type { Metadata } from "next";
import {
  alternates as languageAlternates,
  localePath,
  ogLocale,
  type Locale,
} from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Search-facing metadata helpers. Nothing here writes copy: descriptions are
 * taken from text the page already shows, and only shortened to the length a
 * search result can display.
 */

const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630 };

/** Google shows about 155 to 160 characters of a meta description. */
const DESCRIPTION_MAX = 160;

/** Room for a page title before Google truncates it (about 60 characters). */
const TITLE_MAX = 60;

/**
 * Shortens visible copy to a search snippet: whole sentences while they fit,
 * otherwise the first sentence cut at a word boundary.
 */
export function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  if (text.length <= max) return text;
  const sentences = text.match(/[^.?]+[.?]+(\s|$)/g) ?? [text];
  let out = "";
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  if (out.trim()) return out.trim();
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * The `<title>` for a page: "Name · GuyShore" when it fits in a result,
 * otherwise the name alone, so the part that is cut is not the page name.
 */
export function pageTitle(name: string): Metadata["title"] {
  const full = `${name} · ${site.name}`;
  return full.length <= TITLE_MAX ? name : { absolute: name };
}

/**
 * Complete metadata for a page that exists in both languages under the same
 * path: title, snippet, canonical and hreflang, and Open Graph and Twitter
 * cards that describe this page rather than the home page.
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
  type = "website",
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const snippet = clampDescription(description);
  const socialTitle = `${title} · ${site.name}`;
  return {
    title: pageTitle(title),
    description: snippet,
    alternates: languageAlternates(lang, path),
    openGraph: {
      type,
      siteName: site.name,
      locale: ogLocale[lang],
      url: `${site.url}${localePath(lang, path) === "/" ? "" : localePath(lang, path)}`,
      title: socialTitle,
      description: snippet,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: snippet,
      images: [OG_IMAGE.url],
    },
  };
}

/** Absolute URL of a page in a language. */
export function absoluteUrl(lang: Locale, path: string): string {
  const p = localePath(lang, path);
  return `${site.url}${p === "/" ? "" : p}`;
}

/**
 * The Google Business Profile, by its CID. Linked from the Organization node
 * as `sameAs`, so search engines tie the site to the listing.
 */
export const GOOGLE_PROFILE_URL = "https://www.google.com/maps?cid=469547207733455424";

/** BreadcrumbList for a page one level below home. */
export function breadcrumb(
  lang: Locale,
  homeLabel: string,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: absoluteUrl(lang, "/") },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: absoluteUrl(lang, item.path),
      })),
    ],
  };
}
