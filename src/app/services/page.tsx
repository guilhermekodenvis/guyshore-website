import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  // description intentionally omitted: inherits site.description from the root
  // layout, so every page carries the same snippet.
  alternates: { canonical: "/services" },
};

/**
 * ItemList rather than a bag of Service nodes: this page is an index, and the
 * order it presents them in is part of what it says. Each entry points at the
 * detail page that carries the full Service markup.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "GuyShore services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: `${site.url}/services/${service.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Our services"
        title="This is how we help you."
        lead="We understand that growing a business demands real investment and real risk. That is why we exist: to reduce the risk and hand you the best technology work we can. Below you can see in more detail how we can help."
      />

      {/* One per row on purpose. These are long descriptions and pairing them
          into columns forces the reader to compare rather than read. */}
      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
