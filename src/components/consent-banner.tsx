"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import {
  GOOGLE_ADS_ID,
  isConsentPanelOpen,
  readConsent,
  saveConsent,
  subscribe,
  type ConsentState,
} from "@/lib/consent";

/**
 * The cookie banner, and the Google Ads tag behind it.
 *
 * The tag is rendered only after the visitor accepts, so a visitor who
 * declines, or has not chosen yet, never contacts Google. Accept and Decline
 * are the same button with the same weight, side by side on the first and
 * only layer: regulators require refusing to be as easy as accepting.
 *
 * Nothing renders on the server or during hydration ("pending"); the banner
 * appears once the stored choice has been read. It is fixed-position, so
 * appearing late shifts nothing on the page.
 */

const getServerConsent = (): ConsentState => "pending";
const getServerOpen = () => false;

const BUTTON =
  "rounded-full bg-ink px-5 py-2.5 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-paper transition-colors hover:bg-steel";

export function ConsentBanner() {
  const consent = useSyncExternalStore<ConsentState>(
    subscribe,
    readConsent,
    getServerConsent,
  );
  const reopened = useSyncExternalStore(
    subscribe,
    isConsentPanelOpen,
    getServerOpen,
  );

  const showPanel = consent === "unset" || reopened;

  return (
    <>
      {consent === "granted" ? <GoogleAdsTag /> : null}

      {showPanel ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          aria-describedby="consent-body"
          tabIndex={-1}
          // Opened from "Cookie settings": move focus in so keyboard users
          // land on the choice. On first load, leave focus where it is.
          ref={reopened ? (node) => node?.focus() : undefined}
          className="fixed inset-x-4 bottom-4 z-[55] border border-[var(--color-line-strong)] bg-paper p-6 shadow-[0_18px_40px_rgba(24,24,27,0.18)] sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-[26rem]"
        >
          <p id="consent-title" className="eyebrow text-slate">
            Cookies
          </p>
          <p id="consent-body" className="mt-3 text-[0.9375rem] text-steel">
            We use Google&rsquo;s tag to measure whether our ads bring people
            here, to show our ads to people who visited, and to count visits in
            Google Analytics. It loads only if you accept, and declining changes
            nothing else on the site. Details are in our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-ink underline decoration-[var(--color-line-strong)] underline-offset-4 hover:decoration-ink"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => saveConsent("denied")}
              className={BUTTON}
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => saveConsent("granted")}
              className={BUTTON}
            >
              Accept
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

/**
 * Google's snippet, loaded only on consent. The consent default is declared
 * denied and then updated to granted, so Google receives an explicit signal
 * (Consent Mode v2) rather than inferring one.
 *
 * The tag also reports to Google Analytics (property G-EF3ENX72GF), because
 * that destination is attached to this Google tag in the Google account, not
 * in this code; the banner and the privacy policy disclose it. Analytics
 * storage stays denied, so Analytics measures without setting its cookies.
 */
function GoogleAdsTag() {
  return (
    <>
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
