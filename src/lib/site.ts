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
  // The default title, description and the footer tagline are copy, so they
  // live per language in `dictionary.ts` (`site` section).
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

/**
 * Language-neutral paths; labels come from the dictionary (`nav` section)
 * and the path goes through `localePath` for the current language.
 */
export const nav = [
  { href: "/portfolio", key: "portfolio" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
] as const;

/** Rendered only in the footer's bottom bar, next to the copyright line. */
export const legalNav = [
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
] as const;
