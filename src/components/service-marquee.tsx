import type { CSSProperties } from "react";

const SERVICES = [
  "MVP",
  "SaaS",
  "Web App",
  "Mobile App",
  "Automation",
  "Prototype Rescue",
];

/**
 * How many times the list is repeated inside the track.
 *
 * The animation shifts by exactly one copy, so the remaining (COPIES - 1)
 * copies have to be wider than the viewport or the trailing edge runs out of
 * content mid-loop. At ~1000px per copy, six covers roughly 5000px of screen.
 * Shortening SERVICES makes each copy narrower, so raise this if the list ever
 * drops below a handful of items.
 */
const COPIES = 6;

export function ServiceMarquee() {
  return (
    <section
      className="marquee overflow-hidden border-y border-[var(--color-line)] bg-ink py-5 text-paper"
      aria-label="What we build"
    >
      <div
        className="animate-marquee flex w-max"
        style={{ "--marquee-copies": COPIES } as CSSProperties}
      >
        {/* Only the first copy is announced; the rest are visual filler. */}
        {Array.from({ length: COPIES }, (_, i) => (
          <List key={i} aria-hidden={i > 0} />
        ))}
      </div>
    </section>
  );
}

function List({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean } = {}) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {SERVICES.map((service) => (
        <li key={service} className="flex items-center">
          <span className="font-body text-lg font-semibold tracking-[-0.02em] whitespace-nowrap sm:text-xl">
            {service}
          </span>
          <span
            aria-hidden
            className="mx-7 size-1.5 shrink-0 rotate-45 bg-paper sm:mx-9"
          />
        </li>
      ))}
    </ul>
  );
}
