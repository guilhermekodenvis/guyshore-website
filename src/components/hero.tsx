import { ButtonLink } from "@/components/button-link";
import { BlocksIcon, LaunchIcon, SparkIcon } from "@/components/icons";

const STAGES = [
  {
    label: "You dream",
    Icon: SparkIcon,
    // Tucked outside the panel edge on large screens so the tags read as
    // floating; kept inside the frame on mobile to avoid overflow.
    position: "top-[7%] left-0 lg:-left-9",
    delay: "0s",
  },
  {
    label: "We build",
    Icon: BlocksIcon,
    position: "top-[45%] right-0 lg:-right-7",
    delay: "1.4s",
  },
  {
    label: "You launch",
    Icon: LaunchIcon,
    position: "bottom-[8%] left-[6%] lg:left-[2%]",
    delay: "2.8s",
  },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-[76rem] px-6 pt-14 pb-20 lg:px-10 lg:pt-20 lg:pb-24">
      <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow animate-rise-in text-surf">
            From scratch to production
          </p>

          <h1 className="animate-rise-in mt-6 text-title">
            Software Development Company for Non-Technical Founders &amp;
            StartUps
          </h1>

          <p className="animate-rise-in mt-8 max-w-[56ch] text-lead text-tide">
            Web apps, SaaS platforms, and mobile products built from scratch, or
            taken from a stalled Lovable, Bolt, Codex, Claude Code, Cursor, or
            Replit prototype to production-ready software.
          </p>

          <div className="animate-rise-in mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Book a 1-hour consultation
            </ButtonLink>
          </div>
        </div>

        <div className="animate-rise-in relative">
          {/*
            Image slot. Drop the real asset in here and delete the decorative
            fill below:
              <Image src="/hero.jpg" alt="" fill className="object-cover" priority />
          */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-deep sm:aspect-[4/5]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 25% 15%, #2e6e7e 0%, transparent 55%), radial-gradient(100% 80% at 85% 90%, #12495a 0%, transparent 60%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #e7edee 0 1px, transparent 1px 44px), repeating-linear-gradient(to bottom, #e7edee 0 1px, transparent 1px 44px)",
              }}
            />
          </div>

          {STAGES.map(({ label, Icon, position, delay }) => (
            <span
              key={label}
              className={`animate-float absolute ${position} flex items-center gap-2.5 rounded-[2px] border border-[var(--color-line)] bg-paper px-4 py-2.5 shadow-[0_8px_28px_-12px_rgba(8,37,46,0.55)]`}
              style={{ animationDelay: delay }}
            >
              <Icon className="size-[18px] shrink-0 text-noon" />
              <span className="font-display text-sm font-semibold tracking-[-0.01em] whitespace-nowrap">
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
