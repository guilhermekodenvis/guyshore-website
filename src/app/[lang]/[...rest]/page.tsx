import { notFound } from "next/navigation";

/**
 * Any path that matches no page, in either language, lands here and renders
 * `[lang]/not-found.tsx` inside the site layout. Without it an unknown URL
 * would fall through to Next's bare default 404, because the root layout is
 * the one under `[lang]`.
 */
export default function CatchAll() {
  notFound();
}
