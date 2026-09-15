import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PortfolioCard } from "@/components/portfolio-card";
import { portfolio } from "@/lib/portfolio";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Websites, management platforms and mobile apps GuyShore built for real companies and took to production.",
  alternates: { canonical: "/portfolio" },
};

/** An index, so an ItemList: each entry points at the page with the detail. */
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${site.name} portfolio`,
  itemListElement: portfolio.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: `${site.url}/portfolio/${item.slug}`,
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Portfolio"
        title="Software we built for real companies."
        lead="Websites, management platforms and mobile apps, each one taken from the first screen to production and handed over running."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <PortfolioCard
              key={item.slug}
              item={item}
              sizes="(min-width: 1024px) 362px, (min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
      </section>
    </>
  );
}
