export type ServiceItem = {
  slug: string;
  title: string;
  timeline: string;
  price: string;
  /** Cross-sell note shown above the description. */
  highlight?: string;
  description: string;
  includes?: string[];
};

export type ServiceGroup = {
  id: string;
  label: string;
  items: ServiceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "development",
    label: "Development",
    items: [
      {
        slug: "mvp-development",
        title: "MVP Development",
        timeline: "From 4 weeks",
        price: "From $5,000",
        description:
          "If you are a startup or a non-technical founder and you need to test the market fit of your billion-dollar idea at low cost, we can help. We handle everything from scratch to deploy. You explain your idea end to end, we design your prototype and deliver it working on schedule, so you can launch and start testing as early as possible.",
      },
      {
        slug: "software-development",
        title: "Software Development",
        timeline: "From 12 weeks",
        price: "From $23,000",
        description:
          "If your company is growing and you are starting to feel the need to bring in technology and stop running your operation on spreadsheets, talk to us and we will solve it.",
      },
      {
        slug: "app-development",
        title: "App Development",
        timeline: "From 8 weeks",
        price: "From $9,500",
        description:
          "Your app has never been closer to launching. We will build it properly and publish it to both the Apple and Android stores.",
      },
      {
        slug: "automations-and-integrations",
        title: "Automations and Integrations",
        timeline: "From 2 weeks",
        price: "From $3,200",
        description:
          "Have you noticed how much bureaucratic work happens inside your company? A lot of it can be automated. Automation at company level can hand you back up to 60% of that time and save a great deal of cash.",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      {
        slug: "high-conversion-landing-page",
        title: "High-Conversion Landing Page",
        timeline: "21 days",
        price: "$1,490",
        highlight:
          "Clients who buy this service also get exclusive access to our Google Ads service, priced on request.",
        description:
          "If you have ever had a landing page that did not sell, you know how frustrating it is to spend on ads and get nothing back. Our landing pages are built for conversion. We study your customer in depth to build a page with strong visual impact and copy that moves them to take the action you want.",
        includes: [
          "Conversion-focused copywriting",
          "Phone, tablet and desktop versions",
          "Fully exclusive custom design",
          "1 month of warranty",
          "3 rounds of revisions before final delivery",
        ],
      },
      {
        slug: "optimized-multi-page-website",
        title: "Optimized Multi-Page Website",
        timeline: "30 days",
        price: "$3,200",
        highlight:
          "Clients who buy this service also get exclusive access to our Google Ads service, priced on request.",
        description:
          "You need a website that keeps up with the latest shifts in the market. Your customers are changing how they buy. People now search through AI as much as they search through Google. Your site has to be optimized for the new digital era.",
        includes: [
          "Copy optimized to be found by Google and by AI",
          "Conversion-focused internal content",
          "Fully exclusive custom design",
          "1 month of warranty",
          "3 rounds of revisions before final delivery",
        ],
      },
    ],
  },
];

/** Flat list, for pages that do not care about the grouping. */
export const services = serviceGroups.flatMap((group) => group.items);

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
