"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { ArrowUpRight } from "@/components/icons";
import type { GoogleRating, GoogleReview } from "@/lib/google-reviews";

/**
 * The Google rating, the review count and up to five written reviews, live.
 *
 * A client component because none of it may be cached (see getGoogleRating):
 * asking for it from the browser keeps the home page a static file. The
 * browser only ever talks to this site, including for reviewer avatars.
 *
 * Renders nothing until real data arrives, so the page never shows "0
 * reviews". It sits far below the first screen, so appearing after load does
 * not shift anything the visitor is looking at.
 *
 * Google's display rules, all followed here:
 * - each review shows the author's avatar, name linked to their profile, and
 *   a link to the review itself on Google Maps;
 * - the page says how the reviews are chosen and ordered;
 * - the attribution reads exactly "Google Maps", unwrapped and untranslated,
 *   weight 400, 12 to 16px, in #1F1F1F or #5E5E5E (the site's `slate` is not
 *   an allowed color), inside a container set apart from the page.
 */
export function GoogleReviews() {
  const [data, setData] = useState<GoogleRating | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/google-rating", { cache: "no-store", signal: controller.signal })
      .then((response) => (response.status === 200 ? response.json() : null))
      .then((body: GoogleRating | null) => {
        if (body && body.count > 0) setData(body);
      })
      .catch(() => {
        // Aborted on unmount, or offline: showing nothing is the right answer.
      });

    return () => controller.abort();
  }, []);

  if (!data) return null;

  const label = data.count === 1 ? "review" : "reviews";

  return (
    <section className="border-t border-[var(--color-line)] bg-mist">
      <div className="mx-auto max-w-[76rem] px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-10">
          <div>
            <p className="eyebrow text-slate">Client reviews</p>
            <h2 className="mt-5 max-w-[20ch] text-title">
              Rated by our clients on Google.
            </h2>
          </div>

          <a
            href={data.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <span className="flex items-baseline gap-4">
              <span className="font-display text-6xl tracking-[-0.04em] text-ink">
                {data.rating.toFixed(1)}
              </span>
              <Stars rating={data.rating} className="h-6" />
            </span>
            <span className="mt-2 flex items-center gap-1.5 text-steel transition-colors group-hover:text-ink">
              {data.count} {label}
              <span className="sr-only">, opens Google Maps in a new tab</span>
              <ArrowUpRight className="size-4 shrink-0" />
            </span>
          </a>
        </div>

        {data.preview ? (
          <p className="mt-10 border border-dashed border-[var(--color-line-strong)] px-4 py-3 font-label text-sm text-steel">
            Development preview with sample data. It never renders in a
            production build.
          </p>
        ) : null}

        {data.reviews.length > 0 ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.reviews.map((review, index) => (
              <ReviewCard key={`${review.author}-${index}`} review={review} />
            ))}
          </ul>
        ) : null}

        <div className="mt-12 flex justify-center">
          <ButtonLink
            href={data.mapsUrl}
            variant="ghost"
            target="_blank"
            rel="noreferrer"
          >
            See all reviews
            <span className="sr-only">on Google Maps (opens in a new tab)</span>
            <ArrowUpRight className="size-4 shrink-0" />
          </ButtonLink>
        </div>

        <p className="mt-10 border-t border-[var(--color-line)] pt-6 text-sm font-normal text-[#5E5E5E]">
          Rating and reviews from{" "}
          <span translate="no" className="whitespace-nowrap">
            Google Maps
          </span>
          . Google selects up to five reviews by relevance, shown here newest
          first. Reviews are not verified by Google or by us.
        </p>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <li className="flex h-full flex-col border border-[var(--color-line)] bg-paper p-7">
      <div className="flex items-center gap-3">
        <Avatar review={review} />
        <div className="min-w-0">
          <p className="truncate font-body font-semibold tracking-[-0.01em] text-ink">
            {review.authorUrl ? (
              <a
                href={review.authorUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-steel"
              >
                {review.author}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              review.author
            )}
          </p>
          <p className="text-sm text-slate">
            {review.relativeTime}
            {review.translated ? " · Translated by Google" : null}
          </p>
        </div>
      </div>

      <Stars rating={review.rating} className="mt-5 h-4" />

      <blockquote className="mt-4 flex-1 text-steel">
        <p className="line-clamp-6">{review.text}</p>
      </blockquote>

      {review.reviewUrl ? (
        <a
          href={review.reviewUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 self-start border-t border-[var(--color-line)] pt-5 font-body text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-steel"
        >
          Read on Google Maps
          <span className="sr-only">: review by {review.author} (opens in a new tab)</span>
          <ArrowUpRight className="size-4 shrink-0" />
        </a>
      ) : null}
    </li>
  );
}

/**
 * The initial sits behind the photo, so if the proxy cannot fetch it the card
 * still shows something in the avatar's place.
 */
function Avatar({ review }: { review: GoogleReview }) {
  return (
    <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-line)] font-body text-sm font-semibold text-steel">
      <span aria-hidden>{review.author.charAt(0).toUpperCase()}</span>
      {review.avatar ? (
        // A plain <img>, not next/image: the optimizer would store the file,
        // and Places content may not be cached. The name beside it is the
        // text alternative.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={review.avatar}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
          className="absolute inset-0 size-full object-cover"
        />
      ) : null}
    </span>
  );
}

/**
 * Five stars with the filled share clipped to the rating, so 4.6 shows four
 * and most of a fifth rather than rounding. The label carries the value for
 * assistive tech; the drawing is decoration.
 */
function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  const share = Math.max(0, Math.min(1, rating / 5)) * 100;

  return (
    <span
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      className={`relative inline-flex self-start ${className}`}
    >
      <StarRow className="h-full text-[var(--color-line-strong)]" />
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${share}%` }}
      >
        <StarRow className="h-full text-ink" />
      </span>
    </span>
  );
}

function StarRow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 24"
      fill="currentColor"
      className={`w-auto max-w-none ${className}`}
    >
      {[0, 24, 48, 72, 96].map((x) => (
        <path
          key={x}
          transform={`translate(${x} 0)`}
          d="M12 1.8l3.1 6.4 7 1-5.1 4.9 1.2 7-6.2-3.3-6.2 3.3 1.2-7L1.9 9.2l7-1z"
        />
      ))}
    </svg>
  );
}
