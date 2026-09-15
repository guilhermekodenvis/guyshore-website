import { site } from "@/lib/site";

/**
 * The company's Google rating, review count and written reviews, read from
 * the Places API (New). Server-only: it reads the API key.
 *
 * What Google returns, and what that means for "latest": at most five
 * reviews, chosen by Google's relevance ranking. There is no parameter to ask
 * for the newest. They are sorted newest first here, so while the profile has
 * five reviews or fewer this is exactly the latest ones; past that it is the
 * five Google picks, newest first. The section says so, because Google
 * requires the ordering to be disclosed. Getting truly the latest five needs
 * the Business Profile API, which requires Google's approval.
 *
 * Reviewer photos. Google requires each review to show its author's avatar,
 * and that avatar is an image on Google's servers. The browser never fetches
 * it from Google: `avatar` points at `/api/google-avatar`, which streams the
 * image through this site without storing it, so the privacy policy's promise
 * of no third-party requests still holds and nothing is cached.
 *
 * Why nothing is cached, anywhere. The Google Maps Platform terms allow
 * storing only the Place ID indefinitely. Ratings, counts and reviews may not
 * be kept for any length of time, so this runs per request behind
 * `/api/google-rating` with `cache: "no-store"`, and the home page stays
 * static because the section asks for it from the browser.
 *
 * What that costs: asking for `reviews` bills each call as Place Details
 * Enterprise + Atmosphere. 1,000 a month are free per billing account, then
 * USD 25 per 1,000 (price list of September 2026). The key carries a daily
 * quota cap in Google Cloud.
 *
 * Environment, neither of them public:
 * - `GOOGLE_PLACES_API_KEY`: a server key restricted to Places API (New).
 * - `REVIEWS_PREVIEW=1`: development only, returns labelled sample data.
 *
 * Returns null whenever there is nothing honest to show: no key, no Place ID,
 * an API error, or a profile with zero reviews.
 */

export type GoogleReview = {
  author: string;
  /** The reviewer's Google Maps profile. */
  authorUrl: string | null;
  /** Same-origin proxy path for the reviewer's avatar, or null. */
  avatar: string | null;
  rating: number;
  text: string;
  /** True when Google translated the review into English for display. */
  translated: boolean;
  /** Google's own phrasing, e.g. "2 months ago". */
  relativeTime: string;
  /** The review itself on Google Maps. Required by Google's rules. */
  reviewUrl: string | null;
};

export type GoogleRating = {
  rating: number;
  count: number;
  /** The listing on Google Maps, where every review can be read. */
  mapsUrl: string;
  /** Newest first. Only reviews with written text. */
  reviews: GoogleReview[];
  /** True only for the development sample. */
  preview: boolean;
};

const FIELD_MASK = "rating,userRatingCount,googleMapsUri,reviews";

type LocalizedText = { text?: string; languageCode?: string };

type PlacesReview = {
  rating?: number;
  text?: LocalizedText;
  originalText?: LocalizedText;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

const PREVIEW: GoogleRating = {
  rating: 4.8,
  count: 12,
  mapsUrl: "https://www.google.com/maps",
  preview: true,
  reviews: [1, 2, 3, 4, 5].map((n) => ({
    author: `Sample reviewer ${n}`,
    authorUrl: null,
    avatar: null,
    rating: n === 4 ? 4 : 5,
    text: "Sample text for the layout preview only. Real reviews from the Google profile replace these cards when the API key is set.",
    translated: n === 2,
    relativeTime: `${n} weeks ago`,
    reviewUrl: null,
  })),
};

/** The avatar route only proxies Google's own image hosts. Keep in step. */
export function isGoogleImageHost(hostname: string): boolean {
  return (
    hostname === "googleusercontent.com" ||
    hostname.endsWith(".googleusercontent.com")
  );
}

function proxiedAvatar(photoUri: string | undefined): string | null {
  if (!photoUri) return null;
  try {
    const url = new URL(photoUri);
    if (url.protocol !== "https:" || !isGoogleImageHost(url.hostname)) return null;
    return `/api/google-avatar?u=${encodeURIComponent(url.toString())}`;
  } catch {
    return null;
  }
}

export async function getGoogleRating(): Promise<GoogleRating | null> {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.REVIEWS_PREVIEW === "1"
  ) {
    return PREVIEW;
  }

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = site.googlePlaceId;
  if (!key || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
      {
        headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": FIELD_MASK },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      // The status only. Never the request, which carries the key.
      console.error(`[reviews] Places API responded ${response.status}`);
      return null;
    }

    const data = (await response.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: PlacesReview[];
    };
    const count = data.userRatingCount ?? 0;
    if (count === 0 || typeof data.rating !== "number") return null;

    const reviews = (data.reviews ?? [])
      .filter((review) => review.text?.text && review.authorAttribution?.displayName)
      .sort((a, b) => (b.publishTime ?? "").localeCompare(a.publishTime ?? ""))
      .slice(0, 5)
      .map((review) => ({
        author: review.authorAttribution?.displayName ?? "",
        authorUrl: review.authorAttribution?.uri ?? null,
        avatar: proxiedAvatar(review.authorAttribution?.photoUri),
        rating: review.rating ?? 0,
        text: review.text?.text ?? "",
        translated:
          Boolean(review.originalText?.languageCode) &&
          review.originalText?.languageCode !== review.text?.languageCode,
        relativeTime: review.relativePublishTimeDescription ?? "",
        reviewUrl: review.googleMapsUri ?? null,
      }));

    return {
      rating: data.rating,
      count,
      mapsUrl:
        data.googleMapsUri ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.listingName)}&query_place_id=${encodeURIComponent(placeId)}`,
      reviews,
      preview: false,
    };
  } catch (error) {
    console.error("[reviews] Places API request failed", error);
    return null;
  }
}
