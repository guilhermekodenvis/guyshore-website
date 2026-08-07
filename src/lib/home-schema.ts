import { faq } from "@/lib/faq";
import { services } from "@/lib/services";

const ORIGIN = "https://guyshore.com";

/**
 * The search-facing name for each card, keyed by slug. The cards use short
 * titles ("App Development"); search wants the unambiguous phrasing.
 *
 * No `offers` node anywhere: the page stopped publishing prices, and a price
 * in the markup that a visitor cannot see on the page is exactly what Google's
 * structured-data guidelines call out.
 */
const SEARCH_NAMES: Record<string, string> = {
  "mvp-development": "MVP Development",
  "app-development": "Mobile App Development",
  "software-development": "Custom Software Development",
  "automations-and-integrations": "Automations and Integrations",
};

const serviceGraph = services.map((service) => {
  const node: Record<string, unknown> = {
    "@type": "Service",
    name: SEARCH_NAMES[service.slug] ?? service.title,
    description: service.description,
    provider: { "@id": `${ORIGIN}/#organization` },
    url: `${ORIGIN}/#${service.slug}`,
  };

  if (service.slug === "mvp-development") {
    node.serviceType = "MVP development";
    node.areaServed = { "@type": "Country", name: "United States" };
  }

  return node;
});

/**
 * schema.org graph for the home page.
 *
 * The FAQPage entries are derived from `faq` and the Service nodes from
 * `services`, so the structured data cannot drift from what is rendered.
 */
export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${ORIGIN}/#organization`,
      name: "GuyShore",
      url: ORIGIN,
      email: "business@guyshore.com",
      logo: `${ORIGIN}/og-image.png`,
      description:
        "GuyShore is an MVP and custom software development company for non-technical founders and startups. We build web apps, SaaS platforms, and mobile products from scratch, and take stalled AI-generated prototypes to production.",
      founder: {
        "@type": "Person",
        name: "Guy Sartori",
        jobTitle: "Founder",
        description:
          "Developer since 2012, previously building software for large organizations in autotech, banking and agribusiness.",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Elias Garcia, 123-A",
        postalCode: "1050-098",
        addressLocality: "Lisboa",
        addressCountry: "PT",
      },
      areaServed: { "@type": "Country", name: "United States" },
      knowsAbout: [
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
      inLanguage: "en-US",
    },
    ...serviceGraph,
    {
      "@type": "FAQPage",
      "@id": `${ORIGIN}/#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};
