const SERVICES = [
  "MVP",
  "SaaS",
  "Web App",
  "Mobile App",
  "Automation",
  "Prototype Rescue",
];

export function ServiceMarquee() {
  return (
    <section
      className="marquee overflow-hidden border-y border-[var(--color-line)] bg-deep py-5 text-paper"
      aria-label="What we build"
    >
      <div className="animate-marquee flex w-max">
        {/* The list is rendered twice so the -50% loop is seamless. The copy is
            hidden from assistive tech to avoid announcing it twice. */}
        <List />
        <List aria-hidden />
      </div>
    </section>
  );
}

function List({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean } = {}) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {SERVICES.map((service) => (
        <li key={service} className="flex items-center">
          <span className="font-display text-lg font-semibold tracking-[-0.02em] whitespace-nowrap sm:text-xl">
            {service}
          </span>
          <span
            aria-hidden
            className="mx-7 size-1.5 shrink-0 rotate-45 bg-noon sm:mx-9"
          />
        </li>
      ))}
    </ul>
  );
}
