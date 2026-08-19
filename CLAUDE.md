# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Marketing site for GuyShore, a custom software development company (MVPs, software, apps, automations) selling to non-technical founders and startups. Office in Lisbon; clients served remotely across the US. Founder: Guy Sartori. Content is in English.

Routes: home, services (index + a detail page per service), about, blog (index + MDX posts), contact. The portfolio route was deleted and is not coming back.

## Site copy is American English

Every user-visible string on the site is written in **English, American spelling**: optimize, organize, recognize, license, color, judgment. This holds regardless of the language the request arrives in, which is usually Portuguese. Translate the intent, do not paste the Portuguese.

Two standing rules that come from earlier corrections:

- **No em dashes anywhere in site copy.** Use commas, colons or a full stop.
- Grep before shipping: `grep -rnoE "optimis|organis|recognis|specialis|licence|colour|judgement" src/` should return nothing.

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

- `site.ts` — company facts, `title` (the browser-tab title), address, email, nav.
- `services.ts` — every service and its whole detail page. `services` is all seven; `homeServices` is the four with `onHome: true`, used by the home grid and the header dropdown; `getService(slug)` resolves one. Also the five-step `method`.
- `faq.ts` — home-page FAQ entries.
- `team.ts` — `founder`, including the LinkedIn URL.
- `partners.ts` — the three partner logos, their links and their 1x box sizes.
- `contact.ts` — form shapes and the initial action state.

**Home page composition** (`src/app/page.tsx`): hero (owns the first screen alone) → partners → our services (four cards, then a centred link to `/services`) → our method → who we are → FAQ → contact. Each block is either a component in `src/components/` or a section rendered straight from a `src/lib` module.

**Blog is MDX compiled by `@next/mdx`.** Posts are `.mdx` files in `src/content/blog/`; the filename is the slug. Each post exports a `meta` object (title, description, date, author, readingTime, tags) alongside its default component — named `meta`, not `metadata`, so it is never confused with the Next.js route-metadata convention.

`src/lib/posts.ts` is the only reader: it lists the directory with `fs`, then dynamically imports each file. The import specifier `@/content/blog/${slug}.mdx` must keep its literal prefix and extension so the bundler can resolve the context — do not refactor it into a fully computed path.

`src/mdx-components.tsx` is required by `@next/mdx` and must stay at the root of `src/`. It only handles what CSS cannot: routing internal links through `<Link>` and wrapping tables in a scroll container. All prose styling is the hand-rolled `.prose` block in `globals.css` (no typography plugin).

Adding a post requires no code changes. Adding a remark/rehype plugin does: Turbopack cannot receive JS functions, so plugins are named as **strings** in `next.config.ts`.

## Services

`src/lib/services.ts` is the single source for all of it. A service object carries both the card copy and every section of its detail page, so adding a service is a data edit and nothing else: it appears on `/services`, gets a prerendered detail page, enters the sitemap, and joins the header dropdown if `onHome` is true.

- `/services` (`src/app/services/page.tsx`) lists all seven, one per row. Long descriptions side by side invite comparison rather than reading, which is why it is not a grid.
- `/services/[slug]` renders hero → direct answer → who this is for → deliverables → process → FAQ → contact, and is statically generated via `generateStaticParams`.

Each detail page emits a `@graph` of **Service + FAQPage + BreadcrumbList**, all derived from the same object the page renders. As with the home schema, there is no `offers` node: the site publishes no prices, and markup must not claim what the page does not show.

The contact form on a detail page posts `source: "service-<slug>"`, so the automation can tell which page produced a lead.

**The header dropdown** lives in `site-header.tsx`. It opens on hover for pointers and on click for keyboard and touch, and closes on Escape. It must not close via an effect: `react-hooks/set-state-in-effect` is an error in this repo.

## Partners

The row under the hero replaced the service marquee and the stats band, both deleted.

`public/partners/*.png` are pre-processed, not the partners' original files. Each one is flattened to a **single grey** (`--color-slate`, the alpha channel of the source becomes the mask of a solid colour fill) and then scaled so all three carry the **same optical area**, not the same height. A wide horizontal lock-up and a stacked near-square one never read as equal weight at equal height; `sqrt(w x h)` is what makes them match. Measured spread across the three: 1.02x.

The regeneration pipeline is: fetch the source, trim to the ink bounding box, replace the colour while keeping alpha, then resize to `SIDE * sqrt(ratio)` by `SIDE / sqrt(ratio)` at 3x. Sizes in `partners.ts` are the 1x CSS box.

Two traps:

- **Do not put `w-auto`/`h-auto` on the `<Image>`.** On a replaced element that has not loaded, `width: auto` computes to 0, the box collapses, and the lazy-load observer then never fires because there is nothing to intersect. The `width`/`height` props are the sizing.
- **The links must not become `nofollow`.** The partnership offers a real backlink; `rel="noreferrer"` alone does not stop a link being followed, which is why it is safe to keep for `target="_blank"`.

## Design system

Tokens are defined in the `@theme` block of `src/app/globals.css` (Tailwind v4 — there is no `tailwind.config`). The palette is **monochrome**, roughly 70% white / 20% grey / 10% black, and there is no accent colour:

| Token | Value | Role |
|---|---|---|
| `paper` | `#ffffff` | page surface, and light text on dark |
| `mist` | `#f4f4f5` | raised and alternating sections |
| `slate` | `#6b6b74` | labels and tertiary text |
| `steel` | `#3f3f46` | body and secondary text |
| `ink` | `#18181b` | headings, dark surfaces, primary buttons |

`slate` is exactly as light as it can be: `#71717a` measures 4.4:1 on `mist` and fails AA. Plus `line` and `line-strong` for hairlines, and the type scale `text-display` / `text-title` / `text-lead`.

- **Two families, both through `next/font`.** `font-display` is Host Grotesk 700, used for headings only. `font-body` is Space Grotesk, used for everything else including navigation and buttons. `font-label` is deliberately the same family as `font-body`; `font-mono` is a system stack and is only for code.
- The one branded colour on the site is LinkedIn blue, on the LinkedIn button alone (`ButtonLink variant="linkedin"`, `#0a66c2`, measured 5.69:1 with white text). Do not spread it.
- Focus rings use `outline: 2px solid currentColor`, not a fixed colour, because a black ring disappears on the dark sections.
- `.tick-rule` and `.eyebrow` are the recurring structural devices. Numbered markers appear only where the content is genuinely a sequence: the five-step method and the process block on a service page.
- Motion lives in `globals.css`: `animate-rise-in` (hero load) and `animate-float`. The float animation opts out of the global reduced-motion reset explicitly, because snapping a loop to its end frame is worse than holding it still.

## Image placeholders

The hero and the founder portrait both use real assets now (`public/logo-mark.png` and `public/guy-sartori-avatar.png`). One decorative slot remains:

- The full-bleed banner at the top of `/contact`, a gradient panel with the exact `<Image>` swap in a comment above it.

`public/og-image.png` is a 1200×630 screenshot of the live hero, taken from the **production** build (the dev build paints a Next.js badge over the corner). Regenerate it whenever the hero changes: run `next start`, then headless Chrome at `--window-size=1200,630 --force-device-scale-factor=2`, and downscale with sharp using `.flatten()` so the PNG carries no alpha.

## Where this runs

- **Live at** `https://guyshore.com` (apex is primary, `www` 301s to it). DNS is at Namecheap: `ALIAS @ -> apex-loadbalancer.netlify.com` and `CNAME www -> guyshore-website.netlify.app`.
- **Netlify** project `guyshore-website`, auto-publishing from `main`.
- **GitHub** `guilhermekodenvis/guyshore-website` (public).
- **n8n** cloud instance `black-elephant`, workflow *GuyShore site contact form* in the `Personal / GuyShore` folder.
- **Mail** for `business@guyshore.com` is Google Workspace (`MX 1 smtp.google.com`), served from the same Namecheap zone. The mailbox is real and receives; earlier notes claiming the domain had no MX were wrong.

### The domain can be suspended out from under you

On 2026-08-10 Namecheap swapped the delegation to `failed-whois-verification.namecheap.com` / `verify-contact-details.namecheap.com`, because the ICANN registrant-email verification went unanswered for the 15 days after registration. That parks apex and `www` on `198.54.117.242` and publishes no MX, so **the site, the company mailbox and the contact form all go down together**.

The registrar panel is no help diagnosing it: it still shows the domain ACTIVE and still lists the intended nameservers. Only the registry tells the truth.

```bash
curl -s https://rdap.verisign.com/com/v1/domain/guyshore.com
```

Two things made this slow to fix, both worth knowing before it happens again:

- **There is no resend button anywhere in the Namecheap dashboard.** It lives on the suspension page served at the domain itself, and POSTs to `https://raa.namecheap.com/api/v1/ncpl/raa/ResendConfirmationEmail`.
- **Our own HSTS header locks us out of that page.** The site sends `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`, so any browser that has already loaded `https://guyshore.com` forces HTTPS forever, and the parking host has no certificate for the domain. You get `ERR_CONNECTION_REFUSED` and no way through. Open it from a browser profile that has never visited the site over HTTPS.

The verification mail goes to the **registrant** contact, `gui.sartori96@gmail.com`, not to `business@guyshore.com`. Recovery took about five minutes once the link was clicked. The A, MX and TXT records survive the suspension untouched and so does the Let's Encrypt certificate, so nothing needs rebuilding afterwards. Renewal is 2027-07-26, and editing the registrant email restarts the 15-day clock.

## Contact form delivery

`submitContact` POSTs validated submissions to `process.env.N8N_CONTACT_WEBHOOK_URL`, set in Netlify to the n8n production webhook. The importable workflow and setup steps live in `automation/`. Both forms carry a hidden `source` field (`home` or `contact-page`) so the automation can tell them apart; do not try to infer the source from which fields are filled, since both forms currently render the short variant.

Three failure modes are handled distinctly:

- Variable unset: logs a warning naming the variable, still reports success. Grep Netlify function logs for that string when submissions go missing.
- Non-2xx response, or a 10s timeout: the visitor sees an error with the fallback email.
- HTTP 200 carrying `{"ok": false}`: also treated as a failure. The *Respond to Webhook* node's `responseCode` is not honoured by every n8n version, so a rejection can arrive as a 200 and must be read from the body.

A healthy submission shows up in the Netlify function log as a ~3s invocation; a warning-only path returns in single-digit milliseconds.

## Not yet wired

There is no booking flow anywhere on the site. The hero used to carry a secondary "Book a 1-hour consultation" CTA that only pointed at `/contact`; it was removed rather than left pretending. Every CTA now routes to the contact form.

## Stale content

The site pivoted from a nearshore-staffing premise to the current one. These still carry the old framing and need rewriting: the `/about` page body, and all three blog posts in `src/content/blog/` (they are about distributed teams and timezone overlap).
