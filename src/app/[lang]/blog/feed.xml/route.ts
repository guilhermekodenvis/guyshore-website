import { getDictionary } from "@/lib/dictionary";
import { hasLocale, htmlLang, locales, type Locale } from "@/lib/i18n";
import { getAllPosts, postPath } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * RSS 2.0 feed of one language's blog: `/blog/feed.xml` (English) and
 * `/pt/blog/feed.xml` (Portuguese). Generated from the same posts the blog
 * index lists, prerendered at build like the sitemap, so a new post appears
 * here with no extra step. Feed readers, aggregators and answer engines use
 * it to find new articles without crawling the index.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const rfc822 = (date: string) => new Date(`${date}T12:00:00Z`).toUTCString();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
): Promise<Response> {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = getDictionary(lang);
  const posts = await getAllPosts(lang);
  const blogUrl = absoluteUrl(lang, "/blog");
  const feedUrl = absoluteUrl(lang, "/blog/feed.xml");

  const items = posts
    .map((post) => {
      const url = `${site.url}${postPath(lang, post.slug)}`;
      return `    <item>
      <title>${escape(post.meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.meta.description)}</description>
      <pubDate>${rfc822(post.meta.date)}</pubDate>
      <dc:creator>${escape(post.meta.author)}</dc:creator>
${post.meta.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(`${t.blog.metaTitle} · ${site.name}`)}</title>
    <link>${blogUrl}</link>
    <description>${escape(t.posts.indexLead)}</description>
    <language>${htmlLang[lang] === "en" ? "en-us" : htmlLang[lang].toLowerCase()}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${posts[0] ? `    <lastBuildDate>${rfc822(posts[0].meta.updated ?? posts[0].meta.date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
