import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { founder } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  // description intentionally omitted: inherits site.description from the root
  // layout, so every page carries the same snippet.
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We are the shoring you need."
        lead="Your goal is to gain time and save resources in your company. You want integrated, automated processes that make your team's work easier. You want to solve your compliance problems, and you need to replace Excel. That is why we exist: to bring comfort and ease to your life through technology."
      />

      <section className="mx-auto max-w-[76rem] px-6 pb-24 lg:px-10 lg:pb-32">
        <p className="eyebrow text-slate">Who you will meet</p>
        <h2 className="mt-5 max-w-[18ch] text-title">
          The person behind the work.
        </h2>

        <div className="mt-16 max-w-[52ch] border-t border-[var(--color-line)] pt-10">
          <p className="eyebrow text-ink">{founder.role}</p>
          <h3 className="mt-4 text-3xl tracking-[-0.03em]">{founder.name}</h3>
          <p className="mt-6 text-lead text-steel">{founder.bio}</p>
        </div>
      </section>
    </>
  );
}
