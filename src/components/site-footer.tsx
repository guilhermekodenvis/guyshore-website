import Image from "next/image";
import Link from "next/link";
import { ContactDetails } from "@/components/contact-details";
import { legalNav, nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-[76rem] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              {/* The mark is black; on the dark footer a filter repaints it
                  white. Filters, unlike blend modes, do not depend on the
                  surrounding stacking context. */}
              <Image
                src="/logo-mark.png"
                alt=""
                width={48}
                height={48}
                className="size-12 shrink-0 brightness-0 invert"
              />
              <p className="font-display text-2xl font-bold tracking-[-0.03em] lowercase">
                {site.wordmark}
              </p>
            </div>
            <p className="mt-4 max-w-sm text-paper/70">{site.tagline}</p>
          </div>

          <div>
            <p className="eyebrow text-paper/50">Site</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-paper/80 transition-colors hover:text-paper"
                >
                  Services
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-paper/80 transition-colors hover:text-paper"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/50">Office</p>
            <div className="mt-5">
              <ContactDetails tone="inverse" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-8 font-label text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
