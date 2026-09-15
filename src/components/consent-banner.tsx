"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  isConsentPanelOpen,
  readConsent,
  saveConsent,
  subscribe,
  type ConsentState,
} from "@/lib/consent";

/**
 * The cookie banner. The Google tag itself is in the root layout's head, so
 * Google can detect it; it starts with every consent signal denied, and only
 * the "Accept" here grants them (Consent Mode v2, advanced).
 *
 * Accept and Decline are the same button with the same weight, side by side
 * on the first and only layer: regulators require refusing to be as easy as
 * accepting.
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

  if (consent !== "unset" && !reopened) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      tabIndex={-1}
      // Opened from "Cookie settings": move focus in so keyboard users land on
      // the choice. On first load, leave focus where it is.
      ref={reopened ? (node) => node?.focus() : undefined}
      className="fixed inset-x-4 bottom-4 z-[55] border border-[var(--color-line-strong)] bg-paper p-6 shadow-[0_18px_40px_rgba(24,24,27,0.18)] sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-[26rem]"
    >
      <p id="consent-title" className="eyebrow text-slate">
        Cookies
      </p>
      <p id="consent-body" className="mt-3 text-[0.9375rem] text-steel">
        We use Google&rsquo;s tag to measure whether our ads bring people here,
        to show our ads to people who visited, and to count visits in Google
        Analytics. It sets cookies only if you accept, and declining changes
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
  );
}
