import Image from "next/image";
import { partners } from "@/lib/partners";

/**
 * Partner row. Sits where the marquee and the stats band used to be.
 *
 * The links are deliberately not `nofollow`: the partnership offers a real
 * backlink, and `rel="noreferrer"` alone does not stop a link being followed.
 */
export function Partners() {
  return (
    <section className="border-b border-[var(--color-line)] bg-mist">
      <div className="mx-auto max-w-[76rem] px-6 py-16 lg:px-10 lg:py-20">
        <p className="eyebrow text-center text-slate">Our partners</p>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10 lg:gap-x-24">
          {partners.map((partner) => (
            <li key={partner.href}>
              <a
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="block opacity-80 transition-opacity duration-200 hover:opacity-100"
              >
                {/* No sizing classes. A Tailwind w-auto on a replaced element
                    that has not loaded yet resolves to 0, which collapses the
                    box, which stops the lazy-load observer from ever firing.
                    The width and height props do the sizing. */}
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
