import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { Hero } from "@/components/hero";
import { ServiceCard } from "@/components/service-card";
import { ServiceMarquee } from "@/components/service-marquee";
import { homeSchema } from "@/lib/home-schema";
import { method, services } from "@/lib/services";
import { founder } from "@/lib/team";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  // Emits <link rel="canonical" href="https://guyshore.com"/>. Next strips the
  // root trailing slash because `trailingSlash` is false; passing the absolute
  // URL with a slash does not change that.
  alternates: { canonical: "/" },
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

      <Hero />

      <ServiceMarquee />

      {/* Numbers */}
      <section className="border-b border-[var(--color-line)] bg-foam">
        <dl className="mx-auto grid max-w-[76rem] grid-cols-2 gap-y-10 px-6 py-14 lg:grid-cols-4 lg:px-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-bold tracking-[-0.04em] lg:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block font-mono text-xs tracking-[0.08em] text-surf uppercase">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Our services */}
      <section
        id="services"
        className="mx-auto max-w-[76rem] scroll-mt-24 px-6 py-24 lg:px-10 lg:py-32"
      >
        <p className="eyebrow text-surf">Our services</p>
        <h2 className="mt-5 max-w-[24ch] text-title">
          Your MVP or software built in weeks, not months.
        </h2>
        <p className="mt-7 max-w-[68ch] text-lead text-tide">
          We build production software for founders and startups: web apps,
          SaaS platforms, mobile products and the automations that run behind
          them. Fixed scope, clear timelines, and full source code ownership
          from day one.
        </p>

        <div className="mt-16 space-y-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Our method */}
      <section className="border-y border-[var(--color-line)] bg-foam">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-surf">Our method</p>
          <h2 className="mt-5 max-w-[24ch] text-title">
            How do we build your software or MVP?
          </h2>
          <p className="mt-7 max-w-[64ch] text-lead text-tide">
            You need your SaaS, software, app or automation delivered quickly
            and done well. That is why we created our five-step method.
          </p>

          <ol className="mt-16 border-t border-[var(--color-line)]">
            {method.map((item) => (
              <li
                key={item.step}
                className="grid gap-4 border-b border-[var(--color-line)] py-8 lg:grid-cols-[5rem_16rem_1fr] lg:gap-10"
              >
                <span className="font-mono text-sm text-noon">{item.step}</span>
                <h3 className="text-xl tracking-[-0.025em]">{item.title}</h3>
                <p className="max-w-[62ch] text-tide">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we are */}
      <section className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow text-surf">Who we are</p>
        <h2 className="mt-5 max-w-[24ch] text-title">
          We specialize in MVP and software development.
        </h2>
        <p className="mt-7 max-w-[66ch] text-lead text-tide">
          {site.name} is an MVP and custom software development company for
          non-technical founders and startups. We build web apps, SaaS
          platforms, and mobile products from scratch, and take stalled
          AI-generated prototypes to production.
        </p>

        <div className="mt-16 grid gap-10 border-t border-[var(--color-line)] pt-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-deep">
            <Image
              src={founder.photo}
              alt={founder.name}
              fill
              sizes="(min-width: 1024px) 20rem, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="eyebrow text-noon">{founder.role}</p>
            <h3 className="mt-4 text-3xl tracking-[-0.03em]">{founder.name}</h3>
            <p className="mt-6 max-w-[54ch] text-lead text-tide">
              {founder.bio}
            </p>
            <p className="mt-4 max-w-[54ch] text-tide">
              EU-based engineering, working US business hours.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--color-line)] bg-foam">
        <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow text-surf">FAQ</p>
          <h2 className="mt-5 max-w-[20ch] text-title">
            Questions we get asked most.
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
            <p className="eyebrow text-surf">Contact</p>
            <h2 className="mt-5 max-w-[16ch] text-title">
              Tell us about your project.
            </h2>
            <p className="mt-7 max-w-[44ch] text-lead text-tide">
              Send us the short version and we will come back to you within one
              working day.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block font-display text-lg font-semibold tracking-[-0.02em] text-tide transition-colors hover:text-deep"
            >
              {site.email}
            </a>
          </div>

          <ContactForm fields="short" source="home" />
        </div>
      </section>
    </>
  );
}
