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
import { homeServices } from "@/lib/services";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
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
  const servicesActive = pathname.startsWith("/services");

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
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5">
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

            <nav className="hidden items-center gap-9 md:flex">
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
                    Services
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
                      {homeServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={closeMenu}
                          className="block px-4 py-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-steel transition-colors hover:bg-ink/6 hover:text-ink"
                        >
                          {service.title}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        onClick={closeMenu}
                        className="mt-2 flex items-center justify-between gap-2 border-t border-[var(--color-line)] px-4 pt-4 pb-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-steel"
                      >
                        View all services
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
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
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
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* The global ring is currentColor, which on this paper-on-ink pill
              is white drawn on the light island: 1.00:1 on the attached bar,
              1.76:1 over an ink section. Ink clears 3:1 in both states. */}
          <Link
            href="/contact"
            className="hidden rounded-full bg-ink px-5 py-2 font-body text-sm font-semibold text-paper transition-colors hover:bg-steel focus-visible:outline-ink group-data-[tone=dark]:bg-paper group-data-[tone=dark]:text-ink group-data-[tone=dark]:hover:bg-mist group-data-[tone=dark]:focus-visible:outline-paper md:inline-flex"
          >
            Contact us
          </Link>

          {/* The only control in the phone header; 44px tall to match the
              island it sits in. The negative margin cancels the padding so
              the label stays flush with the row's right edge. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="eyebrow -mr-3 flex min-h-11 items-center px-3 text-steel transition-colors group-data-[detached=true]:text-ink group-data-[tone=dark]:text-paper/80 md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="nav-mobile border-t border-[var(--color-line)] md:hidden"
          >
            {/* Services are listed flat rather than behind a second toggle: on a
                phone an extra tap to reveal four links is not worth it. */}
            <p className="eyebrow pt-5 pb-1 text-steel">Services</p>
            {homeServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onClick={closeMenu}
                className="block border-b border-[var(--color-line)] py-3 font-body text-steel"
              >
                {service.title}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={closeMenu}
              className="flex items-center gap-2 border-b border-[var(--color-line)] py-4 font-body text-lg font-semibold tracking-[-0.02em]"
            >
              View all services
              <ArrowRight className="size-5 shrink-0" />
            </Link>

            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block border-b border-[var(--color-line)] py-4 font-body text-lg font-semibold tracking-[-0.02em]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mt-6 block rounded-full bg-ink px-5 py-3 text-center font-body font-semibold text-paper focus-visible:outline-ink"
            >
              Contact us
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
