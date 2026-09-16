/**
 * The MVP Feasibility Check. It publishes no price: like every service, it is
 * quoted after a conversation, so the button sends the visitor to the contact
 * form at the bottom of the home page.
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
  includesTitle: "What the delivery includes",
  includes: [
    "A testable preview of your MVP",
    "A complete project blueprint, with every deliverable and its deadline",
    "The development cost and the return on investment you can expect",
    "A written economic analysis of the project, covering what it costs to run: servers, AI, automations, email and the rest",
  ],
  cta: {
    label: "Get my testable preview",
    /**
     * The contact form on the home page, the only page this panel is on.
     * Payment used to go through a Stripe test link
     * (buy.stripe.com/test_9B6dRa9FQ1We61FdD08Zq00), retired on 2026-09-16.
     */
    href: "#contact",
  },
} as const;
