import type { Locale } from "@/lib/i18n";

const base = {
  name: "Guy Sartori",
  photo: "/guy-sartori-avatar.png",
  linkedin: "https://www.linkedin.com/in/guy-sartori",
} as const;

type FounderCopy = {
  role: string;
  bio: string;
  /**
   * Rendered under the LinkedIn button. A `value` is shown large; an entry
   * without one is a statement that does not reduce to a number. Keep these
   * consistent with `bio`: "since 2012" is what makes "10+ years" true.
   */
  highlights: { value: string | null; label: string }[];
};

const copy: Record<Locale, FounderCopy> = {
  en: {
    role: "Founder",
    bio: "Developer since 2012. He has founded other companies and worked as a developer for large organizations across autotech, banking, agribusiness and other sectors.",
    highlights: [
      { value: "10+", label: "years as a developer" },
      { value: "6+", label: "years coding without AI" },
      { value: "50+", label: "projects" },
      {
        value: null,
        label:
          "A bank management system, from scratch to production-ready software",
      },
    ],
  },
  pt: {
    role: "Fundador",
    bio: "Programador desde 2012. Fundou outras empresas e trabalhou como programador para grandes organizações nos setores automóvel, bancário, agroindustrial, entre outros.",
    highlights: [
      { value: "10+", label: "anos como programador" },
      { value: "6+", label: "anos a programar sem IA" },
      { value: "50+", label: "projetos" },
      {
        value: null,
        label:
          "Um sistema de gestão bancária, criado de raiz até estar pronto para produção",
      },
    ],
  },
};

export type Founder = typeof base & FounderCopy;

export function getFounder(lang: Locale): Founder {
  return { ...base, ...copy[lang] };
}
