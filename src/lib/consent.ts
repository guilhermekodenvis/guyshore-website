/**
 * The visitor's consent for the Google Ads tag, the only thing on the site
 * that tracks anyone.
 *
 * Portuguese law (Lei 41/2004, art. 5) and Google's EU user consent policy
 * both require consent before the tag sets advertising cookies, so the tag is
 * not loaded at all until the visitor accepts ("basic" consent mode). A
 * refusal loads nothing.
 *
 * The choice itself is kept in localStorage under `guyshore-consent`. That is
 * storage on the device, but storage strictly necessary to honor the
 * visitor's own decision, which is exempt from consent; the privacy policy
 * names it. Following CNIL's guidance, an acceptance is honored for 13 months
 * and a refusal for 6, then the banner asks again.
 *
 * Client-only: every function here touches `window`. The React side reads it
 * through `useSyncExternalStore`, so no effect ever calls setState
 * (`react-hooks/set-state-in-effect` is an error in this repo).
 */

export const GOOGLE_ADS_ID = "AW-18077342694";

export type ConsentChoice = "granted" | "denied";

/** "pending" exists only on the server and during hydration. */
export type ConsentState = ConsentChoice | "unset" | "pending";

const STORAGE_KEY = "guyshore-consent";
const VERSION = 1;
const DAY = 24 * 60 * 60 * 1000;
const LIFETIME: Record<ConsentChoice, number> = {
  granted: 395 * DAY,
  denied: 182 * DAY,
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Used when storage is blocked (private windows), for this page view only. */
let memoryChoice: ConsentChoice | null = null;
let panelOpen = false;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // A choice made in another tab applies here too.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function readConsent(): ConsentChoice | "unset" {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return memoryChoice ?? "unset";

    const saved = JSON.parse(raw) as { v?: number; choice?: string; at?: string };
    if (saved.v !== VERSION) return "unset";
    if (saved.choice !== "granted" && saved.choice !== "denied") return "unset";

    const age = Date.now() - Date.parse(saved.at ?? "");
    return age >= 0 && age < LIFETIME[saved.choice] ? saved.choice : "unset";
  } catch {
    return memoryChoice ?? "unset";
  }
}

export function isConsentPanelOpen(): boolean {
  return panelOpen;
}

/** Reopens the banner, from "Cookie settings" in the footer. */
export function openConsentPanel(): void {
  panelOpen = true;
  notify();
}

export function saveConsent(choice: ConsentChoice): void {
  const previous = readConsent();

  memoryChoice = choice;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: VERSION, choice, at: new Date().toISOString() }),
    );
  } catch {
    // Storage blocked: the choice still holds for this page view.
  }
  panelOpen = false;

  if (previous === "granted" && choice === "denied") {
    withdraw();
    return;
  }
  notify();
}

/**
 * Withdrawing an earlier acceptance. A loaded script cannot be unloaded, so
 * tell Google consent is now denied, delete the first-party Google Ads
 * cookies, and reload into a page that never loads the tag.
 */
function withdraw(): void {
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name.startsWith("_gcl_"));

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }

  window.location.reload();
}
