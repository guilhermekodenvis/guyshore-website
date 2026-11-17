import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PortfolioCard } from "@/components/portfolio-card";
import { getDictionary } from "@/lib/dictionary";
import { alternates, localePath, resolveLang } from "@/lib/i18n";
import { getPortfolio } from "@/lib/portfolio";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).portfolioIndex;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternates(lang, "/portfolio"),
  };
}

export default async function PortfolioPage({ params }: Props) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).portfolioIndex;
  const portfolio = getPortfolio(lang);

  /** An index, so an ItemList: each entry points at the page with the detail. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.schemaName,
    itemListElement: portfolio.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${site.url}${localePath(lang, `/portfolio/${item.slug}`)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item) => (
            <PortfolioCard
              key={item.slug}
              lang={lang}
              item={item}
              sizes="(min-width: 1024px) 362px, (min-width: 768px) 50vw, 100vw"
            />
          ))}
        </div>
      </section>
    </>
  );
}
