import { ButtonLink } from "@/components/button-link";
import { ArrowUpRight, CheckMark } from "@/components/icons";
import { feasibility } from "@/lib/feasibility";

/**
 * Full-viewport black panel, directly under the partner row. The hero's
 * read-more control scrolls here.
 *
 * Two columns from lg up, and not for decoration: stacked in one column the
 * block runs 969px, which overflows a 720px laptop viewport and defeats the
 * point of a full-screen section. Splitting the pitch from the deliverables
 * brings it under 700px, so the whole offer is readable without scrolling on
 * the screens most visitors have.
 *
 * Two deliberate departures from "100vh by 100vw":
 *
 * - `min-h`, not `h`. A hard 100dvh clips the list on a short viewport, a
 *   phone in landscape being the obvious one, with no way to reach the
 *   button. The minimum gives the full screen when there is room and grows
 *   when there is not.
 * - Width comes from the block box, not from `w-screen`. `w-screen` is
 *   100vw, which includes the scrollbar gutter and so overflows the page by
 *   its width, adding a horizontal scrollbar to every screen below it.
 *
 * `on-ink` repaints the focus ring: see the note beside the rule in
 * globals.css.
 */
export function FeasibilityPanel() {
  return (
    <section
      id={feasibility.id}
      className="on-ink flex min-h-[100dvh] items-center bg-ink text-paper"
    >
      <div className="mx-auto grid w-full max-w-[76rem] gap-x-16 gap-y-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-10 lg:py-24">
        <div>
          <p className="eyebrow text-paper/70">{feasibility.eyebrow}</p>

          <h2 className="mt-5 max-w-[18ch] text-title">{feasibility.title}</h2>

          <p className="mt-6 max-w-[46ch] text-lead text-paper/80">
            {feasibility.lead}
          </p>

          <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-4xl tracking-[-0.03em] lg:text-5xl">
              {feasibility.price}
            </span>
            <span className="text-paper/70">{feasibility.turnaround}</span>
          </p>
        </div>

        {/* The rule separates the two blocks when they are stacked. From lg
            the column gap does that job, so it goes. */}
        <div className="border-t border-paper/20 pt-10 lg:border-t-0 lg:pt-0">
          <p className="eyebrow text-paper/70">{feasibility.includesTitle}</p>

          <ul className="mt-6 grid gap-4">
            {feasibility.includes.map((item) => (
              <li key={item} className="flex gap-3.5">
                <CheckMark className="mt-1 size-5 shrink-0 text-paper" />
                <span className="max-w-[44ch] text-paper/80">{item}</span>
              </li>
            ))}
          </ul>

          <ButtonLink
            href={feasibility.cta.href}
            variant="inverse"
            target="_blank"
            rel="noreferrer"
            className="mt-10"
          >
            {feasibility.cta.label}
            {/* The arrow says the link leaves the site to a sighted reader;
                this says it to everyone else. */}
            <span className="sr-only">(opens in a new tab)</span>
            <ArrowUpRight className="size-4 shrink-0" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
