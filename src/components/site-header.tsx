"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronDown } from "@/components/icons";
import { NavLens } from "@/components/nav-lens";
import {
  getServerSnapshot as getToneServerSnapshot,
  getSnapshot as getToneSnapshot,
  scheduleNavToneUpdate,
  subscribe as subscribeTone,
} from "@/lib/nav-tone";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "@/lib/scroll-detached";
import { getDictionary } from "@/lib/dictionary";
import {
  htmlLang,
  localePath,
  locales,
  splitPath,
  type Locale,
} from "@/lib/i18n";
import { nav, site } from "@/lib/site";

type Props = {
  lang: Locale;
  /** The home services, already in `lang`, for the dropdown and the menu. */
  services: { slug: string; title: string }[];
  /** Each post's language versions keyed by its public path (posts.ts). */
  posts: Record<string, Partial<Record<Locale, string>>>;
};

export function SiteHeader({ lang, services, posts }: Props) {
  const pathname = usePathname();
  // Language-neutral path. The server sees the rewritten `/en/...` and the
  // browser `/...`; splitPath gives both sides the same answer, so the
  // active states and the switch hydrate without a mismatch.
  const { path } = splitPath(pathname);
  const t = getDictionary(lang);
  const href = (p: string) => localePath(lang, p);
  const shell = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const detached = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const tone = useSyncExternalStore(
    subscribeTone,
    getToneSnapshot,
    getToneServerSnapshot,
  );

  // A client-side navigation swaps the page under the header without a
  // scroll event, so the dark sections have to be measured again. The
  // store does the measuring; this only asks for it.
  useEffect(() => {
    scheduleNavToneUpdate();
  }, [pathname]);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };
  const servicesActive = path.startsWith("/services");

  /**
   * Where the switch sends each language: the same page in that language. A
   * blog post goes to its translation when it has one, otherwise to the
   * other language's blog, since posts are not all translated.
   */
  const switchHref = (target: Locale) => {
    if (path.startsWith("/blog/")) {
      return posts[localePath(lang, path)]?.[target] ?? localePath(target, "/blog");
    }
    return localePath(target, path);
  };

  const languageSwitch = (
    <div
      role="group"
      aria-label={t.nav.language}
      // Each label carries the same 2px transparent border and pb-1 as the
      // nav links, so the letters share their baseline.
      className="eyebrow flex items-center gap-1 [&_a]:border-b-2 [&_a]:border-transparent [&_a]:pb-1 [&_span[aria-current]]:border-b-2 [&_span[aria-current]]:border-transparent [&_span[aria-current]]:pb-1"
    >
      {locales.map((l, index) => (
        <span key={l} className="flex items-center gap-1">
          {index > 0 ? (
            <span
              aria-hidden
              className="pb-1.5 text-slate group-data-[tone=dark]:text-paper/50"
            >
              /
            </span>
          ) : null}
          {l === lang ? (
            <span
              aria-current="true"
              className="flex min-h-11 items-center px-1 text-ink group-data-[tone=dark]:text-paper"
            >
              {l.toUpperCase()}
            </span>
          ) : (
            // A full page load on purpose: <html lang>, the metadata and
            // every string change with the language.
            <a
              href={switchHref(l)}
              hrefLang={htmlLang[l]}
              lang={htmlLang[l]}
              title={t.nav.switchTo}
              aria-label={t.nav.switchTo}
              className="flex min-h-11 items-center px-1 text-slate transition-colors hover:text-ink group-data-[tone=dark]:text-paper/60 group-data-[tone=dark]:hover:text-paper"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );

  return (
    /* The header keeps a fixed 4.5rem layout box so the hero's
       `100dvh - 4.5rem` still holds. The visible bar is the absolutely
       positioned shell inside it, which is what morphs into the island once
       the page scrolls (`.nav-shell` in globals.css). The box itself is
       transparent and lets pointer events through, otherwise the empty space
       around the island would swallow clicks on the content beneath it. */
    <header className="pointer-events-none sticky top-0 z-50 h-[4.5rem]">
      {/* `group` is what the tone variants below hang off. With the mobile
          menu open the island is a tall panel of chrome, so it stays light
          whatever is behind it. */}
      <div
        ref={shell}
        className="group nav-shell pointer-events-auto"
        data-detached={detached}
        data-open={open}
        data-tone={open ? "light" : tone}
      >
        {/* The material lives on a child, not on the shell: an element with
            backdrop-filter is the backdrop root for everything inside it, so
            the services dropdown hanging below the bar would sample the
            shell's own surface instead of the page and its blur would do
            nothing (`.nav-glass` in globals.css). */}
        <div className="nav-glass" aria-hidden="true" />
        {/* The sheens and the dark ring live on this layer's pseudo-elements
            so the glass layer keeps one job (see globals.css). */}
        <div className="nav-sheen" aria-hidden="true" />
        <NavLens shell={shell} />
        <div className="nav-row mx-auto flex max-w-[76rem] items-center justify-between">
          {/* Wordmark and links share the left; the call to action stands alone
              on the right. */}
          <div className="flex items-center gap-6 md:gap-5 lg:gap-10">
            <Link href={href("/")} className="flex items-center gap-2.5">
              <Image
                src="/logo-mark.png"
                alt=""
                width={40}
                height={40}
                priority
                className="nav-mark shrink-0 transition-[filter] duration-300 group-data-[tone=dark]:brightness-0 group-data-[tone=dark]:invert"
              />
              <span className="font-display text-xl font-bold tracking-[-0.03em] lowercase transition-colors duration-300 group-data-[tone=dark]:text-paper">
                {site.wordmark}
              </span>
            </Link>

            <nav className="hidden items-center gap-5 md:flex lg:gap-9">
              {/* Hover opens it for pointers; the button keeps it reachable by
                  keyboard and touch. Escape closes without an effect. */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setServicesOpen(false);
                }}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((value) => !value)}
                  className={`eyebrow flex items-center gap-1.5 transition-colors hover:text-ink group-data-[tone=dark]:hover:text-paper ${
                    servicesActive
                      ? "text-ink group-data-[tone=dark]:text-paper"
                      : "text-steel group-data-[detached=true]:text-ink group-data-[tone=dark]:text-paper/80"
                  }`}
                >
                  <span
                    className={
                      servicesActive
                        ? "border-b-2 border-ink pb-1 group-data-[tone=dark]:border-paper"
                        : "border-b-2 border-transparent pb-1"
                    }
                  >
                    {t.nav.services}
                  </span>
                  <ChevronDown
                    className={`mb-1.5 size-3.5 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {servicesOpen ? (
                  <div className="absolute top-full left-0 pt-4">
                    {/* The same material as the island, one level down. It
                        hangs below the bar over page content rather than on
                        top of another translucent surface. */}
                    <div className="glass-panel w-[20rem] p-2">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={href(`/services/${service.slug}`)}
                          onClick={closeMenu}
                          className="block px-4 py-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-steel transition-colors hover:bg-ink/6 hover:text-ink"
                        >
                          {service.title}
                        </Link>
                      ))}
                      <Link
                        href={href("/services")}
                        onClick={closeMenu}
                        className="mt-2 flex items-center justify-between gap-2 border-t border-[var(--color-line)] px-4 pt-4 pb-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-steel"
                      >
                        {t.nav.viewAllServices}
                        <ArrowRight className="size-5 shrink-0" />
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Every item is a flex box around a span with pb-1 and a 2px
                  border, the same as the Services button. As an inline span
                  that padding does not count toward the line box, so these
                  links came out 6px shorter and Services, centred in the
                  row, sat 3px higher. The chevron's mb-1.5 re-centres it on
                  the text rather than on the text plus its underline gap. */}
              {nav.map((item) => {
                const active = path.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={href(item.href)}
                    className={`eyebrow flex items-center transition-colors hover:text-ink group-data-[tone=dark]:hover:text-paper ${
                      active
                        ? "text-ink group-data-[tone=dark]:text-paper"
                        : "text-steel group-data-[detached=true]:text-ink group-data-[tone=dark]:text-paper/80"
                    }`}
                  >
                    <span
                      className={
                        active
                          ? "border-b-2 border-ink pb-1 group-data-[tone=dark]:border-paper"
                          : "border-b-2 border-transparent pb-1"
                      }
                    >
                      {t.nav[item.key]}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* The language switch is the one control on every screen size;
              the call to action and the menu button share the right side
              with it. */}
          <div className="flex items-center gap-3 md:ml-4 lg:ml-0 lg:gap-6">
          {languageSwitch}

          {/* The global ring is currentColor, which on this paper-on-ink pill
              is white drawn on the light island: 1.00:1 on the attached bar,
              1.76:1 over an ink section. Ink clears 3:1 in both states. */}
          <Link
            href={href("/contact")}
            className="hidden rounded-full bg-ink px-4 py-2 font-body whitespace-nowrap lg:px-5 text-sm font-semibold text-paper transition-colors hover:bg-steel focus-visible:outline-ink group-data-[tone=dark]:bg-paper group-data-[tone=dark]:text-ink group-data-[tone=dark]:hover:bg-mist group-data-[tone=dark]:focus-visible:outline-paper md:inline-flex"
          >
            {t.common.contactUs}
          </Link>

          {/* The only control in the phone header besides the language switch; 44px tall to match the
              island it sits in. The negative margin cancels the padding so
              the label stays flush with the row's right edge. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="eyebrow -mr-3 flex min-h-11 items-center px-3 text-steel transition-colors group-data-[detached=true]:text-ink group-data-[tone=dark]:text-paper/80 md:hidden"
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="nav-mobile border-t border-[var(--color-line)] md:hidden"
          >
            {/* Services are listed flat rather than behind a second toggle: on a
                phone an extra tap to reveal four links is not worth it. */}
            <p className="eyebrow pt-5 pb-1 text-steel">{t.nav.services}</p>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={href(`/services/${service.slug}`)}
                onClick={closeMenu}
                className="block border-b border-[var(--color-line)] py-3 font-body text-steel"
              >
                {service.title}
              </Link>
            ))}
            <Link
              href={href("/services")}
              onClick={closeMenu}
              className="flex items-center gap-2 border-b border-[var(--color-line)] py-4 font-body text-lg font-semibold tracking-[-0.02em]"
            >
              {t.nav.viewAllServices}
              <ArrowRight className="size-5 shrink-0" />
            </Link>

            {nav.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                onClick={closeMenu}
                className="block border-b border-[var(--color-line)] py-4 font-body text-lg font-semibold tracking-[-0.02em]"
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <Link
              href={href("/contact")}
              onClick={closeMenu}
              className="mt-6 block rounded-full bg-ink px-5 py-3 text-center font-body font-semibold text-paper focus-visible:outline-ink"
            >
              {t.common.contactUs}
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
