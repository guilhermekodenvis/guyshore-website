import { faq } from "@/lib/faq";
import { getFeasibility } from "@/lib/feasibility";
import { homeCopy } from "@/lib/home";
import { htmlLang, localePath, type Locale } from "@/lib/i18n";
import { getHomeServices } from "@/lib/services";
import { GOOGLE_PROFILE_URL } from "@/lib/seo";
import { site } from "@/lib/site";
import { getFounder } from "@/lib/team";

const ORIGIN = "https://guyshore.com";

/**
 * The search-facing name for each card, keyed by slug. The cards use short
 * titles ("App Development"); search wants the unambiguous phrasing.
 */
const SEARCH_NAMES: Record<Locale, Record<string, string>> = {
  en: {
    "mvp-development": "MVP Development",
    "app-development": "Mobile App Development",
    "software-development": "Custom Software Development",
    "automations-and-integrations": "Automations and Integrations",
  },
  pt: {
    "mvp-development": "Desenvolvimento de MVP",
    "app-development": "Desenvolvimento de Aplicações Móveis",
    "software-development": "Desenvolvimento de Software à Medida",
    "automations-and-integrations": "Automações e Integrações",
  },
};

const FOUNDER_DESCRIPTION: Record<Locale, string> = {
  en: "Developer since 2012, previously building software for large organizations in autotech, banking and agribusiness.",
  pt: "Programador desde 2012, com experiência a desenvolver software para grandes organizações nos setores automóvel, bancário e agroindustrial.",
};

/**
 * schema.org graph for the home page in one language.
 *
 * The Organization keeps one `@id` across both languages, so the English and
 * Portuguese home pages describe the same company. The FAQPage entries come
 * from `faq` and the Service nodes from the services module, so the
 * structured data cannot drift from what is rendered. The consultation Offer
 * matches the visible price.
 */
export function getHomeSchema(lang: Locale) {
  const home = homeCopy[lang];
  const feasibility = getFeasibility(lang);
  const founder = getFounder(lang);
  const pageUrl = `${ORIGIN}${lang === "en" ? "" : localePath(lang, "/")}`;
  const url = (path: string) => `${ORIGIN}${localePath(lang, path)}`;

  const serviceGraph = getHomeServices(lang).map((service) => {
    const node: Record<string, unknown> = {
      "@type": "Service",
      name: SEARCH_NAMES[lang][service.slug] ?? service.title,
      description: service.description,
      provider: { "@id": `${ORIGIN}/#organization` },
      url: url(`/services/${service.slug}`),
    };

    if (service.slug === "mvp-development") {
      node.serviceType = "MVP development";
      node.areaServed = { "@type": "Country", name: "United States" };
    }

    return node;
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // ProfessionalService is the LocalBusiness type for a services firm
        // with an office; with the Google profile in `sameAs` it lets search
        // engines match the site to the listing.
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${ORIGIN}/#organization`,
        name: site.listingName,
        alternateName: site.name,
        url: ORIGIN,
        email: site.email,
        telephone: site.phone.e164,
        logo: `${ORIGIN}/logo-mark.png`,
        image: `${ORIGIN}/og-image.png`,
        sameAs: [GOOGLE_PROFILE_URL],
        description: home.about,
        founder: {
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
          description: FOUNDER_DESCRIPTION[lang],
          sameAs: [founder.linkedin],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          postalCode: site.address.postalCode,
          addressLocality: site.address.city,
          addressCountry: site.address.countryCode,
        },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Portugal" },
        ],
        knowsAbout: [
          "Small business automation",
          "Workflow automation",
          "Business systems integration",
          "MVP development",
          "custom software development",
          "mobile app development",
          "SaaS platforms",
          "prototype to production",
          "Next.js",
          "Supabase",
          "React Native",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        url: ORIGIN,
        name: "GuyShore",
        publisher: { "@id": `${ORIGIN}/#organization` },
        inLanguage: ["en-US", htmlLang.pt],
      },
      ...serviceGraph,
      {
        "@type": "Service",
        "@id": `${pageUrl}#automation-consultation`,
        name: feasibility.eyebrow,
        description: feasibility.lead,
        provider: { "@id": `${ORIGIN}/#organization` },
        url: `${pageUrl}#${feasibility.id}`,
        offers: {
          "@type": "Offer",
          price: feasibility.price,
          priceCurrency: feasibility.currency,
          url: `${pageUrl}#${feasibility.id}`,
          description: feasibility.priceNote,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: lang === "en" ? "en-US" : htmlLang[lang],
        mainEntity: faq[lang].map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
