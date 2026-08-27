/**
 * The MVP Feasibility Check: the one thing this site sells at a published
 * price, and the only place a price appears anywhere on the site. Services
 * are still quoted per project and publish nothing.
 *
 * The full-viewport black panel under the partner row renders all of this,
 * and the hero's read-more control scrolls to `id`.
 */
export const feasibility = {
  /** Anchor target. The hero's read-more control points here. */
  id: "mvp-feasibility-check",
  eyebrow: "MVP Feasibility Check",
  title:
    "Find out fast whether your project is technically and economically viable.",
  lead: "Find out whether your dream can become a real product, or not. You get a preview you can actually click, and the running costs in writing, before you commit months and a budget to finding out the hard way.",
  price: "$275",
  turnaround: "delivered in 7 days",
  includesTitle: "What the delivery includes",
  includes: [
    "A 45-minute video call where you walk us through your project",
    "A testable preview of your MVP",
    "A written economic analysis of the project, covering what it costs to run: servers, AI, automations, email and the rest",
  ],
  cta: {
    label: "Get my testable preview",
    /**
     * TEST MODE. A `buy.stripe.com/test_...` link takes Stripe's test cards
     * only and charges nobody, so this button collects no money as it stands.
     * Replace it with the live payment link before the section is published.
     * This is the only place the URL appears.
     */
    href: "https://buy.stripe.com/test_9B6dRa9FQ1We61FdD08Zq00",
  },
} as const;
