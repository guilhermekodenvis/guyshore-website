import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

/**
 * Mid-article call to action: a black slab that interrupts the prose.
 *
 * Used from MDX, so it sits inside `.prose`. Everything it renders carries an
 * explicit color and margin, because the surrounding prose rules assume dark
 * text on a light page and would otherwise leak in.
 *
 * `href` is external in every current use (Calendly), which is why the link
 * opens in a new tab. An internal path would need that behaviour changed.
 */
export function PostCta({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <aside className="post-cta bg-ink px-7 py-9 text-paper lg:px-10 lg:py-11">
      <h3 className="text-2xl tracking-[-0.03em] text-paper lg:text-3xl">
        {title}
      </h3>
      <p className="mt-5 max-w-[52ch] text-paper/80">{body}</p>

      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink no-underline transition-colors hover:bg-mist"
      >
        {label}
        <span className="sr-only">(opens in a new tab)</span>
        <ArrowUpRight className="size-4 shrink-0" />
      </Link>
    </aside>
  );
}
