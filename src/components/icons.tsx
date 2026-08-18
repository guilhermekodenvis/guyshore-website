/**
 * Inline SVG only. These are small enough that a sprite or an icon package
 * would cost more than it saves, and inlining keeps them in the initial HTML
 * with no extra request.
 *
 * Everything here draws in `currentColor`, so color comes from the element
 * that holds the icon rather than from the icon itself.
 */

type IconProps = { className?: string };

/** Sits inside links that lead somewhere further in. */
export function ArrowRight({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3.5 10h12" />
      <path d="M10.5 5l5 5-5 5" />
    </svg>
  );
}

/** Leaves the site. Conventional mark for an external destination. */
export function ArrowUpRight({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5.25 10.75 10.75 5.25" />
      <path d="M5.75 5.25h5v5" />
    </svg>
  );
}

/** Solid glyph, so it takes the brand color from the button around it. */
export function LinkedInMark({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** Replaces the list bullet on deliverables. */
export function CheckMark({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

/** Only used by the header dropdown toggle. */
export function ChevronDown({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}
