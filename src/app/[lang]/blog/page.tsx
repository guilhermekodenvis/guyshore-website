import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/lib/dictionary";
import { localePath, resolveLang } from "@/lib/i18n";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { formatPostDate, getAllPosts, postPath } from "@/lib/posts";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const meta = pageMetadata({
    lang,
    path: "/blog",
    title: t.blog.metaTitle,
    description: t.posts.indexLead,
  });
  // Advertise this language's RSS feed (blog/feed.xml) to readers and
  // crawlers that look for one.
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: { "application/rss+xml": absoluteUrl(lang, "/blog/feed.xml") },
    },
  };
}

/**
 * Each language has its own blog: only the posts written in that language
 * are listed. A post that has not been translated simply does not appear on
 * the other blog.
 */
export default async function BlogPage({ params }: Props) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).posts;
  const posts = await getAllPosts(lang);
  const url = absoluteUrl(lang, "/blog");

  // The index as a Blog with its posts, newest first.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    url,
    name: `${getDictionary(lang).blog.metaTitle} · GuyShore`,
    description: t.indexLead,
    inLanguage: lang === "en" ? "en-US" : "pt-PT",
    publisher: { "@id": "https://guyshore.com/#organization" },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.meta.title,
      description: post.meta.description,
      url: `https://guyshore.com${postPath(lang, post.slug)}`,
      datePublished: post.meta.date,
      dateModified: post.meta.updated ?? post.meta.date,
      author: { "@type": "Person", name: post.meta.author },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader eyebrow={t.eyebrow} title={t.indexTitle} lead={t.indexLead} />

      <div className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        {posts.length === 0 ? (
          <div className="max-w-[48ch] border-t border-[var(--color-line)] pt-10">
            <p className="text-lead text-steel">
              {t.empty}
            </p>
            <ButtonLink href={localePath(lang, "/contact")} className="mt-8">
              {t.askQuestion}
            </ButtonLink>
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={postPath(lang, post.slug)}
                  className="grid gap-4 border-b border-[var(--color-line)] py-10 transition-colors hover:bg-mist lg:grid-cols-[11rem_1fr] lg:gap-12 lg:py-12"
                >
                  <p className="font-label text-[0.6875rem] tracking-[0.1em] text-slate uppercase">
                    <time dateTime={post.meta.date}>
                      {formatPostDate(post.meta.date, lang)}
                    </time>
                    <span className="mt-1 block text-steel">
                      {post.meta.readingTime}
                    </span>
                  </p>

                  <div>
                    <h2 className="max-w-[26ch] text-2xl tracking-[-0.025em] lg:text-3xl">
                      {post.meta.title}
                    </h2>
                    <p className="mt-3 max-w-[60ch] text-steel">
                      {post.meta.description}
                    </p>
                    <p className="mt-5 flex flex-wrap gap-2">
                      {post.meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[2px] border border-[var(--color-line)] px-2.5 py-1 font-label text-[0.6875rem] text-slate"
                        >
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
