"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { getDictionary } from "@/lib/dictionary";
import { localePath, splitPath } from "@/lib/i18n";

/**
 * A not-found page receives no route params, so the language comes from the
 * path: anything under `/pt` is Portuguese.
 */
export default function NotFound() {
  const { lang } = splitPath(usePathname());
  const t = getDictionary(lang);

  return (
    <section className="mx-auto max-w-[76rem] px-6 py-32 lg:px-10 lg:py-44">
      <p className="eyebrow text-slate">404</p>
      <h1 className="mt-5 max-w-[16ch] text-title">{t.notFound.title}</h1>
      <p className="mt-7 max-w-[46ch] text-lead text-steel">
        {t.notFound.lead}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href={localePath(lang, "/")}>{t.notFound.backHome}</ButtonLink>
        <ButtonLink href={localePath(lang, "/contact")} variant="ghost">
          {t.common.contactUs}
        </ButtonLink>
      </div>
    </section>
  );
}
