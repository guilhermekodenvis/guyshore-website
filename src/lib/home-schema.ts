import { faq } from "@/lib/faq";

/**
 * schema.org graph for the home page.
 *
 * The FAQPage entries are derived from `faq` rather than duplicated, so the
 * structured data and the visible accordion cannot drift apart.
 */
export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://guyshore.com/#organization",
      name: "GuyShore",
      url: "https://guyshore.com",
      email: "business@guyshore.com",
      logo: "https://guyshore.com/og-image.png",
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
      "@id": "https://guyshore.com/#website",
      url: "https://guyshore.com",
      name: "GuyShore",
      publisher: { "@id": "https://guyshore.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "Service",
      name: "MVP Development",
      serviceType: "MVP development",
      provider: { "@id": "https://guyshore.com/#organization" },
      areaServed: { "@type": "Country", name: "United States" },
      url: "https://guyshore.com/#mvp-development",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "5000",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "5000",
          priceCurrency: "USD",
        },
      },
    },
    {
      "@type": "Service",
      name: "Custom Software Development",
      provider: { "@id": "https://guyshore.com/#organization" },
      url: "https://guyshore.com/#software-development",
      offers: { "@type": "Offer", priceCurrency: "USD", price: "23000" },
    },
    {
      "@type": "Service",
      name: "Mobile App Development",
      provider: { "@id": "https://guyshore.com/#organization" },
      url: "https://guyshore.com/#app-development",
      offers: { "@type": "Offer", priceCurrency: "USD", price: "9500" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://guyshore.com/#faq",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};
