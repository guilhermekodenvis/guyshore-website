import { ButtonLink } from "@/components/button-link";
import { BlocksIcon, LaunchIcon, SparkIcon } from "@/components/icons";

const STAGES = [
  {
    label: "You dream",
    Icon: SparkIcon,
    // Parked around the centred copy. Hidden below lg, where a full-screen
    // hero leaves no room beside the text.
    position: "top-[20%] left-[7%]",
    delay: "0s",
  },
  {
    label: "We build",
    Icon: BlocksIcon,
    position: "top-[46%] right-[8%]",
    delay: "1.4s",
  },
  {
    label: "You launch",
    Icon: LaunchIcon,
    position: "bottom-[19%] left-[15%]",
    delay: "2.8s",
  },
];

export function Hero() {
  return (
    // The header is 4.5rem and sits in flow above this, so subtracting it
    // makes hero + header exactly one screen tall. dvh rather than vh so the
    // mobile address bar does not push the bottom out of view.
    <section className="relative flex min-h-[calc(100dvh-4.5rem)] w-full items-center overflow-hidden bg-deep">
      {/*
        Image slot, now full-bleed. Drop the real asset in here and delete the
        two decorative fills below:
          <Image src="/hero.jpg" alt="" fill className="object-cover" priority />
      */}
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

      {STAGES.map(({ label, Icon, position, delay }) => (
        <span
          key={label}
          className={`animate-float absolute ${position} hidden items-center gap-2.5 rounded-[2px] border border-[var(--color-line)] bg-paper px-4 py-2.5 shadow-[0_8px_28px_-12px_rgba(8,37,46,0.55)] lg:flex`}
          style={{ animationDelay: delay }}
        >
          <Icon className="size-[18px] shrink-0 text-noon" />
          <span className="font-display text-sm font-semibold tracking-[-0.01em] whitespace-nowrap">
            {label}
          </span>
        </span>
      ))}

      <div className="relative mx-auto w-full max-w-[76rem] px-6 py-24 text-center lg:px-10">
        <p className="eyebrow animate-rise-in text-aqua">
          From scratch to production
        </p>

        <h1 className="animate-rise-in mx-auto mt-6 max-w-[15ch] text-display text-paper">
          Your MVP, finally finished
        </h1>

        <p className="animate-rise-in mx-auto mt-8 max-w-[58ch] text-lead text-paper/75">
          Web apps, SaaS platforms, and mobile products built from scratch, or
          taken from a stalled Lovable, Bolt, Codex, Claude Code, Cursor, or
          Replit prototype to production-ready software.
        </p>

        <div className="animate-rise-in mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact" variant="inverse">
            Contact us
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost-inverse">
            Book a 1-hour consultation
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
