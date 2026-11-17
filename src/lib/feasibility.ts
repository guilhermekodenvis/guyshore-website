import type { Locale } from "@/lib/i18n";

/**
 * Paid discovery consultation. Implementation is quoted separately.
 *
 * Price and links are shared; the copy is per language. The price, its note
 * and the scope must match the home schema, the FAQ and llms.txt.
 */
const base = {
  id: "automation-consultation",
  price: 50,
  currency: "EUR",
  ctaHref: "https://calendly.com/guysartori96/30min",
} as const;

type ConsultationCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  priceLabel: string;
  priceNote: string;
  includesTitle: string;
  includes: string[];
  ctaLabel: string;
};

const copy: Record<Locale, ConsultationCopy> = {
  en: {
    eyebrow: "Small Business Automation Consultation",
    title: "Find the work your business can stop doing manually.",
    lead: "Walk us through your daily processes and the tools your team uses. We identify repetitive tasks, bottlenecks and opportunities to connect your systems, then help you choose a practical place to start.",
    priceLabel: "€50",
    priceNote:
      "One-time consultation. Automation implementation and software subscriptions are quoted separately.",
    includesTitle: "What you get",
    includes: [
      "A review of your current processes, tools and repetitive tasks",
      "A prioritized list of automation opportunities based on effort and potential impact",
      "Recommendations on what to connect, automate or keep under human review",
      "A written action plan with a recommended first workflow and next steps",
    ],
    ctaLabel: "Request my consultation",
  },
  pt: {
    eyebrow: "Consultoria de Automação para Pequenas Empresas",
    title: "Descubra o trabalho que a sua empresa pode deixar de fazer à mão.",
    lead: "Mostre-nos os processos do dia a dia e as ferramentas que a sua equipa utiliza. Identificamos tarefas repetitivas, estrangulamentos e oportunidades para ligar os seus sistemas, e ajudamos a escolher um ponto de partida prático.",
    priceLabel: "50 €",
    priceNote:
      "Consultoria única. A implementação das automações e as subscrições de software são orçamentadas à parte.",
    includesTitle: "O que recebe",
    includes: [
      "Uma análise dos seus processos, ferramentas e tarefas repetitivas",
      "Uma lista de oportunidades de automação ordenada por esforço e impacto potencial",
      "Recomendações sobre o que ligar, automatizar ou manter sob revisão humana",
      "Um plano de ação escrito, com o primeiro fluxo recomendado e os próximos passos",
    ],
    ctaLabel: "Pedir a minha consultoria",
  },
};

export type Consultation = typeof base & ConsultationCopy;

export function getFeasibility(lang: Locale): Consultation {
  return { ...base, ...copy[lang] };
}
