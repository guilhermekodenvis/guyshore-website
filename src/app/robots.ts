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

/**
 * Every group, not just `*`: a crawler obeys only the most specific group
 * that names it. `/api/google-rating` bills Google on every call, and a
 * crawler that renders the home page would otherwise trigger it.
 */
const API = "/api/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: API },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: API })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
