"use client";

import Image from "next/image";
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
