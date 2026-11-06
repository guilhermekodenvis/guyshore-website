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
import { homeSchema } from "@/lib/home-schema";
import { featuredPortfolio } from "@/lib/portfolio";
import { method, homeServices } from "@/lib/services";
import { founder } from "@/lib/team";
import { home } from "@/lib/home";

export const metadata: Metadata = {
  // Emits <link rel="canonical" href="https://guyshore.com"/>. Next strips the
  // root trailing slash because `trailingSlash` is false; passing the absolute
  // URL with a slash does not change that.
  alternates: { canonical: "/" },
  title: { absolute: home.title },
  description: home.description,
  openGraph: { type: "website", url: "/", title: home.title, description: home.description, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: home.title, description: home.description, images: ["/og-image.png"] },
};

export default function HomePage() {
  return (
    <>
      {/* Server-rendered structured data. Must stay out of a client component
          so it is present in the initial HTML for crawlers. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* The hero owns the first screen on its own. */}
      <div className="flex min-h-[calc(100dvh-4.5rem)] flex-col">
        <Hero />
      </div>

      <Partners />

      <FeasibilityPanel />

      {/* Client reviews, from the Google Business Profile. Renders nothing
          until the profile has at least one review and the API key is set. */}
      <GoogleReviews />

      {/* Our services */}
      <section
        id="services"
        className="mx-auto max-w-[76rem] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
      >
        <p className="eyebrow text-slate">Our services</p>
        <h2 className="mt-5 max-w-[24ch] text-title">
          {home.servicesTitle}
        </h2>
        <p className="mt-7 max-w-[68ch] text-lead text-steel">
          {home.servicesLead}
        </p>

        {/* Two per row from md up, one per row below it. `items-stretch` is
            implicit in grid, so paired cards match height. */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {homeServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* The home grid is the four core services. Three more live on the
            index, which is what this leads to. */}
        <div className="mt-14 flex justify-center">
          <ButtonLink href="/services" variant="ghost">
            View all services
            <ArrowRight className="size-5 shrink-0" />
          </ButtonLink>
        </div>
      </section>

      {/* Portfolio. Its own top border, to separate it from the services
          above. */}
      <section className="border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">Portfolio</p>
          <h2 className="mt-5 max-w-[22ch] text-title">
            Software we built for real companies.
          </h2>
          <p className="mt-7 max-w-[64ch] text-lead text-steel">
            Websites, management platforms and mobile apps, each one taken from
            the first screen to production and handed over running.
          </p>

          {/* One column until lg: three cards side by side on a tablet leave
              each cover too small to read. */}
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {featuredPortfolio.map((item) => (
              <PortfolioCard
                key={item.slug}
                item={item}
                sizes="(min-width: 1024px) 362px, 100vw"
              />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <ButtonLink href="/portfolio" variant="ghost">
              View all projects
              <ArrowRight className="size-5 shrink-0" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Our method */}
      <section className="border-y border-[var(--color-line)] bg-mist">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">Our method</p>
          <h2 className="mt-5 max-w-[24ch] text-title">
            How we turn repetitive work into reliable workflows.
          </h2>
          <p className="mt-7 max-w-[64ch] text-lead text-steel">
            We map your process, agree on the scope, connect your tools and test the workflow before your team relies on it. You know what runs automatically and where a person stays in control.
          </p>

          <ol className="mt-16 border-t border-[var(--color-line)]">
            {method.map((item) => (
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
        <p className="eyebrow text-slate">Who we are</p>
        <h2 className="mt-5 max-w-[24ch] text-title">
          Automation and software built around your business.
        </h2>
        <p className="mt-7 max-w-[66ch] text-lead text-steel">
          {home.about}
        </p>

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
              Connect with me on LinkedIn
              {/* The mark says which network but not that the link leaves the
                  site, so it is paired with a spoken equivalent. */}
              <span className="sr-only">(opens in a new tab)</span>
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

      {/* Latest posts: the three newest, then a link to the blog index. */}
      <LatestPosts />

      {/* FAQ */}
      <section className="border-t border-[var(--color-line)] bg-mist">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-slate">FAQ</p>
          <h2 className="mt-5 max-w-[20ch] text-title">
            Small business automation questions, answered.
          </h2>

          <div className="mt-14">
            <FaqList />
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
            <p className="eyebrow text-slate">Contact</p>
            <h2 className="mt-5 max-w-[16ch] text-title">
              What would you like to stop doing manually?
            </h2>
            <p className="mt-7 max-w-[44ch] text-lead text-steel">
              Tell us about your business, the tools you use and one task that takes too much time. To request the €50 consultation, mention it in your message. We will reply within one working day to arrange next steps.
            </p>
            <div className="mt-10">
              <ContactDetails />
            </div>
          </div>

          <ContactForm fields="short" source="home" />
        </div>
      </section>
    </>
  );
}
