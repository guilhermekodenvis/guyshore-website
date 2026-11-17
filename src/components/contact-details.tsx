import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Name, address, phone and email, rendered from `site` and never re-typed.
 *
 * Every surface that shows contact details uses this component, so the three
 * strings that external listings are matched against cannot drift between the
 * footer, the contact page and the service pages. The machine-readable copy
 * of the same facts is the Organization node in `home-schema.ts`.
 */
export function ContactDetails({
  lang,
  tone = "light",
}: {
  lang: Locale;
  /** `inverse` is for the dark footer. */
  tone?: "light" | "inverse";
}) {
  const t = getDictionary(lang).contactDetails;
  const label = tone === "inverse" ? "text-paper/50" : "text-slate";
  const body = tone === "inverse" ? "text-paper/80" : "text-steel";
  const strong = tone === "inverse" ? "text-paper" : "text-ink";
  const link =
    tone === "inverse"
      ? "text-paper/80 transition-colors hover:text-paper"
      : "text-steel transition-colors hover:text-ink";

  return (
    <div>
      <p className={`font-body font-semibold tracking-[-0.01em] ${strong}`}>
        {site.listingName}
      </p>

      <address className={`mt-3 not-italic ${body}`}>
        {site.address.street}
        <br />
        {site.address.postalCode} {site.address.city}
        <br />
        {site.address.country}
      </address>

      <dl className="mt-5 space-y-2">
        <div className="flex gap-3">
          <dt className={`eyebrow w-14 shrink-0 pt-[0.2em] ${label}`}>{t.phone}</dt>
          <dd>
            <a href={`tel:${site.phone.e164}`} className={link}>
              {site.phone.display}
            </a>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className={`eyebrow w-14 shrink-0 pt-[0.2em] ${label}`}>{t.email}</dt>
          <dd>
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
