"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@/components/icons";

/**
 * In-article button: a link styled as a button, for navigation inside the
 * site (an anchor on the page, or the contact page). Unlike `PostCta` it opens
 * in the same tab. An optional `note` sits under it.
 *
 * A click sends `click_cta_blog` to the Google tag with the article slug and
 * the button's position, and nothing personal. Until the visitor accepts
 * cookies the tag only sends cookieless pings, as the privacy policy says.
 * Leads are counted separately (`generate_lead`), only when the contact form
 * confirms a send.
 */
export function PostButton({
  href,
  label,
  note,
  position = "inline",
  variant = "primary",
}: {
  href: string;
  label: string;
  note?: string;
  /** Where the button sits in the article, e.g. "intro" or "end". */
  position?: string;
  variant?: "primary" | "ghost";
}) {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  const style =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-steel"
      : "border border-[var(--color-line-strong)] text-ink hover:bg-mist";

  return (
    <div className="post-button not-prose my-10">
      <Link
        href={href}
        onClick={() =>
          window.gtag?.("event", "click_cta_blog", {
            article_slug: slug,
            cta_position: position,
          })
        }
        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] no-underline transition-colors ${style}`}
      >
        {label}
        <ArrowRight className="size-4 shrink-0" />
      </Link>
      {note ? <p className="mt-3 text-[0.9375rem] text-slate">{note}</p> : null}
    </div>
  );
}
