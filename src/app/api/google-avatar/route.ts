import { isGoogleImageHost } from "@/lib/google-reviews";

/**
 * Streams a Google reviewer's avatar through this site.
 *
 * Google requires written reviews to show the author's avatar, and the avatar
 * lives on Google's image hosts. Loading it straight from there would put a
 * Google request in every visitor's browser. Passing it through here keeps the
 * browser on this origin, and nothing is stored: the image is held in memory
 * for the length of one response and marked no-store, because the Maps terms
 * forbid caching Places content.
 *
 * Not an open proxy: only https URLs on googleusercontent.com hosts are
 * fetched, including after redirects, only image responses are relayed, and
 * anything larger than an avatar is refused.
 */
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store, max-age=0" };
const MAX_BYTES = 256 * 1024;

const refuse = (status: number) =>
  new Response(null, { status, headers: NO_STORE });

const allowed = (url: URL) =>
  url.protocol === "https:" && isGoogleImageHost(url.hostname);

export async function GET(request: Request): Promise<Response> {
  const raw = new URL(request.url).searchParams.get("u");

  let target: URL;
  try {
    target = new URL(raw ?? "");
  } catch {
    return refuse(400);
  }
  if (!allowed(target)) return refuse(400);

  try {
    const upstream = await fetch(target, {
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
    });

    const type = upstream.headers.get("content-type") ?? "";
    if (!upstream.ok || !type.startsWith("image/") || !allowed(new URL(upstream.url))) {
      return refuse(502);
    }
    if (Number(upstream.headers.get("content-length") ?? 0) > MAX_BYTES) {
      return refuse(502);
    }

    const body = await upstream.arrayBuffer();
    if (body.byteLength > MAX_BYTES) return refuse(502);

    return new Response(body, {
      headers: {
        ...NO_STORE,
        "Content-Type": type,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return refuse(502);
  }
}
