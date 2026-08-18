import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "inverse" | "ghost-inverse" | "linkedin";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-steel",
  ghost: "border border-[var(--color-line-strong)] text-ink hover:bg-mist",
  /** Primary action on a dark surface: white plate, dark label. */
  inverse: "bg-paper text-ink hover:bg-mist",
  /** Secondary action sitting on a dark surface. 45% keeps the border above
      the 3:1 contrast floor for non-text elements. */
  "ghost-inverse": "border border-paper/45 text-paper hover:bg-paper/10",
  /** LinkedIn brand blue. #0a66c2 carries white text at 5.1:1, so the label
      clears AA without darkening the brand color. */
  linkedin: "bg-[#0a66c2] text-paper hover:bg-[#004182]",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
