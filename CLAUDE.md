# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Marketing site for GuyShore, a custom software development company (MVPs, software, apps, automations) selling to non-technical founders and startups. Office in Lisbon; clients served remotely across the US. Founder: Guy Sartori. Content is in English.

Routes: home, services (index + a detail page per service), portfolio (index + a detail page per project), about, blog (index + MDX posts), contact, privacy, terms. An earlier portfolio route was deleted; the current one was rebuilt from real client projects in September 2026.

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

`.claude/launch.json` pins the dev server to **3000** (`npm run dev -- --port 3000`), with `autoPort: false`. The second entry, `guyshore-attach`, starts nothing: it opens the Browser pane on a server already running on 3000, for when another session owns it.

That port used to be held on this machine by an unrelated `workerd.exe`, which is why the config previously pinned 3001. It is free now. If that process comes back, the start will fail loudly rather than silently moving to another port, which is the point of `autoPort: false`; check with `netstat -ano | findstr ":3000"` before assuming the dev server is broken.

## Next.js 16 specifics

The installed version is newer than most training data. Consult `node_modules/next/dist/docs/` before using an API you are unsure about — `01-app/01-getting-started/` and `01-app/02-guides/` are the useful trees.

Two constraints that have already caused failures here:

- **`"use server"` modules may only export async functions.** Exporting a constant (even a plain object) from `src/app/contact/actions.ts` throws at module evaluation, and the failure surfaces as a 500 on POST rather than a build error. Shared state shapes and constants live in `src/lib/contact.ts` for exactly this reason.
- **`react-hooks/set-state-in-effect` is an error, not a warning.** Calling `setState` synchronously in an effect body fails lint. Prefer event handlers (see how `SiteHeader` closes the mobile menu).

Route params are Promises: `{ params: Promise<{ slug: string }> }`, awaited in the component.

Turbopack caches aggressively in dev. After renaming an export, stale HMR errors naming the old identifier can persist in the browser console across reloads — trust `next build` and `npx tsc --noEmit` over the console, and restart the dev server to clear the overlay.

## Architecture

**Data lives in `src/lib/`, never inline in pages.** Editing copy means editing these modules:

- `site.ts` — company facts, `title` (the browser-tab title), `listingName`, address, phone, email, `nav` and `legalNav`.
- `services.ts` — every service and its whole detail page. `services` is all seven; `homeServices` is the four with `onHome: true`, used by the home grid and the header dropdown; `getService(slug)` resolves one. Also the five-step `method`.
- `faq.ts` — home-page FAQ entries.
- `team.ts` — `founder`, including the LinkedIn URL and the `highlights` rendered under the LinkedIn button. An entry with `value: null` renders as a full-width statement instead of a number.
- `partners.json` — the partner logos, their links and their 1x box sizes. The only file to edit to add, remove or reorder a partner; `partners.ts` just types it.
- `feasibility.ts` — the MVP Feasibility Check panel: copy, deliverables, and the button, which scrolls to the home contact form.
- `portfolio.ts` — types and orders the portfolio. The content itself lives in `public/portfolio/<slug>/details.json`; see the Portfolio section.
- `google-reviews.ts` — the server-side Places API read behind the client reviews section, served to the browser by `src/app/api/google-rating/route.ts`; see Client reviews.
- `contact.ts` — form shapes and the initial action state.

**Home page composition** (`src/app/page.tsx`): hero (owns the first screen alone) → partners → MVP Feasibility Check → our services (four cards, then a centred link to `/services`) → client reviews (renders nothing until there is something real to show) → portfolio (the featured projects, then a link to `/portfolio`) → our method → who we are → FAQ → contact. Each block is either a component in `src/components/` or a section rendered straight from a `src/lib` module.

**Blog is MDX compiled by `@next/mdx`.** Posts are `.mdx` files in `src/content/blog/`; the filename is the slug. Each post exports a `meta` object (title, description, date, author, readingTime, tags) alongside its default component — named `meta`, not `metadata`, so it is never confused with the Next.js route-metadata convention.

`src/lib/posts.ts` is the only reader: it lists the directory with `fs`, then dynamically imports each file. The import specifier `@/content/blog/${slug}.mdx` must keep its literal prefix and extension so the bundler can resolve the context — do not refactor it into a fully computed path.

`src/mdx-components.tsx` is required by `@next/mdx` and must stay at the root of `src/`. It only handles what CSS cannot: routing internal links through `<Link>` and wrapping tables in a scroll container. All prose styling is the hand-rolled `.prose` block in `globals.css` (no typography plugin).

Adding a post requires no code changes. Adding a remark/rehype plugin does: Turbopack cannot receive JS functions, so plugins are named as **strings** in `next.config.ts`. `remark-gfm` is already on, so tables work.

Three things a post author needs to know, learned publishing the first one:

- The body starts at `##`. The template renders `meta.title` as the h1, so a `# ` in the body makes two.
- Internal links must be **relative** (`/services/mvp-development`). `mdx-components.tsx` only routes `/`-prefixed hrefs through `<Link>`; an absolute `https://guyshore.com/...` is treated as external and opens in a new tab.
- MDX comments are `{/* ... */}`. HTML comments `<!-- -->` are a syntax error in MDX.

**Three rich blocks are available as bare tags in MDX**, exposed through `mdx-components.tsx` so a post needs no import line. They are the only components a post may use; everything else stays Markdown.

- `<PostFaq items={meta.faq} />` renders the accordion, reusing the site-wide `FaqList`. Feed it `meta.faq` and nothing else, so the visible answers and the FAQPage schema come from one array and cannot drift.
- `<PostCta title body href label />` is the black slab. `href` is treated as external and opens in a new tab.
- `<PostImage src alt caption width height priority />` is a figure. `width`/`height` are the file's intrinsic pixels and must be real, because they reserve the space that stops the article jumping while it loads.

Each of the three carries a hook class (`post-faq`, `post-cta`, `post-figure`) that `globals.css` uses to undo the `.prose` rules that would otherwise reach inside them, in particular `.prose h3` spacing and `.prose a:hover`.

Two traps those overrides sit on:

- **A `.prose` rule cannot override a Tailwind utility on the same element.** The `.prose` block lives in `@layer components` and utilities live in the later `@layer utilities`, so the utility wins no matter how specific the selector is. Only properties the element does not already set as a utility can be corrected there, which is why `.prose .post-faq h3` sets `margin-top` and nothing else. Size the heading in `faq-list.tsx` instead.
- **The focus ring is `outline: 2px solid currentColor` at a 3px offset.** On a white button sitting on the black `PostCta` slab that draws a black ring on black, invisible. `globals.css` repaints it with `.post-cta a:focus-visible { outline-color: var(--color-paper) }`. Any future light-on-dark control needs the same treatment.

**Images live in `public/blog/<slug>/`**, one folder per post, so deleting a post means deleting one folder. Export at 2x the rendered width: the prose column is 68ch, roughly 800px, so 1600px wide is the right source. Filenames are kebab-case and describe the content, not the position (`four-walls-diagram.png`, not `image-1.png`).

**Every post ends with `<PostSubscribe />`**, rendered by the template rather than the MDX so a new article cannot ship without it. It posts to the same n8n webhook as the contact form with `source: "blog-subscribe"`, filling `name` and `message` with fixed strings so the existing notification email stays readable without changing the automation.

`meta` accepts four optional fields beyond the required six: `seoTitle` (a search-facing `<title>` distinct from the h1, used verbatim with no site suffix), `updated` (feeds `dateModified`), `image` (a 1200x630 path under `public`, used for Open Graph, Twitter and the Article `image`; falls back to `/og-image.png`), and `faq` (emitted as FAQPage structured data; keep it a faithful copy of the FAQ section in the body, because search engines require schema answers to be visible on the page). The template emits Article + BreadcrumbList for every post, and FAQPage when `faq` is present, all derived from `meta`.

## Generated text routes

Three files are served as text and **none of them is hand-written**. All three read the same `src/lib` modules the pages render, so publishing a service or a post updates them with no extra step. Never replace one with a static file in `public/`.

- `src/app/sitemap.ts` and `src/app/robots.ts` use the Next.js metadata file conventions. `robots.ts` lists GPTBot, ClaudeBot, PerplexityBot, Google-Extended and CCBot explicitly rather than leaving them to the `*` rule, so the intent to allow them is legible to anyone auditing it. Every group also disallows `/api/`: the rating endpoint bills Google on each call, and a crawler rendering the home page would otherwise trigger it. A crawler obeys only the most specific group that names it, which is why the rule is repeated rather than set once on `*`.
- `src/app/llms.txt/route.ts` is the curated index described at llms.txt.org: the company facts, then every service, post, company and legal page as a labelled link with a one-line summary. Next.js has no file convention for it, so it is a route handler with `export const dynamic = "force-static"`, which prerenders it at build like the sitemap. The docs name this exact pattern in `01-app/02-guides/backend-for-frontend.md`.

Be honest about what `llms.txt` buys: no crawler has publicly committed to reading it and Google has said it does not use it, so the answer-engine benefit is speculative. It is here because it costs one generated file, exposes nothing that is not already in `sitemap.xml`, and cannot go stale.

## Services

`src/lib/services.ts` is the single source for all of it. A service object carries both the card copy and every section of its detail page, so adding a service is a data edit and nothing else: it appears on `/services`, gets a prerendered detail page, enters the sitemap, and joins the header dropdown if `onHome` is true.

- `/services` (`src/app/services/page.tsx`) lists all seven, one per row. Long descriptions side by side invite comparison rather than reading, which is why it is not a grid.
- `/services/[slug]` renders hero → direct answer → who this is for → deliverables → process → FAQ → contact, and is statically generated via `generateStaticParams`.

Each detail page emits a `@graph` of **Service + FAQPage + BreadcrumbList**, all derived from the same object the page renders. There is no `offers` node: nothing on the site publishes a price, scope and cost are quoted per project, and markup must not claim what the page does not show. The MVP Feasibility Check showed `$275, delivered in 7 days` until 2026-09-16; that was removed too.

The contact form on a detail page posts `source: "service-<slug>"`, so the automation can tell which page produced a lead.

**The header dropdown** lives in `site-header.tsx`. It opens on hover for pointers and on click for keyboard and touch, and closes on Escape. It must not close via an effect: `react-hooks/set-state-in-effect` is an error in this repo. Keep every desktop nav item the same kind of box as the Services button, a flex container around a span with `pb-1` and a 2px border: an inline span's padding does not count toward its height, and the mismatch put Services 3px above the other links. Measure label alignment with a Range over the text node, not the element box.

**The header is one element that morphs into a floating island** once the page scrolls past 16px (`src/lib/scroll-detached.ts`, a `useSyncExternalStore` store with hysteresis, read the same way consent is). The `<header>` keeps a fixed 4.5rem box with `pointer-events: none`, so the hero's `100dvh - 4.5rem` still holds and the empty space beside the island does not swallow clicks; `.nav-shell` inside it is what moves. The material is the closest CSS gets to Apple's Liquid Glass, and it was chosen by rendering candidate recipes over the real page backgrounds (hero, mist band, black panel, portfolio screenshots) and judging them against the client's brief, not by tuning values in the inspector: `blur(22px) saturate(1.8) brightness(1.06) contrast(0.9)` under 68% paper (smoky over ink, milky over white), a body gradient on `.nav-glass::before`, a wide elliptical specular on `.nav-glass::after`, a 1px lensing rim on `.nav-shell::before`, and a far two-layer shadow with no contact line. Every lighting layer is a fixed gradient that fades by opacity, and the attached state carries identity `brightness(1) contrast(1)` and zero-alpha shadows so the morph interpolates instead of jumping. Refraction is out of reach (WebKit rejects reference filters in `backdrop-filter`). The rejected first version was a 74% white pill with a drop shadow: technically correct and, on sight, not glass. Four traps, each found the hard way:

- **The material lives on `.nav-glass`, a child, not on the shell.** An element with `backdrop-filter` is the backdrop root for its descendants, so with the blur on the shell the services dropdown sampled the shell's own surface and its blur did nothing (Chrome and Firefox; Safari samples through, which gave three browsers two looks). Never put `opacity`, `filter`, `mask` or `isolation: isolate` on `.nav-shell`: each one makes it a backdrop root again and silently re-breaks the dropdown. The reduced-transparency, `prefers-contrast: more` and no-`backdrop-filter` fallbacks target `.nav-glass` and `.glass-panel` for the same reason.
- **The island radius is `2.25rem`, not `9999px`.** `border-radius` interpolates as a length and the used value is clamped to half the box, so 0 to 9999px passed the clamp at 0.4% of the curve and the corners popped on the second frame. 36px is half the attached height: a full pill at every height the row passes through, and it still morphs.
- **The easing is `--nav-ease`, a custom property, not `transition-timing-function: inherit`.** `inherit` reads the parent element, which for `.nav-mark` is the wordmark link (`ease`), not the shell. The `linear()` spring (Apple's critically damped 0.4s) is set under `@supports`, because `var()` substitution happens after the cascade: an unparseable value computes to `ease`, it does not fall back to the earlier bezier.
- **The mobile menu scrolls inside the island** (`max-height: calc(100dvh - var(--row-h) - 1.5rem)`). The header is sticky and the shell absolute, so page scroll can never bring a tall menu's tail into view; on a 375x667 phone the menu is 11px taller than the space.

The two Contact pills carry `focus-visible:outline-ink`: the global `currentColor` ring is white on them, drawn on the light island (1.00:1 on paper, 1.76:1 over an ink section). Same reasoning as `on-ink`, applied the other way round.

## Contact details are one string, used everywhere

Search engines identify a business by its name, address and phone appearing **identically** across the site and every external listing. So those three live in `site.ts` and are rendered by a single component, `ContactDetails`, which appears in the footer, the home contact section, `/contact` and every service page. Do not re-type them into a page.

- `site.listingName` is `guyshore.com`, which is the name the external listings use. `site.name` stays `GuyShore` for prose and the copyright line. The schema carries the first as `name` and the second as `alternateName`.
- `site.phone` holds both forms: `display` (`+351 934 417 806`, the string listings must match) and `e164` (no spaces, for `tel:` and schema.org).
- The Organization node in `home-schema.ts` reads all of it from `site` rather than repeating the literals, so the markup cannot drift from the page.

Changing any of these means changing the external listings in the same pass, otherwise the consistency they exist for is gone.

**The Google Business Profile does not match the site today.** On 2026-09-15 the listing showed the address Av. António Augusto de Aguiar, 24, 1st floor, right, 1050-016 Lisboa, while `site.address` is Av. Elias Garcia, 123-A, 1050-098 Lisboa. The phone matched. One of the two addresses is wrong and has to be corrected, in the listing or here.

**The founder's email signature is a flat PNG and lives outside the repo.** It bakes the name, role, phone, email, LinkedIn and tagline into pixels, so nothing can validate it and nothing will warn you when it goes stale. Treat it like an external listing: when `site.phone.display`, `site.email`, `site.tagline` or anything in `team.ts` changes, the signature has to be regenerated and reinstalled in the same pass.

## Legal pages

`/privacy` and `/terms` are hand-written to match what the site actually does: **one Google tag, for Google Ads with Google Analytics linked to it, that sets cookies only with consent, and nothing else**. See Consent and Google Ads. Any other script that sets a cookie, reads from the device or tracks a visitor makes the privacy policy false and must go behind the same consent, with the policy updated in the same commit.

The processors named in the policy are Netlify, n8n Cloud and Google Workspace, with Google Ads and Google Analytics described separately because Google also uses that data for its own purposes. That list has to match reality too.

The client reviews section does not change the privacy policy: the visitor's browser only calls this site's own endpoints, including for reviewer avatars, and no visitor data goes to Google through it. The Terms do carry a **Google Maps content** section, because the Maps Platform terms (3.2.2) require it of any site that shows Maps content. It goes only if the reviews section goes.

Both pages carry a `Last updated` date as a constant at the top of the file. Change it when the text changes.

## Consent and Google Ads

The Google Ads tag (`AW-18077342694`, the constant `GOOGLE_ADS_ID` in `src/lib/consent.ts`) sets advertising cookies and sends visit data to Google. GuyShore is established in Portugal, so Lei 41/2004 art. 5 and Google's own EU user consent policy both require consent first. The rules the implementation follows:

- **Advanced consent mode: the tag is always loaded, consent starts denied.** The tag is two `beforeInteractive` scripts in `layout.tsx`, because Google Ads' tag checker cannot see a tag that loads only after a click (basic mode shipped first and failed detection on 2026-09-15). The inline script reads `guyshore-consent` and sets the default to granted only for a stored, unexpired acceptance; `saveConsent` sends the update on Accept. Without consent Google gets cookieless pings only, which the privacy policy says. `analytics_storage` stays denied. If the storage key, version or 395-day lifetime in `consent.ts` changes, change the inline script too.
- **The tag also reports to Google Analytics, and that link is not in this code.** Loading `gtag/js?id=AW-18077342694` sends hits to GA4 property `G-EF3ENX72GF` as well, because that destination is attached to the Google tag in the Google account. A headless run after consent caught the request; before consent nothing is sent. The banner and the privacy policy disclose it. With `analytics_storage` denied, GA4 measures without setting `_ga` cookies, which is why the policy names only `_gcl_au`. If the GA4 destination is removed in the Google tag settings, take it out of the banner and the policy in the same pass.
- **Declining is as easy as accepting.** Decline and Accept are the same button, same size, side by side, on the first and only layer. "Cookie settings" in every footer reopens the banner, and withdrawing an earlier acceptance deletes the `_gcl_*` cookies and reloads so the tag is gone.
- **The choice lives in localStorage as `guyshore-consent`**: `{ v, choice, at }`. Storage strictly necessary to honor the visitor's decision is exempt from consent, and the privacy policy names it. Acceptance is honored for 13 months and refusal for 6, after CNIL's guidance, then the banner asks again. Bump `VERSION` to re-ask everyone when the purposes change.
- **Read it with `useSyncExternalStore`, never an effect.** `react-hooks/set-state-in-effect` is an error here; the store in `consent.ts` notifies subscribers directly. The server snapshot is `pending`, so the banner never renders into static HTML and appears after hydration, fixed-position, shifting nothing.
- **Conversions are not set up.** The base tag only records visits. Counting a lead or a sale needs a conversion label from Google Ads and a `gtag('event', 'conversion', ...)` call on the event, which does not exist yet.
- **Adding another tracker** means putting it behind the same consent check and naming it in the privacy policy, in the same commit.

## Partners

The row under the hero replaced the service marquee and the stats band, both deleted.

**`src/lib/partners.json` is the whole editing surface.** Adding, removing or reordering a partner is a JSON edit and nothing else: the array order is the display order, and `partners.ts` only declares the `Partner` type and hands the array to the row. Every field is required, and TypeScript checks the JSON against the type, so a missing key or a quoted number fails `next build` instead of rendering a broken row. The one thing the type cannot check is that `logo` points at a file that exists, so removing a partner means deleting `public/partners/<name>.png` in the same pass.

**Vet a partner before adding it.** The row is a public statement of who we work with, and it sits on the same domain as the blog. If a post describes a client anonymously, a partner whose own public positioning matches that description defeats the anonymization in one click. Read the partner's own homepage title and meta description before adding the entry, and re-read them when a post that anonymizes a client goes up.

`public/partners/*.png` are pre-processed, not the partners' original files. Each one is flattened to a **single grey** (`--color-slate`, the alpha channel of the source becomes the mask of a solid colour fill) and then scaled so they all carry the **same optical area**, not the same height. A wide horizontal lock-up and a stacked near-square one never read as equal weight at equal height; `sqrt(w x h)` is what makes them match. Measured spread across the two now in the row: 1.00x.

The regeneration pipeline is: fetch the source, trim to the ink bounding box, replace the colour while keeping alpha, then resize to `SIDE * sqrt(ratio)` by `SIDE / sqrt(ratio)` at 3x. Sizes in the JSON are the 1x CSS box.

Two traps:

- **Do not put `w-auto`/`h-auto` on the `<Image>`.** On a replaced element that has not loaded, `width: auto` computes to 0, the box collapses, and the lazy-load observer then never fires because there is nothing to intersect. The `width`/`height` props are the sizing.
- **The links must not become `nofollow`.** The partnership offers a real backlink; `rel="noreferrer"` alone does not stop a link being followed, which is why it is safe to keep for `target="_blank"`.

## Client reviews

The band under "Our services" shows the company's Google rating, review count and up to five written reviews, live from the Places API (New), with a "See all reviews" button to the Google Maps listing. Four rules shape it; read them before extending it.

- **Nothing from Google may be cached, so nothing is.** The Maps Platform terms (no-caching clause, 3.2.3(b) global and 3.3.2(b) EEA) allow storing only the Place ID indefinitely and coordinates for 30 days. The rating and count cannot be kept for any time, which rules out `revalidate`, ISR and prerendering them into HTML. So `/api/google-rating` fetches with `cache: "no-store"` and answers `Cache-Control: private, no-store`, and `GoogleReviews` is a client component that calls it after load. The home page stays static.
- **Up to five written reviews, and they are not "the latest".** Places returns at most five, chosen by Google's relevance ranking, with no parameter to ask for the newest. `getGoogleRating` sorts them newest first, which equals the latest five only while the profile has five or fewer. True latest-five needs the Business Profile API, which returns every review and allows storing them for up to 30 days, but needs OAuth as the profile owner, a profile verified for 60+ days and an access application to Google. The section says how reviews are chosen and ordered, because Google requires that notice.
- **Avatars go through `/api/google-avatar`, never straight to Google.** Google requires every written review to show its author's avatar, an image on Google's hosts. Loading it directly would put a Google request in every visitor's browser, which the privacy policy rules out. The route fetches the image, holds it in memory for one response and marks it no-store, so nothing is cached either. It only fetches https URLs on googleusercontent.com, including after redirects, relays only images and refuses anything over 256KB, so it is not an open proxy. The avatar is a plain <img>, not next/image, because the image optimizer would store the file. Each review also links to its author's profile and to the review on Google Maps, both required.
- **Attribution is prescribed.** The exact words `Google Maps`, unwrapped, `translate="no"`, weight 400, 12 to 16px, in `#1F1F1F` or `#5E5E5E` (`slate` is not on Google's list), inside a container visibly set apart from the page. Never put it next to a map or a map embed.
- **Every call costs.** Asking for `reviews` bills as Place Details Enterprise + Atmosphere: 1,000 free events a month per billing account, then USD 25 per 1,000 (price list of September 2026). Each page view that runs JavaScript is one event. The key needs a daily quota cap in Google Cloud so a script hammering the endpoint cannot run up a bill, and `robots.ts` keeps crawlers off `/api/`.

It renders nothing when `GOOGLE_PLACES_API_KEY` or `site.googlePlaceId` is missing, on any API error, and while the profile has no reviews. The profile received its first review on 2026-09-15 (5.0, 1 review), and `site.googlePlaceId` is set to `ChIJA3EyIRszGQ0RQKo6mrIqhAY`, confirmed by a Text Search that returned the same listing, address and CID (469547207733455424) as Google Maps. The key is `guyshore-website-places` in the BlackElephant Google Cloud account, project Factory (`factory-502213`), so the usage bills to that billing account. It is restricted to Places API (New) with no application restriction, because Netlify has no fixed egress IP. The project-wide `GetPlaceRequest per day` quota was lowered from 125,000 to 300 as a cost cap; Factory used no Maps API in the 30 days before, so the cap affects nothing else, but re-check it if Factory ever starts using Places. Set the key in Netlify as a server variable, never `NEXT_PUBLIC_`, and in a gitignored `.env.local` for development. `REVIEWS_PREVIEW=1` in `.env.local` shows sample numbers in development only.

## Portfolio

Each project is a folder in `public/portfolio/<slug>/`: its screenshots plus a `details.json` with everything the site renders (name, client, category, summary, description paragraphs, deliverables, stack, link, `featured`, `order`, cover, and the images with their intrinsic sizes and alt text). The folder name is the URL: `/portfolio/<slug>`.

- **Adding a project** is the folder plus one import and one entry in `src/lib/portfolio.ts`. The JSON is imported rather than read with `fs`, because the home page re-renders at runtime for the reviews, and a Netlify function is not guaranteed to have `public/` on disk. The import also makes TypeScript check each file against `PortfolioDetails`, the same guarantee `partners.json` has.
- **`featured: true`** puts a project on the home row; `order` sorts both the row and the index.
- **A cover can be a derived copy.** When the best screen carries something that must not be public, keep the original gitignored and publish an edited copy named `<n>-cover.png`. `kz/7-cover.png` is `kz/7.png` with the sidebar footer painted over in the sidebar color, removing the signed-in user's name and email and the Next.js dev badge.
- **Only images listed in `images` are rendered, but every committed file in the folder is served.** The repository is public and Netlify deploys the whole of `public/`. A screenshot that shows real personal data must never be committed, not merely left out of the JSON.
- The copy follows the site rules: American English, no em dashes, and nothing a screenshot or the client brief cannot back.
- Detail pages emit **CreativeWork + BreadcrumbList**; the index emits an **ItemList**.
- **Card covers are never cropped.** The frame is 2.2:1 and the image is `object-contain`, because the covers are desktop captures between 2.1:1 and 2.2:1; a narrower one shows a sliver of `mist` at the sides instead of losing its edges. No hover zoom, since scaling inside `overflow-hidden` crops. Pick covers from landscape screenshots, or the frame will letterbox heavily.

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
- Focus rings use `outline: 2px solid currentColor`, not a fixed colour, because a black ring disappears on the dark sections. On a dark panel that backfires: a light control draws its ring in its own dark text colour, onto dark. Put **`on-ink`** on the panel and every link, button and summary inside it gets the ring repainted `--color-paper`. `.post-cta` solves the same problem for the blog.
- **Verifying a focus ring needs the transition switched off.** Tailwind v4 includes `outline-color` in `transition-colors`, which every button carries. `getComputedStyle(el).outlineColor` read straight after focus returns the frame at t=0 of a 200ms interpolation, which is the old colour, so a working ring reads as broken. Set `el.style.transition = "none"` and force a reflow before reading.
- `.tick-rule` and `.eyebrow` are the recurring structural devices. Numbered markers appear only where the content is genuinely a sequence: the five-step method and the process block on a service page.
- Motion lives in `globals.css`: `animate-rise-in` (hero load), `animate-float`, and `animate-bounce-hint` (the hero read-more control). Both loops opt out of the global reduced-motion reset explicitly, because snapping a loop to its end frame is worse than holding it still.
- The one canvas animation is `Confetti` (`src/components/confetti.tsx`), used on the MVP Feasibility Check panel: white and greys, falling once per page view when a third of the panel is on screen. "Once" is deliberately not remembered between visits, because that would mean writing to localStorage, and the only device storage the privacy policy allows is the cookie-choice entry. It renders nothing at all under reduced motion, and it uses refs rather than state so the effect never calls setState.

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

The site's own CTAs all route to the contact form. The hero used to carry a "Book a 1-hour consultation" button that only pointed at `/contact`; it was removed rather than left pretending. The one real booking link is the Calendly for the vibe-coding consulting session (`calendly.com/guilherme-blackelephant/vibe-coding-consulting`), and it appears only inside the blog post that sells that session, not in site chrome.

**The MVP Feasibility Check takes no payment.** Its button scrolls to the home contact form (`#contact`), and the lead arrives with `source: "home"` like any other, so the automation cannot yet tell a feasibility request apart. The Stripe test link it used before is kept in a comment in `feasibility.ts` in case payment comes back; it would need swapping for a live link first.

**That Calendly event is mis-branded and is a known pending fix.** Its page title is "Vibe coding - consulting - Guilherme Kodenvis", its locale is `pt` and its timezone is `America/Sao_Paulo`. Nothing on it says GuyShore, and it is written for a Portuguese speaker. Any post that is not about vibe coding, and any English-speaking visitor, lands somewhere that does not match the page they came from. Reusing it is a deliberate stopgap: when a properly branded event exists, replace the URL in every `PostCta` that carries it.

## Stale content

The site pivoted from a nearshore-staffing premise to the current one. The `/about` page body still carries the old framing and needs rewriting. The three old blog posts about distributed teams were deleted; the blog restarted with `vibe-coding.mdx`.
