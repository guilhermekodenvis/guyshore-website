import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI crawlers are listed explicitly rather than left to the `*` rule, so the
 * intent to allow them is unambiguous to anyone auditing the file.
 *
 * Training crawlers and search/answer crawlers are separate user agents, and
 * the search ones are what put the site into answers with a link back:
 * OAI-SearchBot (ChatGPT search), Claude-SearchBot, PerplexityBot. The *-User
 * agents fetch a page when a person asks an assistant about it.
 */
const AI_CRAWLERS = [
  // Training and indexing
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  // Search and answer engines
  "OAI-SearchBot",
  "Claude-SearchBot",
  "Bingbot",
  "Applebot",
  "DuckAssistBot",
  // Fetches on behalf of a person asking an assistant
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
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
    host: site.url,
  };
}
