import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import {
  portfolioCover,
  portfolioImageSrc,
  type PortfolioItem,
} from "@/lib/portfolio";

/**
 * One project on the home row and on the portfolio index.
 *
 * The cover, the heading and the call to action all lead to the detail page.
 * Only the last two are in the tab order and the accessibility tree: the
 * cover is a larger hit area for pointers, and announcing the same link three
 * times would be noise.
 *
 * `sizes` comes from the caller because the two grids differ: the home row is
 * one column until lg, the index is two from md.
 */
export function PortfolioCard({
  item,
  sizes,
}: {
  item: PortfolioItem;
  sizes: string;
}) {
  const href = `/portfolio/${item.slug}`;
  const cover = portfolioCover(item);

  return (
    <article className="group flex h-full flex-col border border-[var(--color-line)] bg-paper transition-colors hover:border-[var(--color-line-strong)]">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[11/5] overflow-hidden border-b border-[var(--color-line)] bg-mist"
      >
        {/* The whole screenshot, never cropped. Covers are desktop captures
            between 2.1:1 and 2.2:1, so the frame is 2.2:1 and `object-contain`
            fits each one inside it: at worst a sliver of `mist` shows at the
            sides, and every card in a row keeps the same height. No hover
            zoom, because scaling inside `overflow-hidden` crops the edges. */}
        <Image
          src={portfolioImageSrc(item, cover.file)}
          alt=""
          fill
          sizes={sizes}
          className="object-contain"
        />
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <p className="eyebrow text-slate">{item.category}</p>
        <h3 className="mt-3 text-2xl tracking-[-0.03em]">
          <Link href={href} className="transition-colors hover:text-steel">
            {item.name}
          </Link>
        </h3>
        <p className="mt-4 flex-1 text-steel">{item.summary}</p>

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 self-start font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-steel"
        >
          View project
          <span className="sr-only">: {item.name}</span>
          <ArrowRight className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
