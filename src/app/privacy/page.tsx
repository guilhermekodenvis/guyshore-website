import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GuyShore handles personal data: what the contact form collects, the Google tag that runs only with your consent, who processes your data, how long it is kept, and your rights.",
  alternates: { canonical: "/privacy" },
};

/** Shown on the page and used as the schema's dateModified. */
const UPDATED = "2026-09-15";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        title="What we collect, and what we do not."
        lead="This site has one Google tag, used for Google Ads and Google Analytics, and it loads only if you accept it. Beyond that, the only personal data we hold is what you choose to send us."
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
            <strong>Advertising and visit data, only if you accept.</strong> If
            you accept cookies, the Google tag records that you visited, the
            pages you view, your IP address, your browser and device, and
            whether you arrived from one of our ads. It sends this to Google Ads,
            so we can measure whether our ads work and Google can show our ads
            to people who have visited the site, and to Google Analytics, so we
            can count visits and see which pages people read. If you decline, or
            do not choose, the tag is never loaded and none of this is
            collected.
          </p>
          <p>That is the complete list. Nothing else on this site tracks you.</p>

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
          <p>
            The Google tag runs only on your consent. You can withdraw it at any
            time from <strong>Cookie settings</strong> at the bottom of every
            page, and withdrawing is as easy as accepting was.
          </p>

          <h2>Who else handles it</h2>
          <p>
            We keep the number of companies touching your data as small as we
            can. These process it on our instructions and for no purpose of
            their own:
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
            <strong>Google Ads and Google Analytics</strong>, run by Google
            Ireland Limited, are different. If you accept the tag, Google
            receives the advertising and visit data described above and also
            uses it under its own terms, which are explained in{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
            >
              how Google uses information from sites that use its services
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
          <p>
            We do not sell personal data. Apart from the Google tag, which you
            can decline, we do not share it with anyone for marketing.
          </p>

          <h2>Data leaving the European Economic Area</h2>
          <p>
            The providers above are United States companies or part of United
            States groups, and your data may be processed there. Those transfers
            rely on the European Commission&rsquo;s standard contractual
            clauses, or on the EU to US Data Privacy Framework where the
            provider is certified under it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            If a message does not lead to work together, we delete it within
            twelve months. If it does, we keep the correspondence for as long
            as the working relationship lasts and then for the period our
            accounting and tax obligations require. Server logs are kept for a
            short retention window by our host and are not archived by us.
          </p>
          <p>
            The Google Ads cookie expires after 90 days. We remember your cookie
            choice for up to 13 months if you accept and 6 months if you
            decline, and then ask again.
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

          <h2>Cookies and storage on your device</h2>
          <p>
            <strong>If you accept</strong>, the Google tag sets the{" "}
            <code>_gcl_au</code> cookie, which links a visit to an ad you
            clicked and lasts 90 days. Google Analytics runs without setting its
            own cookies on this site. Google may also read or set cookies on its
            own domains, under its own policy.
          </p>
          <p>
            <strong>If you decline</strong>, no advertising or analytics cookie
            is set and the tag is never loaded.
          </p>
          <p>
            <strong>Either way</strong>, we keep your choice in your
            browser&rsquo;s local storage under the name{" "}
            <code>guyshore-consent</code>, so we do not ask on every page. It
            holds only your choice and the date you made it, and exists so that
            your decision is respected. You can change your mind at any time
            from <strong>Cookie settings</strong> at the bottom of every page;
            withdrawing an acceptance deletes the Google Ads cookie.
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
            rather than quietly folded in. The change of {UPDATED} added the
            Google tag, for Google Ads and Google Analytics, and the choice to
            accept or decline it.
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
