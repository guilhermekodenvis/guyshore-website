import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GuyShore handles personal data: what the contact form collects, who processes it, how long it is kept, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
};

/** Shown on the page and used as the schema's dateModified. */
const UPDATED = "2026-08-19";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        title="What we collect, and what we do not."
        lead="This site runs no analytics, sets no tracking cookies and shows no advertising. The only personal data we hold is what you choose to send us."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="prose max-w-[68ch]">
          <p className="font-label text-xs tracking-[0.08em] text-slate uppercase">
            Last updated {UPDATED}
          </p>

          <h2>Who is responsible for your data</h2>
          <p>
            {site.listingName} is the controller of the personal data described
            here. You can reach us at {site.address.street},{" "}
            {site.address.postalCode} {site.address.city},{" "}
            {site.address.country}, by phone on {site.phone.display} or by
            email at {site.email}.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>What you send through the contact form.</strong> Your name,
            your email address and your message. The form also has optional
            fields for your company and what you need. We do not ask for
            anything else, and nothing in the form is required beyond what is
            marked as such.
          </p>
          <p>
            <strong>Technical records from our host.</strong> Serving a web
            page necessarily involves your IP address, your browser type and
            the time of the request. Our hosting provider records these in
            standard server logs. We do not connect them to anything else and
            we do not use them to build a profile of you.
          </p>
          <p>
            That is the complete list. There is no analytics script on this
            site, no advertising pixel and no third-party tracker.
          </p>

          <h2>Why we use it, and on what basis</h2>
          <p>
            We use what you send through the form to answer you and, if the
            conversation continues, to prepare a proposal. Under the General
            Data Protection Regulation the basis for this is our legitimate
            interest in responding to someone who contacted us, and, once a
            project is under discussion, the steps taken at your request before
            entering into a contract.
          </p>
          <p>
            We use the server logs to keep the site running and secure, which
            is also a legitimate interest.
          </p>

          <h2>Who else handles it</h2>
          <p>
            We keep the number of companies touching your data as small as we
            can. Each one processes it on our instructions and for no purpose
            of their own:
          </p>
          <ul>
            <li>
              <strong>Netlify</strong> hosts the site and produces the server
              logs described above.
            </li>
            <li>
              <strong>n8n Cloud</strong> receives each form submission and
              routes it to our inbox.
            </li>
            <li>
              <strong>Google Workspace</strong> provides the mailbox where your
              message arrives and where our reply is written.
            </li>
          </ul>
          <p>
            We do not sell personal data, and we do not share it with anyone
            for marketing.
          </p>

          <h2>Data leaving the European Economic Area</h2>
          <p>
            The providers above are United States companies and your data may
            be processed there. Those transfers rely on the European
            Commission&rsquo;s standard contractual clauses, or on the EU to US
            Data Privacy Framework where the provider is certified under it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            If a message does not lead to work together, we delete it within
            twelve months. If it does, we keep the correspondence for as long
            as the working relationship lasts and then for the period our
            accounting and tax obligations require. Server logs are kept for a
            short retention window by our host and are not archived by us.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us for a copy of the data we hold about you, ask us to
            correct it, ask us to delete it, ask us to restrict how we use it,
            ask for it in a portable format, or object to our use of it. Write
            to {site.email} and we will respond within one month.
          </p>
          <p>
            If you believe we have handled your data badly, you can complain to
            the Portuguese data protection authority, the Comissão Nacional de
            Proteção de Dados, or to the authority in the country where you
            live.
          </p>

          <h2>Cookies</h2>
          <p>
            This site sets no cookies of its own. It does not use cookies for
            analytics, personalization or advertising, which is why you are not
            being asked to accept any.
          </p>

          <h2>Children</h2>
          <p>
            This site is aimed at businesses and is not directed at children.
            We do not knowingly collect data from anyone under sixteen.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change how we handle personal data, we will update this page
            and change the date at the top. Material changes will be described
            rather than quietly folded in.
          </p>

          <h2>Getting in touch</h2>
          <p>
            Any question about this policy can go to {site.email} or{" "}
            {site.phone.display}. You can also use the{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
