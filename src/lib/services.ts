import type { Locale } from "@/lib/i18n";
import { methodEn, servicesEn } from "@/lib/services.en";
import { methodPt, servicesPt } from "@/lib/services.pt";

/**
 * Every service the company sells, and everything its detail page renders.
 *
 * Deliberately no timeline or price: scope and cost are quoted per project,
 * not published. Keep it that way, or the schema modules will start
 * advertising an Offer the pages do not show.
 */

export type ServiceItem = {
  slug: string;
  /** Card and navigation label. */
  title: string;
  /** Card copy, on the home grid and the services index. */
  description: string;
  /** The four core services: the home grid and the header dropdown. */
  onHome: boolean;

  /* ---- detail page ---- */
  eyebrow: string;
  h1: string;
  lead: string;
  /** AEO block: one question, answered plainly, plus what the work includes. */
  answer: { question: string; body: string; includes: string[] };
  /** "Who this is for", rendered as four cards in a 2x2 grid. */
  audience: { title: string; body: string }[];
  deliverables: string[];
  process: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
};


export type MethodStep = { step: string; title: string; body: string };

const byLang: Record<Locale, ServiceItem[]> = { en: servicesEn, pt: servicesPt };
const methodByLang: Record<Locale, MethodStep[]> = { en: methodEn, pt: methodPt };

/** Every service, in the order the services index shows them. */
export function getServices(lang: Locale): ServiceItem[] {
  return byLang[lang];
}

/** The four core services: the home grid and the header dropdown. */
const homeServiceOrder = ["automations-and-integrations", "software-development", "mvp-development", "app-development"];

export function getHomeServices(lang: Locale): ServiceItem[] {
  return byLang[lang]
    .filter((service) => service.onHome)
    .sort((a, b) => homeServiceOrder.indexOf(a.slug) - homeServiceOrder.indexOf(b.slug));
}

export function getService(lang: Locale, slug: string): ServiceItem | undefined {
  return byLang[lang].find((service) => service.slug === slug);
}

export function getMethod(lang: Locale): MethodStep[] {
  return methodByLang[lang];
}
