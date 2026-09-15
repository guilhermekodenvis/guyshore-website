"use client";

import { openConsentPanel } from "@/lib/consent";

/**
 * Reopens the cookie banner so a visitor can change or withdraw their choice.
 * Withdrawing has to be as easy as consenting, so this sits in the footer of
 * every page, next to the legal links.
 */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentPanel} className={className}>
      Cookie settings
    </button>
  );
}
