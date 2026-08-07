export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
};

/**
 * Rendered in this order, two per row from md up.
 *
 * Deliberately no timeline or price: scope and cost are quoted per project,
 * not published. Keep it that way, or `home-schema.ts` will start advertising
 * an Offer the page does not show.
 */
export const services: ServiceItem[] = [
  {
    slug: "mvp-development",
    title: "MVP Development",
    description:
      "If you are a startup or a non-technical founder and you need to test the market fit of your billion-dollar idea, we can help. We handle everything from scratch to deploy. You explain your idea end to end, we design your product and deliver it working on schedule, so you can launch and start testing as early as possible.",
  },
  {
    slug: "app-development",
    title: "App Development",
    description:
      "Your app has never been closer to launching. We will build it properly and publish it to both the Apple and Android stores.",
  },
  {
    slug: "software-development",
    title: "Software Development",
    description:
      "If your company is growing and you are starting to feel the need to bring in technology and stop running your operation on spreadsheets, talk to us and we will solve it.",
  },
  {
    slug: "automations-and-integrations",
    title: "Automations and Integrations",
    description:
      "Have you noticed how much bureaucratic work happens inside your company? A lot of it can be automated. Automation at company level can hand you back up to 60% of that time and save a great deal of cash.",
  },
];

/** The method really is a sequence, which is why these are numbered. */
export const method = [
  {
    step: "01",
    title: "Identifying the problem",
    body: "You tell us what problems you face today and what your goals are for the future. We identify the opportunities in your idea that can pay off in the short, medium and long term.",
  },
  {
    step: "02",
    title: "Proposing the solution",
    body: "We present everything that will be built, the investment, the delivery timeline, the running costs (servers, databases, integrations and so on) and the expected return on that investment.",
  },
  {
    step: "03",
    title: "Development",
    body: "We work with technologies such as Next.js, Supabase, n8n, email delivery, API integrations and AI agents to build the best and most tailored solution for your need.",
  },
  {
    step: "04",
    title: "Delivery",
    body: "We run an ongoing process with you and your team to fold the system into daily use. Our goal is to make the whole adaptation as easy as possible.",
  },
  {
    step: "05",
    title: "Support",
    body: "Every system, app or automation needs its own dedicated support. That is why we tailor ours, to keep the partnership running long term.",
  },
];
