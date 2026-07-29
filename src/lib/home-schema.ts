import { faq } from "@/lib/faq";
import { services } from "@/lib/services";

const ORIGIN = "https://guyshore.com";

/**
 * Numeric price for a card, taken from the visible copy, so the schema and the
 * page cannot disagree. "From $23,000" -> "23000".
 */
function priceFor(slug: string): string {
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    throw new Error(`home-schema: no service card with slug "${slug}"`);
  }
  return service.price.replace(/\D/g, "");
}

/** Card slug paired with the name the schema advertises it under. */
const SERVICE_NODES = [
  { slug: "prototype-rescue", name: "Prototype Rescue" },
  { slug: "mvp-development", name: "MVP Development" },
  { slug: "app-development", name: "Mobile App Development" },
  { slug: "software-development", name: "Custom Software Development" },
  {
    slug: "automations-and-integrations",
    name: "Automations and Integrations",
  },
];

const serviceGraph = SERVICE_NODES.map(({ slug, name }) => {
  const price = priceFor(slug);

  const node: Record<string, unknown> = {
    "@type": "Service",
    name,
    provider: { "@id": `${ORIGIN}/#organization` },
    url: `${ORIGIN}/#${slug}`,
    offers: { "@type": "Offer", priceCurrency: "USD", price },
  };

  // MVP Development keeps the richer offer shape it already had.
  if (slug === "mvp-development") {
    node.serviceType = "MVP development";
    node.areaServed = { "@type": "Country", name: "United States" };
    node.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: price,
        priceCurrency: "USD",
      },
    };
  }

  return node;
});

/**
 * schema.org graph for the home page.
 *
 * The FAQPage entries are derived from `faq` and the Service prices from
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
