import { getGoogleRating } from "@/lib/google-reviews";

/**
 * The live Google rating and review count, for the client reviews section.
 *
 * Dynamic and uncacheable on purpose: the Google Maps Platform terms forbid
 * keeping this data for any length of time, so it is fetched fresh on every
 * call and the response tells every cache, Netlify's CDN included, not to
 * store it. See getGoogleRating for the reasoning and the cost.
 *
 * 204 means there is nothing to show, and the section renders nothing.
 */
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store, max-age=0" };

export async function GET(): Promise<Response> {
  const rating = await getGoogleRating();

  if (!rating) {
    return new Response(null, { status: 204, headers: NO_STORE });
  }

  return Response.json(rating, { headers: NO_STORE });
}
