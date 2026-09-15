/**
 * Single source of truth for company-level facts and navigation.
 * Edit here rather than in individual pages.
 */

export const site = {
  /** Legal/brand name. Used in prose, the schema and the copyright line. */
  name: "GuyShore",
  /** The logotype, always lowercase. Header and footer only. */
  wordmark: "guyshore.com",
  /**
   * The business name exactly as it is registered in external listings.
   * Search engines match a business by name, address and phone appearing
   * identically across every source, so this string, `address` and `phone`
   * are rendered verbatim by `ContactDetails` and never re-typed in a page.
   * Changing one of them means changing the listings too.
   */
  listingName: "guyshore.com",
  /** Browser tab title for the home page. */
  title: "MVP & Software Development Company for Startups",
  /** Shown in the footer, under the wordmark. */
  tagline: "Your MVP, finally finished.",
  /**
   * Meta description for every page. The inner pages deliberately do not set
   * their own, so they inherit this one from the root layout.
   */
  description:
    "We build for non-technical founders and startups: web apps, mobile products and automations. Fixed scope, clear timelines, and full source code ownership.",
  url: "https://guyshore.com",
  /**
   * The Google Business Profile, as a Places API Place ID (starts with ChIJ).
   * Not a secret: Google permits storing it indefinitely, and it is what the
   * reviews section looks the profile up by. Empty means the section stays
   * hidden.
   */
  googlePlaceId: "ChIJA3EyIRszGQ0RQKo6mrIqhAY",
  email: "business@guyshore.com",
  phone: {
    /** Spaced for reading. This is the string listings must match. */
    display: "+351 934 417 806",
    /** Same number with the spaces stripped, for `tel:` and schema.org. */
    e164: "+351934417806",
  },
  address: {
    street: "Av. Elias Garcia, 123-A",
    postalCode: "1050-098",
    city: "Lisboa",
    country: "Portugal",
    /** ISO 3166-1 alpha-2, for `addressCountry` in the schema. */
    countryCode: "PT",
  },
} as const;

export const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

/** Rendered only in the footer's bottom bar, next to the copyright line. */
export const legalNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
] as const;
