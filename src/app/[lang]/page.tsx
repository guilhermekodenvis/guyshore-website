import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ArrowRight, CheckMark, LinkedInMark } from "@/components/icons";
import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { FeasibilityPanel } from "@/components/feasibility-panel";
import { GoogleReviews } from "@/components/google-reviews";
import { Hero } from "@/components/hero";
import { LatestPosts } from "@/components/latest-posts";
import { Partners } from "@/components/partners";
import { PortfolioCard } from "@/components/portfolio-card";
import { ServiceCard } from "@/components/service-card";
import { getDictionary } from "@/lib/dictionary";
import { faq } from "@/lib/faq";
import { homeCopy } from "@/lib/home";
import { getHomeSchema } from "@/lib/home-schema";
import { alternates, localePath, ogLocale, resolveLang } from "@/lib/i18n";
import { getFeaturedPortfolio } from "@/lib/portfolio";
import { getHomeServices, getMethod } from "@/lib/services";
import { getFounder } from "@/lib/team";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  const home = homeCopy[lang];
  const url = localePath(lang, "/");

  return {
    // English emits <link rel="canonical" href="https://guyshore.com"/>: Next
    // strips the root trailing slash because `trailingSlash` is false.
    alternates: alternates(lang, "/"),
    title: { absolute: home.title },
    description: home.description,
    openGraph: {
      type: "website",
      url,
      locale: ogLocale[lang],
      title: home.title,
      description: home.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).home;
  const home = homeCopy[lang];
  const founder = getFounder(lang);
  const href = (path: string) => localePath(lang, path);

  return (
    <>
      {/* Server-rendered structured data. Must stay out of a client component
          so it is present in the initial HTML for crawlers. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomeSchema(lang)) }}
      />

      {/* The hero owns the first screen on its own. */}
      <div className="flex min-h-[calc(100dvh-4.5rem)] flex-col">
        <Hero lang={lang} />
      </div>

      <Partners lang={lang} />

      <FeasibilityPanel lang={lang} />

      {/* Client reviews, from the Google Business Profile. Renders nothing
          until the profile has at least one review and the API key is set. */}
      <GoogleReviews lang={lang} />

      {/* Our services */}
      <section
        id="services"
        className="mx-auto max-w-[76rem] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
      >
        <p className="eyebrow text-slate">{t.servicesEyebrow}</p>
        <h2 className="mt-5 max-w-[24ch] text-title">{home.servicesTitle}</h2>
        <p className="mt-7 max-w-[68ch] text-lead text-steel">
          {home.servicesLead}
        </p>

        {/* Two per row from md up, one per row below it. `items-stretch` is
            implicit in grid, so paired cards match height. */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {getHomeServices(lang).map((service) => (
            <ServiceCard key={service.slug} lang={lang} service={service} />
          ))}
        </div>

        {/* The home grid is the four core services. Three more live on the
            index, which is what this leads to. */}
        <div className="mt-14 flex justify-center">
          <ButtonLink href={href("/services")} variant="ghost">
            {getDictionary(lang).nav.viewAllServices}
            <ArrowRight className="size-5 shrink-0" />
          </ButtonLink>
        </div>
      </section>

      {/* Portfolio. Its own top border, to separate it from the services
          above. */}
      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">{t.portfolioEyebrow}</p>
          <h2 className="mt-5 max-w-[22ch] text-title">{t.portfolioTitle}</h2>
          <p className="mt-7 max-w-[64ch] text-lead text-steel">
            {t.portfolioLead}
          </p>

          {/* One column until lg: three cards side by side on a tablet leave
              each cover too small to read. */}
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {getFeaturedPortfolio(lang).map((item) => (
              <PortfolioCard
                key={item.slug}
                lang={lang}
                item={item}
                sizes="(min-width: 1024px) 362px, 100vw"
              />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <ButtonLink href={href("/portfolio")} variant="ghost">
              {t.viewAllProjects}
              <ArrowRight className="size-5 shrink-0" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Our method */}
      <section className="border-y border-[var(--color-line)] bg-mist">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">{t.methodEyebrow}</p>
          <h2 className="mt-5 max-w-[24ch] text-title">{t.methodTitle}</h2>
          <p className="mt-7 max-w-[64ch] text-lead text-steel">
            {t.methodLead}
          </p>

          <ol className="mt-16 border-t border-[var(--color-line)]">
            {getMethod(lang).map((item) => (
              <li
                key={item.step}
                className="grid gap-4 border-b border-[var(--color-line)] py-8 lg:grid-cols-[5rem_16rem_1fr] lg:gap-10"
              >
                <span className="font-label text-sm text-ink">{item.step}</span>
                <h3 className="text-xl tracking-[-0.025em]">{item.title}</h3>
                <p className="max-w-[62ch] text-steel">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we are */}
      <section className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow text-slate">{t.whoEyebrow}</p>
        <h2 className="mt-5 max-w-[24ch] text-title">{t.whoTitle}</h2>
        <p className="mt-7 max-w-[66ch] text-lead text-steel">{home.about}</p>

        <div className="mt-16 grid gap-10 border-t border-[var(--color-line)] pt-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-ink">
            <Image
              src={founder.photo}
              alt={founder.name}
              fill
              sizes="(min-width: 1024px) 20rem, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="eyebrow text-ink">{founder.role}</p>
            <h3 className="mt-4 text-3xl tracking-[-0.03em]">{founder.name}</h3>
            <p className="mt-6 max-w-[54ch] text-lead text-steel">
              {founder.bio}
            </p>
            <ButtonLink
              href={founder.linkedin}
              variant="linkedin"
              target="_blank"
              rel="noreferrer"
              className="mt-8"
            >
              <LinkedInMark className="size-[1.15em] shrink-0" />
              {t.linkedin}
              {/* The mark says which network but not that the link leaves the
                  site, so it is paired with a spoken equivalent. */}
              <span className="sr-only">
                {getDictionary(lang).common.opensNewTab}
              </span>
            </ButtonLink>

            {/* The numbers sit in a row and their labels never wrap. Each
                takes the width its own label needs instead of a fixed third
                of the row, which is what pushed "years coding without AI"
                onto two lines. On a phone they stack. The one highlight that
                is a statement rather than a number runs full width below. */}
            <div className="mt-10 max-w-[40rem] border-t border-[var(--color-line)] pt-8">
              <ul className="grid gap-6 sm:flex sm:flex-wrap sm:gap-x-12">
                {founder.highlights
                  .filter((item) => item.value)
                  .map((item) => (
                    <li key={item.label}>
                      <span className="block font-display text-4xl tracking-[-0.03em] text-ink">
                        {item.value}
                      </span>
                      <span className="mt-1 block whitespace-nowrap text-steel">
                        {item.label}
                      </span>
                    </li>
                  ))}
              </ul>

              {founder.highlights
                .filter((item) => !item.value)
                .map((item) => (
                  <p key={item.label} className="mt-6 flex gap-3 text-steel">
                    <CheckMark className="mt-1 size-5 shrink-0 text-ink" />
                    {item.label}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest posts: the three newest in this language, then a link to the
          blog index. */}
      <LatestPosts lang={lang} />

      {/* FAQ */}
      <section className="border-t border-[var(--color-line)] bg-mist">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">{t.faqEyebrow}</p>
          <h2 className="mt-5 max-w-[20ch] text-title">{t.faqTitle}</h2>

          <div className="mt-14">
            <FaqList items={faq[lang]} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-[76rem] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
      >
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
          </div>

          <ContactForm lang={lang} fields="short" source="home" />
        </div>
      </section>
    </>
  );
}
