import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI crawlers are listed explicitly rather than left to the `*` rule, so the
 * intent to allow them is unambiguous to anyone auditing the file.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
