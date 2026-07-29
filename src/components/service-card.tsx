import type { ServiceItem } from "@/lib/services";

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article
      id={service.slug}
      className="scroll-mt-28 border border-[var(--color-line)] bg-paper p-7 transition-colors hover:border-[var(--color-line-strong)] lg:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-14">
        <div>
          <h3 className="text-2xl tracking-[-0.03em] lg:text-3xl">
            {service.title}
          </h3>

          <dl className="mt-7 space-y-4">
            <div className="flex items-baseline gap-4 border-t border-[var(--color-line)] pt-4">
              <dt className="w-24 shrink-0 font-mono text-[0.6875rem] tracking-[0.1em] text-surf uppercase">
                Timeline
              </dt>
              <dd className="font-display font-semibold tracking-[-0.01em]">
                {service.timeline}
              </dd>
            </div>
            <div className="flex items-baseline gap-4 border-t border-[var(--color-line)] pt-4">
              <dt className="w-24 shrink-0 font-mono text-[0.6875rem] tracking-[0.1em] text-surf uppercase">
                Price
              </dt>
              <dd className="font-display font-semibold tracking-[-0.01em]">
                {service.price}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          {service.highlight ? (
            <p className="mb-6 border-l-2 border-noon bg-foam px-4 py-3 text-[0.9375rem] text-tide">
              {service.highlight}
            </p>
          ) : null}

          <p className="max-w-[62ch] text-tide">{service.description}</p>

          {service.includes ? (
            <>
              <p className="mt-8 font-mono text-[0.6875rem] tracking-[0.1em] text-surf uppercase">
                What&rsquo;s included
              </p>
              <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-px w-4 shrink-0 bg-noon"
                    />
                    <span className="text-[0.9375rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
