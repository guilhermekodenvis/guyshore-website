import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "inverse";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-6 py-3 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-deep text-paper hover:bg-tide",
  ghost: "border border-[var(--color-line-strong)] text-deep hover:bg-foam",
  inverse: "bg-noon text-deep hover:bg-paper",
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
