/**
 * Single source of truth for company-level facts and navigation.
 * Edit here rather than in individual pages.
 */

export const site = {
  /** Legal/brand name. Used in prose, the schema and the copyright line. */
  name: "GuyShore",
  /** The logotype, always lowercase. Header and footer only. */
  wordmark: "guyshore.com",
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
  email: "business@guyshore.com",
  address: {
    street: "Av. Elias Garcia, 123-A",
    postalCode: "1050-098",
    city: "Lisboa",
  },
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;
