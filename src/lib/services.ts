/**
 * Every service the company sells, and everything its detail page renders.
 *
 * Deliberately no timeline or price: scope and cost are quoted per project,
 * not published. Keep it that way, or the schema modules will start
 * advertising an Offer the pages do not show.
 */

export type ServiceItem = {
  slug: string;
  /** Card and navigation label. */
  title: string;
  /** Card copy, on the home grid and the services index. */
  description: string;
  /** The four core services: the home grid and the header dropdown. */
  onHome: boolean;

  /* ---- detail page ---- */
  eyebrow: string;
  h1: string;
  lead: string;
  /** AEO block: one question, answered plainly, plus what the work includes. */
  answer: { question: string; body: string; includes: string[] };
  /** "Who this is for", rendered as four cards in a 2x2 grid. */
  audience: { title: string; body: string }[];
  deliverables: string[];
  process: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
};

export const services: ServiceItem[] = [
  {
    slug: "mvp-development",
    title: "MVP Development",
    onHome: true,
    description:
      "If you are a startup or a non-technical founder and you need to test the market fit of your billion-dollar idea, we can help. We handle everything from scratch to deploy. You explain your idea end to end, we design your product and deliver it working on schedule, so you can launch and start testing as early as possible.",
    eyebrow: "MVP Development",
    h1: "MVP development that reaches real users.",
    lead: "We take your idea from a conversation to a product in production, built so the first version can be tested by real customers instead of demoed to a room.",
    answer: {
      question: "What is MVP development?",
      body: "MVP development is building the smallest version of your product that a real customer can actually use and pay for. It is not a prototype and not a demo. We scope the one thing your product has to prove, build that properly, and ship it to production so you can put it in front of users and learn whether the idea holds.",
      includes: [
        "A scope agreed in writing before any code is written",
        "Product and interface design, not just implementation",
        "A working application deployed to production",
        "Accounts, payments and the integrations your flow depends on",
        "Full source code ownership from the first commit",
      ],
    },
    audience: [
      {
        title: "Non-technical founders",
        body: "You know the problem and the customer better than anyone, and you need a technical team you do not have to manage line by line.",
      },
      {
        title: "Pre-seed startups",
        body: "You need something real in front of users before the next raise, and a slide deck will not do it any more.",
      },
      {
        title: "Companies testing a new line",
        body: "The core business works and you want to try an adjacent product without pulling your engineers off it.",
      },
      {
        title: "Founders with a stalled prototype",
        body: "You built something with an AI tool, it demos well and breaks with real users. We take it the rest of the way.",
      },
    ],
    deliverables: [
      "A production application, live on your own domain",
      "Source code in your own repository, yours from day one",
      "Authentication, billing and the third-party integrations you need",
      "A deploy pipeline, so shipping again does not need us",
      "Analytics wired up, so launch tells you something",
      "A handover session and written documentation",
    ],
    process: [
      {
        title: "Identifying the problem",
        body: "You tell us what you are trying to prove and who has to believe it. We separate what the first version has to do from what can wait.",
      },
      {
        title: "Proposing the solution",
        body: "We present everything that will be built, the investment, the delivery date and the running costs, before anything starts.",
      },
      {
        title: "Design and build",
        body: "We design the product and build it in weekly increments you can open and click, so nothing is a surprise at the end.",
      },
      {
        title: "Launch",
        body: "We deploy to production, connect your domain, and make sure the thing works under real traffic rather than on a laptop.",
      },
      {
        title: "Support",
        body: "We stay available after launch, because the first weeks with real users are when you learn the most and break the most.",
      },
    ],
    faq: [
      {
        question: "How long does an MVP take?",
        answer:
          "Most start at six weeks. The exact date depends on scope, and we commit to it in writing before development begins rather than estimating as we go.",
      },
      {
        question: "Do I own the source code?",
        answer:
          "Yes, entirely, from the first commit. The repository is yours, there is no license to renew, and you can take it to another team whenever you want.",
      },
      {
        question: "What technologies do you build with?",
        answer:
          "Next.js, Supabase, React Native and n8n, deployed on Vercel or Netlify. These are boring, well documented choices, which is exactly what you want when another team may inherit the code.",
      },
      {
        question: "Can you work from a prototype I already have?",
        answer:
          "Yes. We audit what exists, tell you honestly what is reusable and what is not, and take it to production rather than starting again for the sake of it.",
      },
      {
        question: "What if my scope changes mid-project?",
        answer:
          "It usually does. We handle changes as an explicit conversation about the date and the investment, so scope never moves quietly and you are never surprised by an invoice.",
      },
      {
        question: "What happens after launch?",
        answer:
          "You get a handover and documentation, and can continue with us on support or take it in-house. We do not build anything that requires us to keep it running.",
      },
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    onHome: true,
    description:
      "Your app has never been closer to launching. We will build it properly and publish it to both the Apple and Android stores.",
    eyebrow: "App Development",
    h1: "Mobile apps, built and published to both stores.",
    lead: "We build iOS and Android apps and take them through review to the App Store and Google Play, so the project ends with something people can download.",
    answer: {
      question: "What does mobile app development include?",
      body: "It is the whole path from idea to a listing customers can install. We build one codebase that runs on iOS and Android, connect it to the backend and services it needs, and handle the store submissions, which is where most first-time app projects stall.",
      includes: [
        "One codebase serving iOS and Android",
        "Interface design that follows each platform's conventions",
        "Backend, database and push notifications",
        "App Store and Google Play submission, including review",
        "Store listing assets, screenshots and descriptions",
      ],
    },
    audience: [
      {
        title: "Founders with an app idea",
        body: "You have the concept and the market, and you need a team that has shipped through store review before.",
      },
      {
        title: "Businesses going mobile",
        body: "Your customers already use you on the web, and the phone is where the relationship actually lives.",
      },
      {
        title: "Teams with a stalled build",
        body: "Someone started the app, it never reached the stores, and you need it finished rather than restarted.",
      },
      {
        title: "Products needing a companion app",
        body: "The platform works, and the mobile piece is what makes it usable in the field or on the move.",
      },
    ],
    deliverables: [
      "A published listing on the App Store and Google Play",
      "One codebase for both platforms, in your repository",
      "Backend and database, deployed and running",
      "Push notifications wired up and tested",
      "Store assets, screenshots and listing copy",
      "The release process documented, so updates do not need us",
    ],
    process: [
      {
        title: "Scoping the app",
        body: "We map the screens and the flows, and agree what ships in version one against what waits for the first update.",
      },
      {
        title: "Design",
        body: "We design every screen before building, so the review happens on images rather than on code that has to be rewritten.",
      },
      {
        title: "Build",
        body: "We build in increments and give you installable builds throughout, so you are testing on your own phone long before launch.",
      },
      {
        title: "Store submission",
        body: "We prepare the listings, submit to both stores and handle review feedback until the app is approved and live.",
      },
      {
        title: "Support",
        body: "We stay on after launch for the crashes and edge cases that only appear once real devices are involved.",
      },
    ],
    faq: [
      {
        question: "Do you build for both iOS and Android?",
        answer:
          "Yes, from a single codebase built with React Native. You get both platforms without paying to build the same product twice.",
      },
      {
        question: "Do you handle the App Store submission?",
        answer:
          "Yes, including review feedback. A project that ends with an unsubmitted binary is not a finished project.",
      },
      {
        question: "How long does app development take?",
        answer:
          "Most start at eight weeks, plus store review, which is usually days rather than weeks but is not fully in anyone's control.",
      },
      {
        question: "Do I need my own Apple and Google accounts?",
        answer:
          "Yes, and they should be in your company's name, not ours. We walk you through creating them and never hold your listings hostage.",
      },
      {
        question: "Can you update an app I already have?",
        answer:
          "Often yes. We audit the existing codebase first and tell you honestly whether extending it is cheaper than rebuilding it.",
      },
      {
        question: "What about ongoing store updates?",
        answer:
          "We document the release process so your team can ship updates, and stay available for the releases you would rather not run alone.",
      },
    ],
  },
  {
    slug: "software-development",
    title: "Software Development",
    onHome: true,
    description:
      "If your company is growing and you are starting to feel the need to bring in technology and stop running your operation on spreadsheets, talk to us and we will solve it.",
    eyebrow: "Software Development",
    h1: "Custom software that fits how you actually work.",
    lead: "When the spreadsheet becomes the bottleneck, we build the system that replaces it, shaped around your process instead of forcing your process into someone else's product.",
    answer: {
      question: "What is custom software development?",
      body: "It is building a system specifically for your operation rather than adapting your operation to off-the-shelf software. We learn how the work actually happens, including the parts nobody documented, and build something your team will use because it matches reality.",
      includes: [
        "A study of your current process before anything is designed",
        "A system built around your workflow, not a generic template",
        "Migration of the data currently living in spreadsheets",
        "Roles and permissions matching how your team is organized",
        "Training and a rollout plan for the people who will use it",
      ],
    },
    audience: [
      {
        title: "Growing companies",
        body: "The process that worked at ten people is quietly breaking at forty, and everyone knows it.",
      },
      {
        title: "Operations run on spreadsheets",
        body: "The business depends on a file that one person understands and everybody is afraid to touch.",
      },
      {
        title: "Teams with compliance needs",
        body: "You need an audit trail and controls that a shared folder is never going to give you.",
      },
      {
        title: "Businesses with no in-house tech",
        body: "You need the system and the people who can explain it, not a vendor who talks past you.",
      },
    ],
    deliverables: [
      "A system deployed and running, on your infrastructure",
      "Your existing data migrated and verified",
      "Roles and permissions matching your organization",
      "Reports and dashboards for the numbers you actually track",
      "Training sessions for the team who will use it daily",
      "Documentation and a support arrangement",
    ],
    process: [
      {
        title: "Understanding the operation",
        body: "We sit with the people doing the work and map what really happens, which is rarely what the process document says.",
      },
      {
        title: "Proposing the solution",
        body: "We present the system, the investment, the delivery timeline and the running costs, along with the return we expect it to produce.",
      },
      {
        title: "Build",
        body: "We build in stages that each deliver something usable, so value arrives before the whole system is finished.",
      },
      {
        title: "Migration and rollout",
        body: "We move your data across, run the old and new side by side where it makes sense, and train the team.",
      },
      {
        title: "Support",
        body: "We tailor a support arrangement, because a system the business depends on cannot be left without one.",
      },
    ],
    faq: [
      {
        question: "How is this different from buying software off the shelf?",
        answer:
          "Off-the-shelf is faster and cheaper when your process is standard. We are worth it when the process is your advantage and bending it to fit a product would cost you that advantage.",
      },
      {
        question: "How long does custom software take?",
        answer:
          "Most start at twelve weeks. We deliver in usable stages, so the first part of the system is in your hands well before the last.",
      },
      {
        question: "Can you migrate our spreadsheets?",
        answer:
          "Yes, and we treat it as a real part of the work. Migration is where these projects usually go wrong, so we verify the data rather than assuming the import worked.",
      },
      {
        question: "Will it integrate with the tools we already use?",
        answer:
          "Yes, where they expose an API. Accounting, CRM, email and payments are the usual ones, and we confirm each is feasible before it goes in the scope.",
      },
      {
        question: "What if our team resists the change?",
        answer:
          "This is the most common reason these projects fail, so we plan for it. We involve the people doing the work from the beginning and roll out gradually rather than switching everything overnight.",
      },
      {
        question: "Do we own the system?",
        answer:
          "Yes, the source code and the data are yours. It runs on your infrastructure and you can move it or hand it to another team at any point.",
      },
    ],
  },
  {
    slug: "automations-and-integrations",
    title: "Automations and Integrations",
    onHome: true,
    description:
      "Have you noticed how much bureaucratic work happens inside your company? A lot of it can be automated. Automation at company level can hand you back up to 60% of that time and save a great deal of cash.",
    eyebrow: "Automations and Integrations",
    h1: "Automate the work nobody should be doing by hand.",
    lead: "Copying data between systems, chasing approvals, sending the same email again. We find that work, automate it, and give the hours back to the people who were spending them.",
    answer: {
      question: "What are business automations and integrations?",
      body: "An automation performs a repetitive task without a person doing it. An integration makes two systems that were never designed to talk to each other exchange data reliably. Together they remove the manual copying, re-typing and chasing that quietly consumes a large part of an operations team's week.",
      includes: [
        "An audit of where manual, repetitive time actually goes",
        "Automated workflows connecting the tools you already pay for",
        "Integrations between systems with no native connection",
        "AI agents for the steps that need judgment, not just rules",
        "Monitoring and alerts, so a silent failure does not stay silent",
      ],
    },
    audience: [
      {
        title: "Operations teams",
        body: "Your people are copying data between systems instead of doing the work you hired them for.",
      },
      {
        title: "Companies with disconnected tools",
        body: "You pay for good software that refuses to talk to the other good software you pay for.",
      },
      {
        title: "Small teams under load",
        body: "The volume grew, the headcount did not, and hiring is not the answer to a copy-and-paste problem.",
      },
      {
        title: "Anyone re-typing the same data",
        body: "If a number is entered twice in your company, one of those times can stop happening.",
      },
    ],
    deliverables: [
      "Automated workflows, running and monitored",
      "Integrations between the systems you already use",
      "A written map of what is automated and what triggers it",
      "Alerts when something fails, sent where you will see them",
      "Documentation so your team can adjust the simple parts",
      "Measured before and after, so the saving is a number",
    ],
    process: [
      {
        title: "Finding the waste",
        body: "We look at where repetitive time goes and rank tasks by hours saved against effort to automate.",
      },
      {
        title: "Proposing the solution",
        body: "We show what will be automated, what it costs to build and run, and how many hours a month it gives back.",
      },
      {
        title: "Build",
        body: "We build with n8n, API integrations and AI agents where judgment is needed, starting with the highest return.",
      },
      {
        title: "Rollout",
        body: "We run automations alongside the manual process first, so you can trust the output before the humans step away.",
      },
      {
        title: "Monitoring",
        body: "We add alerting and stay available, because the real risk with automation is a failure nobody notices.",
      },
    ],
    faq: [
      {
        question: "What can realistically be automated?",
        answer:
          "Anything rule-based and repetitive: data entry, reporting, notifications, approvals, invoicing, onboarding. If a person follows the same steps each time, it is a candidate.",
      },
      {
        question: "How quickly do automations pay for themselves?",
        answer:
          "Most start at two weeks to build. We measure the hours before and after, so the return is a number you can check rather than a claim we make.",
      },
      {
        question: "Do you work with the tools we already have?",
        answer:
          "Yes. The goal is to connect what you already pay for, not to sell you a replacement stack.",
      },
      {
        question: "What if an automation breaks?",
        answer:
          "We add monitoring and alerts from the start. A broken automation is manageable, a silently broken one is what causes damage, so we make sure failures are loud.",
      },
      {
        question: "Where do AI agents fit in?",
        answer:
          "Where the step needs judgment rather than a rule, like classifying a message or summarising a document. We use them for that and keep deterministic rules everywhere else.",
      },
      {
        question: "Can our team maintain them?",
        answer:
          "The simple parts, yes, and we document them for exactly that. The more involved integrations are usually worth keeping on a support arrangement.",
      },
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    onHome: false,
    description:
      "A fast, well-built website that search engines can read and customers can trust. We design and develop the whole thing, then hand it over with the source code and a way to edit it yourself.",
    eyebrow: "Website Development",
    h1: "Websites built to be found and to convert.",
    lead: "Most company websites are slow, invisible to search and impossible to edit. We build the opposite: fast, structured for search engines, and yours to maintain.",
    answer: {
      question: "What does website development include?",
      body: "It is design, development, content structure and launch. We build the site to load quickly and to be readable by search engines and AI assistants, which is now how a large share of customers find companies. You get the source code and a way to change the copy without calling us.",
      includes: [
        "Design and development of every page",
        "Technical SEO: metadata, structured data, sitemap and robots",
        "Performance work, so the site loads fast on a phone",
        "Contact forms wired to your inbox or your CRM",
        "Analytics and Search Console connected at launch",
      ],
    },
    audience: [
      {
        title: "Companies with an outdated site",
        body: "It was built years ago, nobody can edit it, and it no longer looks like the company you are today.",
      },
      {
        title: "New businesses",
        body: "You need a credible presence before customers will take the first conversation seriously.",
      },
      {
        title: "Businesses invisible in search",
        body: "You exist online but nobody finds you, because the site was never built to be found.",
      },
      {
        title: "Teams stuck with their agency",
        body: "Every small text change is a ticket and a fee, and you want the site back under your own control.",
      },
    ],
    deliverables: [
      "A live website on your own domain, with HTTPS",
      "Source code in your repository",
      "Technical SEO in place, not sold separately later",
      "Contact forms delivering where you actually read",
      "Analytics and Google Search Console connected",
      "A short session showing you how to edit the content",
    ],
    process: [
      {
        title: "Understanding the business",
        body: "We work out who the site is for and what it has to make them do, before anyone talks about pages or colors.",
      },
      {
        title: "Design",
        body: "We design the pages and agree them with you, so structure and copy are settled before development starts.",
      },
      {
        title: "Build",
        body: "We develop the site with performance and search visibility built in, rather than added as a later fix.",
      },
      {
        title: "Launch",
        body: "We connect your domain, set up certificates, submit the sitemap and confirm the site is being indexed.",
      },
      {
        title: "Handover",
        body: "We show you how to edit content and hand over the code, so the site is not dependent on us.",
      },
    ],
    faq: [
      {
        question: "How long does a website take?",
        answer:
          "Most take a few weeks, depending on the number of pages and how ready your content is. Content is usually the part that sets the date.",
      },
      {
        question: "Can I edit the site myself afterwards?",
        answer:
          "Yes. We set up content editing for the parts that change often and show you how it works before handover.",
      },
      {
        question: "Do you handle SEO?",
        answer:
          "The technical side is included: metadata, structured data, performance, sitemap and indexing. Ongoing content and link building are a separate, ongoing effort.",
      },
      {
        question: "What about hosting?",
        answer:
          "We deploy to Vercel or Netlify under your own account. Hosting a marketing site is usually free or close to it at normal traffic.",
      },
      {
        question: "Will it work on phones?",
        answer:
          "Yes, and we treat the phone as the primary case rather than an afterthought, because that is where most of your traffic will come from.",
      },
      {
        question: "Do I own the site?",
        answer:
          "Yes, the code, the domain and the accounts are all in your name. Nothing is held on our side.",
      },
    ],
  },
  {
    slug: "landing-page-development",
    title: "Landing Page Development",
    onHome: false,
    description:
      "A single page with one job: turning the traffic you paid for into leads. Built fast, measured properly, and ready to test against a second version.",
    eyebrow: "Landing Page Development",
    h1: "Landing pages that turn paid traffic into leads.",
    lead: "Sending ads to your homepage wastes the budget. We build a focused page with one message and one action, wired to conversion tracking from the first visit.",
    answer: {
      question: "What is a landing page and when do you need one?",
      body: "A landing page is a single page built around one offer and one action, with the navigation and distractions removed. You need one whenever you are paying for traffic, because a homepage asks visitors to choose between ten things and a landing page asks them to do one.",
      includes: [
        "Copy and design built around a single conversion",
        "A form or booking flow that delivers where you work",
        "Conversion tracking for Google Ads and Analytics",
        "Fast loading, which directly affects your ad costs",
        "A second variant prepared for A/B testing",
      ],
    },
    audience: [
      {
        title: "Anyone running paid ads",
        body: "You are buying clicks and sending them to a page that was never designed to convert them.",
      },
      {
        title: "Businesses launching an offer",
        body: "One product, one promotion, one campaign that deserves its own page rather than a section on the homepage.",
      },
      {
        title: "Teams testing a new market",
        body: "You want to know whether the demand is real before committing to building the whole thing.",
      },
      {
        title: "Companies with poor lead volume",
        body: "The traffic arrives and leaves, and nobody can tell you at which point it gives up.",
      },
    ],
    deliverables: [
      "A live landing page, fast on mobile",
      "Copy written for the offer, not generic filler",
      "A form or booking flow delivering to your inbox or CRM",
      "Conversion tracking verified with a real test submission",
      "A second variant ready for A/B testing",
      "A short report on what to watch in the first weeks",
    ],
    process: [
      {
        title: "Understanding the offer",
        body: "We work out who is arriving, what they are looking for and what single action the page has to produce.",
      },
      {
        title: "Copy and design",
        body: "We write the page around that action and design it so nothing on screen competes with it.",
      },
      {
        title: "Build",
        body: "We develop the page for speed, because load time affects both conversion and what your clicks cost.",
      },
      {
        title: "Tracking",
        body: "We connect conversion tracking and confirm it with a real submission, so your ad platform optimizes against truth.",
      },
      {
        title: "Test",
        body: "We prepare a second variant so you can improve the page with evidence rather than opinion.",
      },
    ],
    faq: [
      {
        question: "How is this different from a website?",
        answer:
          "A website informs and lets people explore. A landing page removes the exploring and pushes one action. They have different jobs and mixing them costs you conversions.",
      },
      {
        question: "How fast can a landing page be ready?",
        answer:
          "Usually within a couple of weeks. It is the quickest way to test whether an offer works before investing in anything larger.",
      },
      {
        question: "Do you write the copy?",
        answer:
          "Yes. The copy is most of what makes a landing page work, so it is part of the build rather than something you have to supply.",
      },
      {
        question: "Can you set up A/B testing?",
        answer:
          "Yes. We prepare a second variant and set up the test, so you can improve the page based on what visitors actually do.",
      },
      {
        question: "Will it connect to my CRM?",
        answer:
          "Yes, where your CRM allows it. Otherwise submissions go to your inbox or a spreadsheet, and we can automate from there.",
      },
      {
        question: "Do I need one page or several?",
        answer:
          "One per offer or per audience. If your ads say different things to different people, sending them all to the same page undoes the targeting you paid for.",
      },
    ],
  },
  {
    slug: "google-ads-management",
    title: "Google Ads Management",
    onHome: false,
    description:
      "Paid traffic managed by people who also build the page it lands on. We set up the campaigns, make conversion tracking tell the truth, and cut the spend that is not producing customers.",
    eyebrow: "Google Ads Management",
    h1: "Google Ads managed against real conversions.",
    lead: "Most accounts optimize towards the wrong number. We set up conversion tracking properly first, then run campaigns against the metric that matters: customers, not clicks.",
    answer: {
      question: "What does Google Ads management include?",
      body: "It is campaign setup, conversion tracking, ongoing optimization and reporting. The part most accounts get wrong is tracking. If Google cannot see which clicks became customers, it optimizes for the wrong thing and the budget goes to traffic that never converts.",
      includes: [
        "Account and campaign setup, or an audit of the existing one",
        "Keyword research and a negative keyword list from day one",
        "Conversion tracking verified end to end, not assumed",
        "Ad copy written and tested against each other",
        "Monthly reporting in plain language, with what changes next",
      ],
    },
    audience: [
      {
        title: "Businesses new to paid ads",
        body: "You want customers from search and would rather not learn this by burning a budget first.",
      },
      {
        title: "Accounts spending without results",
        body: "The money leaves every month and nobody can show which part of it produced a customer.",
      },
      {
        title: "Companies with a good offer",
        body: "The product converts once people see it, and the problem is simply that not enough people do.",
      },
      {
        title: "Teams with no tracking",
        body: "Your reports show clicks and impressions, and nothing that connects to revenue.",
      },
    ],
    deliverables: [
      "Campaigns built and live, or restructured if they exist",
      "Conversion tracking verified with a real conversion",
      "Keyword and negative keyword lists you can see",
      "Ad copy variants running against each other",
      "Monthly reporting tied to leads and cost per lead",
      "Full ownership of the ad account, in your name",
    ],
    process: [
      {
        title: "Audit and goals",
        body: "We review any existing account, agree what a conversion is worth to you, and set the target cost per lead.",
      },
      {
        title: "Tracking first",
        body: "We set up and verify conversion tracking before spending anything, because everything after this depends on it.",
      },
      {
        title: "Campaign build",
        body: "We build the campaigns, keywords, negatives and ad copy, structured so the reporting will actually be readable.",
      },
      {
        title: "Optimisation",
        body: "We cut what is not converting, expand what is, and keep the negative keyword list growing every month.",
      },
      {
        title: "Reporting",
        body: "You get monthly reporting in plain language, with what we changed and what we are changing next.",
      },
    ],
    faq: [
      {
        question: "What budget do I need to start?",
        answer:
          "Enough to gather data in a reasonable time, which depends on your cost per click and how many leads you need to judge results. We work that out with you before you commit.",
      },
      {
        question: "Who owns the ad account?",
        answer:
          "You do, in your company's name. We work inside your account, so if we stop working together you keep the account, the history and the data.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Traffic starts immediately, but the first weeks are for learning. Judging performance sensibly usually takes a month or two of real conversion data.",
      },
      {
        question: "Do you also build the landing page?",
        answer:
          "Yes, and it usually matters more than the campaign settings. Ads and page are the same job, which is why we prefer to do both.",
      },
      {
        question: "Why is conversion tracking such a focus?",
        answer:
          "Because Google optimizes towards whatever you tell it to count. If that number is wrong, the algorithm will efficiently buy you the wrong traffic.",
      },
      {
        question: "Do you work with other ad platforms?",
        answer:
          "Google Ads is our focus, since it captures people already searching for what you sell. We can advise on others, but we will not pretend to specialize in everything.",
      },
    ],
  },
];

/** The four core services: the home grid and the header dropdown. */
export const homeServices = services.filter((service) => service.onHome);

export function getService(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

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
