import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { getDictionary } from "@/lib/dictionary";
import { alternates, resolveLang } from "@/lib/i18n";
import { getFounder } from "@/lib/team";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await resolveLang(params);
  return {
    title: getDictionary(lang).about.metaTitle,
    // description intentionally omitted: inherits the site description from
    // the root layout, so every page carries the same snippet.
    alternates: alternates(lang, "/about"),
  };
}

export default async function AboutPage({ params }: Props) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).about;
  const founder = getFounder(lang);

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <p className="eyebrow text-slate">{t.meetEyebrow}</p>
        <h2 className="mt-5 max-w-[18ch] text-title">{t.meetTitle}</h2>

        <div className="mt-16 max-w-[52ch] border-t border-[var(--color-line)] pt-10">
          <p className="eyebrow text-ink">{founder.role}</p>
          <h3 className="mt-4 text-3xl tracking-[-0.03em]">{founder.name}</h3>
          <p className="mt-6 text-lead text-steel">{founder.bio}</p>
        </div>
      </section>
    </>
  );
}
