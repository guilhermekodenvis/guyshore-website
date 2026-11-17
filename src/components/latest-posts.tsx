import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { ArrowRight } from "@/components/icons";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";
import { formatPostDate, getAllPosts, postPath } from "@/lib/posts";

/**
 * The three newest posts in the page's language, on the home page under
 * "Who we are". English and Portuguese posts are never mixed. Reads the
 * same `getAllPosts` the blog index uses, so a new post appears here with no
 * code change, and renders nothing while there are no posts.
 *
 * Text cards rather than image cards: every post's `image` is its social
 * card, which carries the title in pixels, so a cover would repeat the
 * heading right above it.
 */
export async function LatestPosts({ lang }: { lang: Locale }) {
  const posts = (await getAllPosts(lang)).slice(0, 3);
  const t = getDictionary(lang).posts;
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow text-slate">{t.eyebrow}</p>
        <h2 className="mt-5 max-w-[22ch] text-title">
          {t.latestTitle}
        </h2>
        <p className="mt-7 max-w-[64ch] text-lead text-steel">
          {t.latestLead}
        </p>

        {/* One column until lg, like the portfolio row: three text cards side
            by side on a tablet leave each title too narrow to read. */}
        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="group flex h-full flex-col border border-[var(--color-line)] bg-paper p-7 transition-colors hover:border-[var(--color-line-strong)] lg:p-8">
                <p className="font-label text-[0.6875rem] tracking-[0.1em] text-slate uppercase">
                  <time dateTime={post.meta.date}>
                    {formatPostDate(post.meta.date, lang)}
                  </time>
                  <span aria-hidden> · </span>
                  {post.meta.readingTime}
                </p>

                <h3 className="mt-5 text-2xl tracking-[-0.03em]">
                  <Link
                    href={postPath(lang, post.slug)}
                    className="transition-colors hover:text-steel"
                  >
                    {post.meta.title}
                  </Link>
                </h3>

                <p className="mt-4 line-clamp-3 text-steel">
                  {post.meta.description}
                </p>

                <Link
                  href={postPath(lang, post.slug)}
                  className="mt-auto inline-flex items-center gap-2 self-start pt-8 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-steel"
                >
                  {t.readThePost}
                  <span className="sr-only">: {post.meta.title}</span>
                  <ArrowRight className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <ButtonLink href={localePath(lang, "/blog")} variant="ghost">
            {t.viewAllPosts}
            <ArrowRight className="size-5 shrink-0" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
