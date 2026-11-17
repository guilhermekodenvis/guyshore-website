import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { getDictionary } from "@/lib/dictionary";
import { alternates, localePath, resolveLang } from "@/lib/i18n";
import { getServices } from "@/lib/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  return {
    title: getDictionary(lang).servicesIndex.metaTitle,
    // description intentionally omitted: inherits the site description from
    // the root layout, so every page carries the same snippet.
    alternates: alternates(lang, "/services"),
  };
}

/**
 * ItemList rather than a bag of Service nodes: this page is an index, and the
 * order it presents them in is part of what it says. Each entry points at the
 * detail page that carries the full Service markup.
 */
export default async function ServicesPage({ params }: Props) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).servicesIndex;
  const services = getServices(lang);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.schemaName,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${site.url}${localePath(lang, `/services/${service.slug}`)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* One per row on purpose. These are long descriptions and pairing them
          into columns forces the reader to compare rather than read. */}
      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} lang={lang} service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
