import type { NextConfig } from "next";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import createMDX from "@next/mdx";

/**
 * Portuguese posts published before the site had a `/pt` section lived at
 * `/blog/<slug>` and were indexed there. Each one now redirects to its
 * `/pt/blog/<slug>` address. Read from the files so a future Portuguese post
 * needs no entry here (it never had the old URL, and the redirect is
 * harmless).
 */
function portuguesePostSlugs(): string[] {
  const dir = path.join(process.cwd(), "src", "content", "blog");
  try {
    return readdirSync(dir)
      .filter((file) => file.endsWith(".mdx"))
      .filter((file) =>
        /\blang:\s*["']pt/.test(readFileSync(path.join(dir, file), "utf8")),
      )
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  // Blog posts are `.mdx` modules imported from `src/content/blog`.
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  async redirects() {
    return [
      // English has no prefix. A typed `/en/...` goes to the one real URL.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      ...portuguesePostSlugs().map((slug) => ({
        source: `/blog/${slug}`,
        destination: `/pt/blog/${slug}`,
        permanent: true,
      })),
    ];
  },

  /**
   * Every page lives under `app/[lang]`. An unprefixed path is the English
   * page, served from `/en/...` internally. `afterFiles` (the array form) runs
   * after `public/` files and the API routes are matched, so `/og-image.png`,
   * `/sitemap.xml` and `/api/...` are untouched, and before dynamic routes, so
   * `/about` is not mistaken for a language called "about".
   */
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      {
        source: "/:path((?!pt(?:/|$)|en(?:/|$)|api(?:/|$)|_next/).*)",
        destination: "/en/:path",
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Plugins are named as strings so Turbopack can load them (functions can't
    // cross the JS/Rust boundary).
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
