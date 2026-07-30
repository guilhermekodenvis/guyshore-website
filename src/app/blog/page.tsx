import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { PageHeader } from "@/components/page-header";
import { formatPostDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Our expertise, our hands-on experience and what is happening in the market, so you stay ahead of your competitors.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Here is the content you need to stay up to date."
        lead="We share our expertise, our hands-on experience and what is happening in the market, so you stay ahead of your competitors."
      />

      <div className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        {posts.length === 0 ? (
          <div className="max-w-[48ch] border-t border-[var(--color-line)] pt-10">
            <p className="text-lead text-steel">
              The first articles are on their way. Until then, ask us directly.
              We answer every message.
            </p>
            <ButtonLink href="/contact" className="mt-8">
              Ask us a question
            </ButtonLink>
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="grid gap-4 border-b border-[var(--color-line)] py-10 transition-colors hover:bg-mist lg:grid-cols-[11rem_1fr] lg:gap-12 lg:py-12"
                >
                  <p className="font-label text-[0.6875rem] tracking-[0.1em] text-slate uppercase">
                    <time dateTime={post.meta.date}>
                      {formatPostDate(post.meta.date)}
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
