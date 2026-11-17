import type { Locale } from "@/lib/i18n";

/** Shared homepage copy for visible content and search metadata. */
type HomeCopy = {
  title: string;
  description: string;
  headline: string;
  subtitle: string;
  about: string;
  servicesTitle: string;
  servicesLead: string;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    title: "Automations for Small Businesses | GuyShore",
    description:
      "Automate follow-ups, data entry and reporting with GuyShore. Start with a €50 consultation to find automation opportunities for your small business.",
    headline: "Automations for Small Businesses",
    subtitle:
      "Spend less time copying data, chasing follow-ups and building reports. We connect your tools and automate repetitive work so your team can focus on customers.",
    about:
      "GuyShore helps small businesses automate repetitive work and connect the tools they already use. Based in Lisbon and working remotely, we build workflow automations, custom software, MVPs and apps around the way your business operates.",
    servicesTitle: "Less manual work. More time for your business.",
    servicesLead:
      "Small business automation connects your tools so routine work happens without copying information between systems. From lead follow-ups and booking reminders to reports and CRM updates, we help you choose what to automate and build what your business needs.",
  },
  pt: {
    title: "Automação para Pequenas Empresas | GuyShore",
    description:
      "Automatize o seguimento de contactos, a introdução de dados e os relatórios com a GuyShore. Comece com uma consultoria de 50 € para saber o que automatizar.",
    headline: "Automação para Pequenas Empresas",
    subtitle:
      "Passe menos tempo a copiar dados, a fazer seguimento de contactos e a preparar relatórios. Ligamos as suas ferramentas e automatizamos o trabalho repetitivo para que a sua equipa se concentre nos clientes.",
    about:
      "A GuyShore ajuda pequenas empresas a automatizar trabalho repetitivo e a ligar as ferramentas que já utilizam. Com sede em Lisboa e a trabalhar remotamente, desenvolvemos automações de processos, software à medida, MVP e aplicações adaptados à forma como a sua empresa funciona.",
    servicesTitle: "Menos trabalho manual. Mais tempo para o seu negócio.",
    servicesLead:
      "A automação para pequenas empresas liga as suas ferramentas para que o trabalho de rotina aconteça sem copiar informação entre sistemas. Do seguimento de contactos e lembretes de marcações aos relatórios e atualizações do CRM, ajudamos a escolher o que automatizar e desenvolvemos o que a sua empresa precisa.",
  },
};
