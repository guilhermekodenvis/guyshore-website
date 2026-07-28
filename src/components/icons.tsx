type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Idea / the founder's starting point. */
export function SparkIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 13.9 9l5.6 2-5.6 2-1.9 5.5L10.1 13 4.5 11l5.6-2z" />
      <path d="M18.5 3.5v3M20 5h-3" />
    </svg>
  );
}

/** Construction / the work we do. */
export function BlocksIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1" />
      <rect x="8.25" y="3.5" width="7.5" height="7.5" rx="1" />
    </svg>
  );
}

/** Launch / going live. */
export function LaunchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 19 19 5" />
      <path d="M10.5 5H19v8.5" />
      <path d="M4 14.5 6 12M7 20l2.5-2.5" />
    </svg>
  );
}
