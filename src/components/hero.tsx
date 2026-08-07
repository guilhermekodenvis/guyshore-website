import Image from "next/image";
import { ButtonLink } from "@/components/button-link";

/**
 * Shared cap for the headline and the supporting line.
 *
 * Deliberately in rem, not ch: `ch` resolves against each element's own font,
 * so 12ch on an 88px display face is ~686px while 24ch on a 22px body face is
 * ~338px. A fixed value is the only way to make the two blocks match.
 */
const BLOCK = "max-w-[34rem]";

export function Hero() {
  return (
    // flex-1 rather than a height of its own: the wrapper on the home page
    // pairs this with the marquee so the two together fill one screen.
    <section className="flex flex-1 items-center bg-paper">
      {/* No max-width on purpose: the hero runs wider than the rest of the
          page, held off the edges by 40px from lg up.
          Mobile stacks logo, headline, text, buttons and centres them; the
          three-column split only starts at lg. */}
      <div className="grid w-full gap-8 px-6 py-16 text-center lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[auto_auto] lg:gap-x-14 lg:gap-y-8 lg:px-10 lg:text-left">
        <div className="order-1 flex justify-center lg:order-none lg:col-start-2 lg:row-span-2 lg:self-center">
          <Image
            src="/logo-mark.png"
            alt=""
            width={320}
            height={320}
            priority
            className="w-[clamp(10rem,20vw,17rem)] drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          />
        </div>

        <h1
          className={`animate-rise-in order-2 mx-auto ${BLOCK} text-display lg:order-none lg:col-start-1 lg:row-start-1 lg:mx-0 lg:self-end`}
        >
          Your MVP, finally finished
        </h1>

        <p
          className={`animate-rise-in order-3 mx-auto ${BLOCK} text-lead text-steel lg:order-none lg:col-start-3 lg:row-span-2 lg:mr-0 lg:ml-auto lg:self-center`}
        >
          Web apps, SaaS platforms, mobile products or automations built from
          scratch to production-ready software.
        </p>

        <div className="animate-rise-in order-4 flex sm:justify-center lg:order-none lg:col-start-1 lg:row-start-2 lg:justify-start lg:self-start">
          <ButtonLink href="/contact" className="w-full sm:w-auto">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
