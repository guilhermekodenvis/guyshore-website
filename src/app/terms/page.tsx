import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply to using the GuyShore website: what you may do with the content, what the site does and does not promise, and which law governs it.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "2026-08-19";

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms of Use"
        title="The rules for using this website."
        lead="Short and in plain language. These terms cover the website itself. The work we do for clients is governed by the contract we sign with them, not by this page."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="prose max-w-[68ch]">
          <p className="font-label text-xs tracking-[0.08em] text-slate uppercase">
            Last updated {UPDATED}
          </p>

          <h2>Who operates this site</h2>
          <p>
            This website is operated by {site.listingName}, at{" "}
            {site.address.street}, {site.address.postalCode}{" "}
            {site.address.city}, {site.address.country}. You can reach us on{" "}
            {site.phone.display} or at {site.email}.
          </p>
          <p>
            By using the site you accept these terms. If you do not accept
            them, please do not use it.
          </p>

          <h2>Using the site</h2>
          <p>
            You may read, print and share our pages for your own use or your
            company&rsquo;s. What you may not do is interfere with the site,
            try to gain access to parts of it that are not public, scrape it at
            a volume that degrades it for other people, or use it to send us
            anything unlawful.
          </p>

          <h2>Our content</h2>
          <p>
            The text, design, code, logo and images on this site belong to us,
            except where they clearly belong to someone else. The partner logos
            shown on our home page belong to those companies and appear with
            their agreement.
          </p>
          <p>
            You are welcome to quote a passage with a link back to the page it
            came from. Republishing whole pages, or reusing the design or the
            code, needs our written permission.
          </p>

          <h2>What you send us</h2>
          <p>
            When you write to us through the contact form you keep ownership of
            what you send. You give us permission to read it, store it and
            reply to it, which is the whole point of sending it. Please do not
            send confidential information through the form before we have a
            confidentiality agreement in place. If your idea is sensitive, tell
            us that first and we will arrange one.
          </p>
          <p>
            How we handle the personal data in a submission is set out in our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Links to other sites</h2>
          <p>
            Some pages link to sites we do not run, including those of our
            partners. We link to them because we think they are useful, but we
            do not control them and we are not responsible for their content or
            their privacy practices. Read their terms when you get there.
          </p>

          <h2>What this site does and does not promise</h2>
          <p>
            We work to keep the information here accurate and the site
            available, but we do not guarantee either. Pages describe our
            services in general terms. They are not a quote, not an offer
            capable of acceptance, and not professional advice for your
            specific situation. Nothing on this site creates a contract between
            us.
          </p>
          <p>
            Timelines, scope and price for actual work are agreed in writing
            before a project starts, and it is that document that binds us, not
            anything on this page.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent the law allows, we are not liable for loss arising
            from your use of this website or from relying on its general
            information. Nothing here limits liability that cannot be limited
            by law, including liability for death, personal injury or fraud.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms. The version on this page is the one that
            applies, and the date above tells you when it last changed.
          </p>

          <h2>Which law applies</h2>
          <p>
            These terms are governed by Portuguese law, and the courts of
            Lisbon have jurisdiction over any dispute about them. If you are
            using the site as a consumer, this does not take away the
            protection of the mandatory law of the country you live in.
          </p>

          <h2>Getting in touch</h2>
          <p>
            Questions about these terms can go to {site.email} or{" "}
            {site.phone.display}, or through the{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
