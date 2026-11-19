import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/lib/dictionary";
import { resolveLang } from "@/lib/i18n";
import { absoluteUrl, breadcrumb, pageMetadata } from "@/lib/seo";
import { htmlLang } from "@/lib/i18n";
import { getFounder } from "@/lib/team";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).about;
  // The snippet is the page's own lead, so each page has its own.
  return pageMetadata({ lang, path: "/about", title: t.metaTitle, description: t.lead });
}

export default async function AboutPage({ params }: Props) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).about;
  const founder = getFounder(lang);
  const dict = getDictionary(lang);
  const url = absoluteUrl(lang, "/about");

  // AboutPage pointing at the company and its founder, so answer engines
  // can tie "who is behind GuyShore" to the same entities as the home page.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${url}#page`,
        url,
        name: t.title,
        inLanguage: lang === "en" ? "en-US" : htmlLang[lang],
        about: { "@id": "https://guyshore.com/#organization" },
        mainEntity: {
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
          description: founder.bio,
          sameAs: [founder.linkedin],
          worksFor: { "@id": "https://guyshore.com/#organization" },
        },
      },
      breadcrumb(lang, dict.common.home, [{ name: t.metaTitle, path: "/about" }]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <p className="eyebrow text-slate">{t.meetEyebrow}</p>
        <h2 className="mt-5 max-w-[18ch] text-title">{t.meetTitle}</h2>

        <div className="mt-16 max-w-[52ch] border-t border-[var(--color-line)] pt-10">
          <p className="eyebrow text-ink">{founder.role}</p>
          <h3 className="mt-4 text-3xl tracking-[-0.03em]">{founder.name}</h3>
          <p className="mt-6 text-lead text-steel">{founder.bio}</p>
        </div>
      </section>
    </>
  );
}
