import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your challenge. Send a message and we will come back to you within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/*
        Full-bleed banner. Drop the real asset in here and delete the
        decorative fill below:
          <Image src="/contact-banner.jpg" alt="" fill className="object-cover" priority />
      */}
      <div className="relative h-[400px] w-full overflow-hidden bg-deep">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 140% at 20% 10%, #2e6e7e 0%, transparent 60%), radial-gradient(80% 130% at 85% 95%, #12495a 0%, transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #e7edee 0 1px, transparent 1px 44px), repeating-linear-gradient(to bottom, #e7edee 0 1px, transparent 1px 44px)",
          }}
        />
      </div>

      <section className="mx-auto max-w-[76rem] px-6 pt-16 pb-24 lg:px-10 lg:pt-20 lg:pb-32">
        <p className="eyebrow text-surf">Contact</p>
        <h1 className="mt-5 max-w-[20ch] text-title">
          Let&rsquo;s talk about your challenge.
        </h1>
        <p className="mt-7 max-w-[58ch] text-lead text-tide">
          You have a challenge and we want to solve it for you. Our goal is to
          see your dream project finished. It is time to ship the thing you have
          been planning for months. Send us a message and let&rsquo;s get
          started.
        </p>

        <div className="tick-rule mt-14" />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <ContactForm fields="short" source="contact-page" />

          <aside className="space-y-12">
            <div>
              <p className="eyebrow text-surf">Prefer email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 block font-display text-xl font-semibold tracking-[-0.025em] text-tide transition-colors hover:text-deep"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="eyebrow text-surf">Office</p>
              <address className="mt-4 text-tide not-italic">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
