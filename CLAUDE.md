# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Marketing site for GuyShore, a custom software development company (MVPs, software, apps, automations) selling to non-technical founders and startups. Office in Lisbon; clients served remotely across the US. Founder: Guy Sartori. Content is in English.

Four routes: home, about, blog (index + MDX posts), contact. The services and portfolio routes were deleted — services now live only as a section on the home page.

## Commands

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

`npm start` serves the production build. There are no tests configured.

Port 3000 is occupied on this machine by an unrelated `workerd.exe`, so `.claude/launch.json` pins the dev server to **3001** (`npm run dev -- --port 3001`).

## Next.js 16 specifics

The installed version is newer than most training data. Consult `node_modules/next/dist/docs/` before using an API you are unsure about — `01-app/01-getting-started/` and `01-app/02-guides/` are the useful trees.

Two constraints that have already caused failures here:

- **`"use server"` modules may only export async functions.** Exporting a constant (even a plain object) from `src/app/contact/actions.ts` throws at module evaluation, and the failure surfaces as a 500 on POST rather than a build error. Shared state shapes and constants live in `src/lib/contact.ts` for exactly this reason.
- **`react-hooks/set-state-in-effect` is an error, not a warning.** Calling `setState` synchronously in an effect body fails lint. Prefer event handlers (see how `SiteHeader` closes the mobile menu).

Route params are Promises: `{ params: Promise<{ slug: string }> }`, awaited in the component.

Turbopack caches aggressively in dev. After renaming an export, stale HMR errors naming the old identifier can persist in the browser console across reloads — trust `next build` and `npx tsc --noEmit` over the console, and restart the dev server to clear the overlay.

## Architecture

**Data lives in `src/lib/`, never inline in pages.** Editing copy means editing these modules:

- `site.ts` — company facts, `title` (the browser-tab title), address, email, nav, the four `stats`.
- `services.ts` — `serviceGroups` (Development / Marketing), the flattened `services`, and the five-step `method`.
- `faq.ts` — home-page FAQ entries.
- `team.ts` — `founder` and `principles`.
- `contact.ts` — form shapes and the initial action state.

**Home page composition** (`src/app/page.tsx`): hero → service marquee → stats → our services → our method → who we are → FAQ → contact. Each block is either a component in `src/components/` or a section rendered straight from a `src/lib` module.

**Blog is MDX compiled by `@next/mdx`.** Posts are `.mdx` files in `src/content/blog/`; the filename is the slug. Each post exports a `meta` object (title, description, date, author, readingTime, tags) alongside its default component — named `meta`, not `metadata`, so it is never confused with the Next.js route-metadata convention.

`src/lib/posts.ts` is the only reader: it lists the directory with `fs`, then dynamically imports each file. The import specifier `@/content/blog/${slug}.mdx` must keep its literal prefix and extension so the bundler can resolve the context — do not refactor it into a fully computed path.

`src/mdx-components.tsx` is required by `@next/mdx` and must stay at the root of `src/`. It only handles what CSS cannot: routing internal links through `<Link>` and wrapping tables in a scroll container. All prose styling is the hand-rolled `.prose` block in `globals.css` (no typography plugin).

Adding a post requires no code changes. Adding a remark/rehype plugin does: Turbopack cannot receive JS functions, so plugins are named as **strings** in `next.config.ts`.

## Design system

Tokens are defined in the `@theme` block of `src/app/globals.css` (Tailwind v4 — there is no `tailwind.config`). Utilities follow from the token names: `bg-deep`, `text-tide`, `text-surf`, `bg-noon`, `bg-aqua`, `bg-paper`, `bg-foam`, plus the type scale `text-display` / `text-title` / `text-lead`.

- Amber (`noon`) is the single accent: step numbers, group labels, the marquee separators, focus rings, list markers. Spend it sparingly — it only works because everything around it is quiet.
- Three type roles, all wired through `next/font`: `font-display` (Archivo) for headings and UI, `font-body` (Source Serif 4) for prose, `font-mono` (JetBrains Mono) for labels and data. The serif-body/sans-display pairing is deliberate — do not "fix" it to a conventional sans body.
- `.tick-rule` and `.eyebrow` are the recurring structural devices. Numbered markers appear only where the content is genuinely a sequence (the five-step method, case-study steps) — not on service or portfolio listings.
- Motion lives in `globals.css`: `animate-rise-in` (hero load), `animate-float` (hero tags), `animate-marquee`. The marquee and float animations opt out of the global reduced-motion reset explicitly, because snapping a loop to its end frame is worse than holding it still.

**The marquee** (`service-marquee.tsx`) renders its list twice and translates the track `-50%`, so the loop is seamless. The duplicate is `aria-hidden`. The track is wider than the viewport by design; the section's `overflow-hidden` is what keeps the page from scrolling sideways.

## Image placeholders

Two slots ship with a decorative gradient panel instead of a real asset, each marked with a comment showing the exact `<Image>` swap:

- Hero panel — `src/components/hero.tsx`
- Founder portrait — the "Who we are" section of `src/app/page.tsx`, expecting `public/team/guy-sartori.jpg` (path in `team.ts`).

## Contact form delivery

`submitContact` POSTs validated submissions to `process.env.N8N_CONTACT_WEBHOOK_URL`. The importable workflow and setup steps live in `automation/`. Both forms carry a hidden `source` field (`home` or `contact-page`) so the automation can tell them apart; do not try to infer the source from which fields are filled, since both forms currently render the short variant.

If the variable is unset the action logs a warning and still reports success to the visitor. If the webhook errors or times out (10s), the visitor sees an error with the fallback email rather than a false success.

## Not yet wired

The hero's secondary CTA ("Book a 1-hour consultation") points at `/contact`; if a real booking tool is adopted, that link is the place to change.

`site.url` is `https://guyshore.com`, which feeds `metadataBase`, the sitemap and robots. Update it if the domain differs.

## Stale content

The site pivoted from a nearshore-staffing premise to the current one. These still carry the old framing and need rewriting: the `/about` page body, and all three blog posts in `src/content/blog/` (they are about distributed teams and timezone overlap).
