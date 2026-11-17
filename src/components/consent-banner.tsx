"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { GlassCardLens } from "@/components/glass-card-lens";
import {
  isConsentPanelOpen,
  readConsent,
  saveConsent,
  subscribe,
  type ConsentState,
} from "@/lib/consent";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";

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
 *
 * The card is the header island's Liquid Glass (`.consent-glass` in
 * globals.css): the same ring, sheen and float shadow, a thicker body that
 * can carry a paragraph, the refracting rim on Chromium desktop, and the
 * island's dark tone over the ink sections.
 */

const getServerConsent = (): ConsentState => "pending";
const getServerOpen = () => false;

/* Over an ink section the card turns smoky with paper text, as the island
   does. Only the full-bleed dark surfaces that already say so for the
   island count (`data-nav-tone="dark"`), and only when they cover most of
   the card: a card half over the footer stays light, which reads fine on
   either side. Read through useSyncExternalStore, so no effect sets state;
   one measurement per frame, coalesced from scroll and resize. */
type CardTone = "light" | "dark";
let cardTone: CardTone = "light";
let frame = 0;
const toneListeners = new Set<() => void>();

function measureCardTone(): CardTone {
  const card = document.querySelector(".consent-glass");
  if (!card) return "light";
  const r = card.getBoundingClientRect();
  const area = r.width * r.height;
  for (const el of document.querySelectorAll('[data-nav-tone="dark"]')) {
    const d = el.getBoundingClientRect();
    const w = Math.min(r.right, d.right) - Math.max(r.left, d.left);
    const h = Math.min(r.bottom, d.bottom) - Math.max(r.top, d.top);
    if (w > 0 && h > 0 && w * h >= 0.6 * area) return "dark";
  }
  return "light";
}

function updateCardTone() {
  frame = 0;
  const next = measureCardTone();
  if (next === cardTone) return;
  cardTone = next;
  toneListeners.forEach((listener) => listener());
}

function scheduleCardTone() {
  if (!frame) frame = requestAnimationFrame(updateCardTone);
}

function subscribeCardTone(listener: () => void) {
  if (toneListeners.size === 0) {
    window.addEventListener("scroll", scheduleCardTone, { passive: true });
    window.addEventListener("resize", scheduleCardTone);
  }
  toneListeners.add(listener);
  updateCardTone();
  return () => {
    toneListeners.delete(listener);
    if (toneListeners.size === 0) {
      window.removeEventListener("scroll", scheduleCardTone);
      window.removeEventListener("resize", scheduleCardTone);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

const getCardTone = () => cardTone;
const getServerCardTone = (): CardTone => "light";

/* The ring is currentColor, which on a paper-on-ink pill is paper: invisible
   on the light card. Ink on light, paper on dark, as on the header's pill. */
const BUTTON =
  "rounded-full bg-ink px-5 py-2.5 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-paper transition-colors duration-300 hover:bg-steel focus-visible:outline-ink group-data-[tone=dark]:bg-paper group-data-[tone=dark]:text-ink group-data-[tone=dark]:hover:bg-mist group-data-[tone=dark]:focus-visible:outline-paper";

export function ConsentBanner({ lang }: { lang: Locale }) {
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
  return <ConsentCard reopened={reopened} lang={lang} />;
}

function ConsentCard({
  reopened,
  lang,
}: {
  reopened: boolean;
  lang: Locale;
}) {
  const t = getDictionary(lang).consent;
  const card = useRef<HTMLDivElement | null>(null);
  const tone = useSyncExternalStore(subscribeCardTone, getCardTone, getServerCardTone);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      tabIndex={-1}
      // Opened from "Cookie settings": move focus in so keyboard users land on
      // the choice. On first load, leave focus where it is.
      ref={(node) => {
        card.current = node;
        if (reopened) node?.focus();
      }}
      data-tone={tone}
      className="group consent-glass fixed inset-x-4 bottom-4 z-[55] p-7 sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-[26rem]"
    >
      {/* The material lives on a child: the card itself must never be a
          backdrop root (see globals.css). */}
      <div className="consent-surface" aria-hidden="true" />
      <GlassCardLens cardRef={card} id="consent-lens" />
      <p
        id="consent-title"
        className="eyebrow text-steel transition-colors duration-300 group-data-[tone=dark]:text-paper/75"
      >
        {t.eyebrow}
      </p>
      <p
        id="consent-body"
        className="mt-3 text-[0.9375rem] text-steel transition-colors duration-300 group-data-[tone=dark]:text-paper/85"
      >
        {t.bodyBefore}{" "}
        <Link
          href={localePath(lang, "/privacy")}
          className="font-semibold text-ink underline decoration-[var(--color-line-strong)] underline-offset-4 transition-colors duration-300 hover:decoration-ink group-data-[tone=dark]:text-paper group-data-[tone=dark]:decoration-paper/40 group-data-[tone=dark]:hover:decoration-paper"
        >
          {t.privacy}
        </Link>
        .
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => saveConsent("denied")}
          className={BUTTON}
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => saveConsent("granted")}
          className={BUTTON}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
