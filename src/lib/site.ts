/**
 * Single source of truth for company-level facts and navigation.
 * Edit here rather than in individual pages.
 */

export const site = {
  name: "GuyShore",
  /** Browser tab title for the home page. */
  title: "MVP & Software Development for Non-Technical Founders",
  /** Shown in the footer, under the wordmark. */
  tagline: "Your MVP, finally finished.",
  description:
    "GuyShore builds MVPs, custom software, apps and automations for non-technical founders and startups, from scratch to production.",
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

export const stats = [
  { value: "10+", label: "years of experience" },
  { value: "100+", label: "satisfied clients" },
  { value: "400+", label: "projects delivered" },
  { value: "5.0", label: "Google rating" },
] as const;
