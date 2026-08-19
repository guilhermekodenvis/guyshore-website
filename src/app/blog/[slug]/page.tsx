import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostSubscribe } from "@/components/post-subscribe";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/posts";
import { site } from "@/lib/site";
import { founder } from "@/lib/team";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const { meta } = post;
  const url = `${site.url}/blog/${slug}`;
  // A post may carry a search-facing title distinct from its h1. When it
  // does, it is used verbatim rather than run through the `%s · GuyShore`
  // template, so the author controls the full string.
  const searchTitle = meta.seoTitle ?? meta.title;
  const image = meta.image ?? "/og-image.png";

  return {
    title: meta.seoTitle ? { absolute: meta.seoTitle } : meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_US",
      url,
      title: searchTitle,
      description: meta.description,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [meta.author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${meta.title} · ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: searchTitle,
      description: meta.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { Content, meta } = post;
  const url = `${site.url}/blog/${slug}`;

  /**
   * Article, BreadcrumbList and, when the post carries one, FAQPage. All of it
   * is derived from `meta`, so the markup cannot say something the page does
   * not. The author node is enriched with the founder's profile when the post
   * is his, which is every post so far.
   */
  const isFounder = meta.author === founder.name;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: meta.title,
        description: meta.description,
        // Required for Article rich results. Falls back to the site image
        // until a post ships its own via `meta.image`.
        image: [`${site.url}${meta.image ?? "/og-image.png"}`],
        author: isFounder
          ? {
              "@type": "Person",
              name: founder.name,
              jobTitle: founder.role,
              worksFor: { "@type": "Organization", name: site.name },
              sameAs: [founder.linkedin],
            }
          : { "@type": "Person", name: meta.author },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: { "@type": "ImageObject", url: `${site.url}/og-image.png` },
        },
        datePublished: meta.date,
        dateModified: meta.updated ?? meta.date,
        inLanguage: "en-US",
        keywords: meta.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${site.url}/blog`,
          },
          { "@type": "ListItem", position: 3, name: meta.title, item: url },
        ],
      },
      ...(meta.faq && meta.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: meta.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article>
        <header className="mx-auto max-w-[76rem] px-6 pt-20 pb-12 lg:px-10 lg:pt-28">
          <Link
            href="/blog"
            className="eyebrow text-slate transition-colors hover:text-ink"
          >
            ← All posts
          </Link>

          <h1 className="mt-10 max-w-[22ch] text-title">{meta.title}</h1>
          <p className="mt-7 max-w-[54ch] text-lead text-steel">
            {meta.description}
          </p>

          <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-label text-[0.6875rem] tracking-[0.08em] text-slate uppercase">
            <span>{meta.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
            <span aria-hidden>·</span>
            <span>{meta.readingTime}</span>
          </p>

          <div className="tick-rule mt-10" />
        </header>

        <div className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="prose max-w-[68ch]">
            <Content />
          </div>
        </div>
      </article>

      {/* Every post ends here. Lives in the template, not in the MDX, so a
          new article cannot ship without it. */}
      <PostSubscribe />
    </>
  );
}
