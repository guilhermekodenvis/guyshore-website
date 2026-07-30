import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { formatPostDate, getPost, getPostSlugs } from "@/lib/posts";

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

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { Content, meta } = post;

  return (
    <>
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

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
          <h2 className="max-w-[22ch] text-title">
            Working on something this touches?
          </h2>
          <ButtonLink href="/contact" variant="inverse" className="self-start">
            Book a call
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
