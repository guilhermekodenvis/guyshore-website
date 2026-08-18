import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { ServiceItem } from "@/lib/services";

/**
 * One cell of the services grid, and one row of the services index.
 *
 * The whole card is not a link: the heading and the call to action are, so
 * the copy stays selectable. `group` on the article is what lets the arrow
 * react to a hover anywhere on the card.
 */
export function ServiceCard({ service }: { service: ServiceItem }) {
  const href = `/services/${service.slug}`;

  return (
    <article
      id={service.slug}
      className="group flex h-full scroll-mt-28 flex-col border border-[var(--color-line)] bg-paper p-7 transition-colors hover:border-[var(--color-line-strong)] lg:p-10"
    >
      <h3 className="text-2xl tracking-[-0.03em] lg:text-3xl">
        <Link href={href} className="transition-colors hover:text-steel">
          {service.title}
        </Link>
      </h3>

      <p className="mt-6 text-steel">{service.description}</p>

      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-2 self-start font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-steel"
      >
        Learn more about this service
        <span className="sr-only">: {service.title}</span>
        <ArrowRight className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
