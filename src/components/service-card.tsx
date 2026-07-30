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
              <dt className="w-24 shrink-0 font-label text-[0.6875rem] tracking-[0.1em] text-slate uppercase">
                Timeline
              </dt>
              <dd className="font-body font-semibold tracking-[-0.01em]">
                {service.timeline}
              </dd>
            </div>
            <div className="flex items-baseline gap-4 border-t border-[var(--color-line)] pt-4">
              <dt className="w-24 shrink-0 font-label text-[0.6875rem] tracking-[0.1em] text-slate uppercase">
                Price
              </dt>
              <dd className="font-body font-semibold tracking-[-0.01em]">
                {service.price}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="max-w-[62ch] text-steel">{service.description}</p>
        </div>
      </div>
    </article>
  );
}
