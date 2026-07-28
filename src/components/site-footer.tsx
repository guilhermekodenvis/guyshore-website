import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-deep text-paper">
      <div className="mx-auto max-w-[76rem] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-[-0.045em] uppercase">
              {site.name}
            </p>
            <p className="mt-4 max-w-sm text-paper/70">{site.tagline}</p>
          </div>

          <div>
            <p className="eyebrow text-paper/50">Site</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-paper/80 transition-colors hover:text-noon"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-paper/80 transition-colors hover:text-noon"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/50">Get in touch</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-paper/80 transition-colors hover:text-noon"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <p className="eyebrow mt-8 text-paper/50">Office</p>
            <address className="mt-5 text-paper/80 not-italic">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/15 pt-8 font-mono text-xs text-paper/50">
          © {new Date().getFullYear()} {site.name}
        </div>
      </div>
    </footer>
  );
}
