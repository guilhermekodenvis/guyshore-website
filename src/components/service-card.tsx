import type { ServiceItem } from "@/lib/services";

/**
 * One cell of the services grid. Stacks title over copy, so two cards sitting
 * side by side keep their headings on the same line regardless of copy length.
 */
export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article
      id={service.slug}
      className="flex h-full scroll-mt-28 flex-col border border-[var(--color-line)] bg-paper p-7 transition-colors hover:border-[var(--color-line-strong)] lg:p-10"
    >
      <h3 className="text-2xl tracking-[-0.03em] lg:text-3xl">
        {service.title}
      </h3>
      <p className="mt-6 text-steel">{service.description}</p>
    </article>
  );
}
