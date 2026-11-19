import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { ArrowRight, CheckMark } from "@/components/icons";
import { getDictionary } from "@/lib/dictionary";
import {
  alternates,
  hasLocale,
  localePath,
  locales,
  ogLocale,
  resolveLang,
} from "@/lib/i18n";
import { getService, getServices } from "@/lib/services";
import { clampDescription, pageTitle } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { params: Promise<{ lang: string; slug: string }> };

/** Every service exists in both languages, under the same slug. */
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getServices(lang).map((service) => ({ lang, slug: service.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const service = getService(lang, slug);
  if (!service) return {};

  const path = localePath(lang, `/services/${slug}`);
  const url = `${site.url}${path}`;
  const t = getDictionary(lang).serviceDetail;
  // The lead is written to work as a search snippet, so it doubles as the
  // meta description. These pages are the one place that overrides the shared
  // site description, because each ranks for a different intent.
  const description = clampDescription(service.lead);

  return {
    title: pageTitle(service.title),
    description,
    alternates: alternates(lang, `/services/${slug}`),
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: ogLocale[lang],
      url,
      title: `${service.title} · ${site.name}`,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t.by(service.title, site.name),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} · ${site.name}`,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const service = getService(lang, slug);
  if (!service) notFound();

  const t = getDictionary(lang).serviceDetail;
  const home = getDictionary(lang).common.home;
  const href = (path: string) => localePath(lang, path);
  const url = `${site.url}${href(`/services/${slug}`)}`;

  /**
   * Service, FAQPage and BreadcrumbList, all derived from the same module the
   * page renders, so the markup cannot drift from the copy. No `offers` node:
   * the page publishes no price.
   */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: service.answer.body,
        url,
        provider: { "@type": "Organization", name: site.name, url: site.url },
        areaServed: { "@type": "Country", name: "United States" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.catalog(service.title),
          itemListElement: service.deliverables.map((item) => ({
            "@type": "OfferCatalog",
            name: item,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: home,
            item: `${site.url}${lang === "en" ? "" : href("/")}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t.servicesCrumb,
            item: `${site.url}${href("/services")}`,
          },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <header className="mx-auto max-w-[76rem] px-6 pt-20 pb-14 lg:px-10 lg:pt-28 lg:pb-20">
        <nav
          aria-label={getDictionary(lang).common.breadcrumb}
          className="eyebrow text-slate"
        >
          <Link href={href("/services")} className="transition-colors hover:text-ink">
            {t.breadcrumb}
          </Link>
          <span aria-hidden className="mx-3">
            /
          </span>
          <span className="text-ink">{service.eyebrow}</span>
        </nav>

        <h1 className="mt-5 max-w-[20ch] text-title">{service.h1}</h1>
        <p className="mt-7 max-w-[58ch] text-lead text-steel">{service.lead}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#contact" className="w-full sm:w-auto">
            {t.startProject}
          </ButtonLink>
          <ButtonLink
            href={href("/services")}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            {t.seeAll}
          </ButtonLink>
        </div>

        <div className="tick-rule mt-14" />
      </header>

      {/* Direct answer. Deliberately the first thing after the hero: it is the
          block an assistant quotes when asked what this service is. */}
      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-slate">{t.inShort}</p>
            <h2 className="mt-5 max-w-[24ch] text-title">
              {service.answer.question}
            </h2>
            <p className="mt-7 max-w-[62ch] text-lead text-steel">
              {service.answer.body}
            </p>
          </div>

          <div className="border border-[var(--color-line)] bg-mist p-7 lg:p-9">
            <p className="eyebrow text-ink">{t.included}</p>
            <ul className="mt-6 space-y-4">
              {service.answer.includes.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <CheckMark className="mt-1 size-5 shrink-0 text-ink" />
                  <span className="text-steel">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="border-y border-[var(--color-line)] bg-mist">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">{t.audienceEyebrow}</p>
          <h2 className="mt-5 max-w-[24ch] text-title">{t.audienceTitle}</h2>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {service.audience.map((item) => (
              <article
                key={item.title}
                className="border border-[var(--color-line)] bg-paper p-7 lg:p-9"
              >
                <h3 className="text-xl tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-4 text-steel">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow text-slate">{t.deliverablesEyebrow}</p>
        <h2 className="mt-5 max-w-[24ch] text-title">{t.deliverablesTitle}</h2>
        <p className="mt-7 max-w-[62ch] text-lead text-steel">
          {t.deliverablesLead}
        </p>

        <ul className="mt-14 grid gap-x-16 gap-y-5 border-t border-[var(--color-line)] pt-10 lg:grid-cols-2">
          {service.deliverables.map((item) => (
            <li key={item} className="flex gap-4">
              <CheckMark className="mt-1 size-5 shrink-0 text-ink" />
              <span className="text-lead text-steel">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Process. Numbered because it genuinely is a sequence. */}
      <section className="border-y border-[var(--color-line)] bg-mist">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">{t.processEyebrow}</p>
          <h2 className="mt-5 max-w-[24ch] text-title">{t.processTitle}</h2>

          <ol className="mt-16 border-t border-[var(--color-line)]">
            {service.process.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-4 border-b border-[var(--color-line)] py-8 lg:grid-cols-[5rem_16rem_1fr] lg:gap-10"
              >
                <span className="font-label text-sm text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl tracking-[-0.025em]">{item.title}</h3>
                <p className="max-w-[62ch] text-steel">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow text-slate">{t.faqEyebrow}</p>
        <h2 className="mt-5 max-w-[24ch] text-title">
          {t.faqTitle(service.title)}
        </h2>

        <div className="mt-14">
          <FaqList items={service.faq} />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-[var(--color-line)] bg-mist"
      >
        <div className="mx-auto max-w-[76rem] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
            <div>
              <p className="eyebrow text-slate">{t.contactEyebrow}</p>
              <h2 className="mt-5 max-w-[16ch] text-title">{t.contactTitle}</h2>
              <p className="mt-7 max-w-[44ch] text-lead text-steel">
                {t.contactLead}
              </p>
              <div className="mt-10">
                <ContactDetails lang={lang} />
              </div>

              <Link
                href={href("/services")}
                className="mt-10 flex items-center gap-2 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-steel"
              >
                {t.browseOther}
                <ArrowRight className="size-5 shrink-0" />
              </Link>
            </div>

            {/* Same short form as /contact, tagged so the automation can tell
                which service page produced the lead. */}
            <ContactForm
              lang={lang}
              fields="short"
              source={`service-${service.slug}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
