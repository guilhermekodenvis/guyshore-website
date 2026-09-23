import Image from "next/image";
import { ChevronDown } from "@/components/icons";
import { feasibility } from "@/lib/feasibility";

/**
 * Shared cap for the headline and the supporting line.
 *
 * Deliberately in rem, not ch: `ch` resolves against each element's own font,
 * so 12ch on an 88px display face is ~686px while 24ch on a 22px body face is
 * ~338px. A fixed value is the only way to make the two blocks match.
 */
const BLOCK = "max-w-[34rem]";

export function Hero() {
  return (
    // flex-1 rather than a height of its own: the wrapper on the home page
    // gives this one screen to fill. A column, so the scroll hint can sit at
    // the bottom edge of that screen while the content stays centred in what
    // is left: `my-auto` on the grid, not absolute positioning, so on a short
    // viewport the hint is pushed below the headline instead of over it.
    <section className="flex flex-1 flex-col bg-paper">
      {/* No max-width on purpose: the hero runs wider than the rest of the
          page, held off the edges by 40px from lg up.
          Mobile stacks logo, headline and text and centres them; the
          three-column split only starts at lg. One grid row, not two: the
          row that used to hold the contact button is gone with it. */}
      <div className="my-auto grid w-full gap-8 px-6 py-16 text-center lg:grid-cols-[1fr_auto_1fr] lg:gap-x-14 lg:px-10 lg:text-left">
        <div className="order-1 flex justify-center lg:order-none lg:col-start-2 lg:row-start-1 lg:self-center">
          <Image
            src="/logo-mark.png"
            alt=""
            width={320}
            height={320}
            priority
            className="w-[clamp(10rem,20vw,17rem)] drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            /* A line drawing on transparent: the header island stays clear glass
               over it (see nav-tone.ts). */
            data-nav-luma="light"
          />
        </div>

        <h1
          className={`animate-rise-in order-2 mx-auto ${BLOCK} text-display lg:order-none lg:col-start-1 lg:row-start-1 lg:mx-0 lg:self-center`}
        >
          Your MVP, finally finished
        </h1>

        <p
          className={`animate-rise-in order-3 mx-auto ${BLOCK} text-lead text-steel lg:order-none lg:col-start-3 lg:row-start-1 lg:mr-0 lg:ml-auto lg:self-center`}
        >
          Web apps, SaaS platforms, mobile products or automations built from
          scratch to production-ready software.
        </p>
      </div>

      {/* A same-page hash, so a plain anchor rather than <Link>: there is no
          route to prefetch and no client navigation to make. The accessible
          name repeats the visible label so voice control can still say "read
          more", then names the destination, which "Read more" alone does
          not. */}
      <div className="flex shrink-0 justify-center px-6 pb-8 lg:pb-10">
        <a
          href={`#${feasibility.id}`}
          aria-label={`Read more about the ${feasibility.eyebrow}`}
          className="animate-bounce-hint inline-flex flex-col items-center gap-1 rounded-full px-4 py-2 font-body text-[0.8125rem] font-semibold tracking-[-0.01em] text-slate transition-colors duration-200 hover:text-ink"
        >
          Read more
          <ChevronDown className="size-5 shrink-0" />
        </a>
      </div>
    </section>
  );
}
