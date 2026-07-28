"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[76rem] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-[-0.045em] uppercase"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`eyebrow transition-colors hover:text-deep ${
                  active ? "text-deep" : "text-tide"
                }`}
              >
                <span
                  className={
                    active
                      ? "border-b-2 border-noon pb-1"
                      : "border-b-2 border-transparent pb-1"
                  }
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-[2px] bg-deep px-5 py-2.5 font-display text-sm font-semibold text-paper transition-colors hover:bg-tide"
          >
            Book a call
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="eyebrow text-tide md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--color-line)] bg-paper px-6 pb-6 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block border-b border-[var(--color-line)] py-4 font-display text-lg font-semibold tracking-[-0.02em]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-6 block rounded-[2px] bg-deep px-5 py-3.5 text-center font-display font-semibold text-paper"
          >
            Book a call
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
