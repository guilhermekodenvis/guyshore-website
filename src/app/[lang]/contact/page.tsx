import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/lib/dictionary";
import { resolveLang } from "@/lib/i18n";
import { absoluteUrl, breadcrumb, pageMetadata } from "@/lib/seo";
import { htmlLang } from "@/lib/i18n";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).contactPage;
  return pageMetadata({ lang, path: "/contact", title: t.metaTitle, description: t.lead });
}

export default async function ContactPage({ params }: Props) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).contactPage;
  const url = absoluteUrl(lang, "/contact");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#page`,
        url,
        name: t.title,
        inLanguage: lang === "en" ? "en-US" : htmlLang[lang],
        about: { "@id": "https://guyshore.com/#organization" },
        mainEntity: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: site.phone.e164,
          availableLanguage: ["English", "Portuguese"],
        },
      },
      breadcrumb(lang, getDictionary(lang).common.home, [
        { name: t.metaTitle, path: "/contact" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/*
        Full-bleed banner. Drop the real asset in here and delete the
        decorative fill below:
          <Image src="/contact-banner.jpg" alt="" fill className="object-cover" priority />
      */}
      <div
        className="relative h-[400px] w-full overflow-hidden bg-ink"
        data-nav-tone="dark"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 140% at 20% 10%, #3f3f46 0%, transparent 60%), radial-gradient(80% 130% at 85% 95%, #27272a 0%, transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #ffffff 0 1px, transparent 1px 44px), repeating-linear-gradient(to bottom, #ffffff 0 1px, transparent 1px 44px)",
          }}
        />
      </div>

      <section className="mx-auto max-w-[76rem] px-6 pt-16 pb-24 lg:px-10 lg:pt-20 lg:pb-32">
        <p className="eyebrow text-slate">{t.eyebrow}</p>
        <h1 className="mt-5 max-w-[20ch] text-title">
          {t.title}
        </h1>
        <p className="mt-7 max-w-[58ch] text-lead text-steel">
          {t.lead}
        </p>

        <div className="tick-rule mt-14" />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <ContactForm lang={lang} fields="short" source="contact-page" />

          <aside>
            <p className="eyebrow text-slate">{t.reachDirectly}</p>
            <div className="mt-6">
              <ContactDetails lang={lang} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
