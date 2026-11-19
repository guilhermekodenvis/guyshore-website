import type { MetadataRoute } from "next";
import { htmlLang, localePath, locales, type Locale } from "@/lib/i18n";
import { getPortfolio } from "@/lib/portfolio";
import { getAllPosts, postPaths } from "@/lib/posts";
import { getServices } from "@/lib/services";
import { site } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

/**
 * One entry per page per language, each listing its translations as
 * hreflang alternates. Pages that exist in both languages under the same
 * neutral path come from `pages()`; blog posts carry only the languages they
 * are actually written in.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only posts carry a lastmod: their date (or the date they were revised)
  // is a real one. A build timestamp on every page would say everything
  // changed on every deploy, and search engines learn to ignore a lastmod
  // that is always new.
  const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

  const languagesFor = (paths: Partial<Record<Locale, string>>) => {
    const entries = Object.entries(paths).filter(([, p]) => p);
    if (entries.length < 2) return undefined;
    return {
      languages: Object.fromEntries(
        entries.map(([l, p]) => [htmlLang[l as Locale], abs(p as string)]),
      ),
    };
  };

  const pages = (
    paths: string[],
    changeFrequency: Entry["changeFrequency"],
    priority: (path: string) => number,
  ): Entry[] =>
    paths.flatMap((path) => {
      const perLang = Object.fromEntries(
        locales.map((l) => [l, localePath(l, path)]),
      ) as Record<Locale, string>;
      return locales.map((l) => ({
        url: abs(perLang[l]),
        changeFrequency,
        priority: priority(path),
        alternates: languagesFor(perLang),
      }));
    });

  const posts = await getAllPosts();
  const postEntries: Entry[] = await Promise.all(
    posts.map(async (post) => {
      const paths = await postPaths(post);
      const own = Object.values(paths)[0] as string;
      return {
        url: abs(own),
        lastModified: post.meta.updated ?? post.meta.date,
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates: languagesFor(paths),
      };
    }),
  );

  return [
    ...pages(
      ["/", "/services", "/portfolio", "/about", "/blog", "/contact"],
      "monthly",
      (path) => (path === "/" ? 1 : 0.8),
    ),
    // Service pages rank for their own intent, so they sit above posts.
    ...pages(
      getServices("en").map((service) => `/services/${service.slug}`),
      "monthly",
      () => 0.9,
    ),
    ...pages(
      getPortfolio("en").map((item) => `/portfolio/${item.slug}`),
      "yearly",
      () => 0.7,
    ),
    // Legal pages are linked from every footer, so they are crawled anyway,
    // but they carry the lowest priority in the file.
    ...pages(["/privacy", "/terms"], "yearly", () => 0.3),
    ...postEntries,
  ];
}
