"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "@/components/icons";
import { homeServices } from "@/lib/services";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };
  const servicesActive = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[76rem] items-center justify-between px-6 lg:px-10">
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
              className="size-10 shrink-0"
            />
            <span className="font-display text-xl font-bold tracking-[-0.03em] lowercase">
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
                className={`eyebrow flex items-center gap-1.5 transition-colors hover:text-ink ${
                  servicesActive ? "text-ink" : "text-steel"
                }`}
              >
                <span
                  className={
                    servicesActive
                      ? "border-b-2 border-ink pb-1"
                      : "border-b-2 border-transparent pb-1"
                  }
                >
                  Services
                </span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen ? (
                <div className="absolute top-full left-0 pt-4">
                  <div className="w-[20rem] border border-[var(--color-line-strong)] bg-paper p-2 shadow-[0_18px_40px_rgba(24,24,27,0.10)]">
                    {homeServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={closeMenu}
                        className="block px-4 py-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-steel transition-colors hover:bg-mist hover:text-ink"
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

            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`eyebrow transition-colors hover:text-ink ${
                    active ? "text-ink" : "text-steel"
                  }`}
                >
                  <span
                    className={
                      active
                        ? "border-b-2 border-ink pb-1"
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

        <Link
          href="/contact"
          className="hidden rounded-full bg-ink px-5 py-2 font-body text-sm font-semibold text-paper transition-colors hover:bg-steel md:inline-flex"
        >
          Contact us
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="eyebrow text-steel md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--color-line)] bg-paper px-6 pb-6 md:hidden"
        >
          {/* Services are listed flat rather than behind a second toggle: on a
              phone an extra tap to reveal four links is not worth it. */}
          <p className="eyebrow pt-5 pb-1 text-slate">Services</p>
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
            className="mt-6 block rounded-full bg-ink px-5 py-3 text-center font-body font-semibold text-paper"
          >
            Contact us
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
