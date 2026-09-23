import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { ArrowRight, ArrowUpRight, CheckMark } from "@/components/icons";
import {
  getPortfolioItem,
  portfolio,
  portfolioCover,
  portfolioImageSrc,
} from "@/lib/portfolio";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

/**
 * The content column is 76rem less 40px of padding a side, which is the
 * widest a full-bleed screenshot renders. Explicit px on purpose: `ch` in
 * `sizes` resolves against the root font, not this element's.
 */
const WIDE_SIZES = "(min-width: 1216px) 1136px, calc(100vw - 48px)";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};

  const cover = portfolioCover(item);
  const image = {
    url: portfolioImageSrc(item, cover.file),
    width: cover.width,
    height: cover.height,
    alt: cover.alt,
  };

  return {
    title: item.name,
    description: item.summary,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_US",
      url: `${site.url}/portfolio/${slug}`,
      title: `${item.name} · ${site.name}`,
      description: item.summary,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} · ${site.name}`,
      description: item.summary,
      images: [image.url],
    },
  };
}

export default async function PortfolioItemPage({ params }: Params) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const url = `${site.url}/portfolio/${slug}`;
  const cover = portfolioCover(item);
  const gallery = item.images.filter((image) => image.file !== cover.file);
  // Desktop screens stack full width; phone screens would be absurd at that
  // size, so they sit side by side in a row of their own.
  const wide = gallery.filter((image) => image.width >= image.height);
  const tall = gallery.filter((image) => image.width < image.height);
  const host = item.link
    ? new URL(item.link).hostname.replace(/^www\./, "")
    : null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: item.name,
        abstract: item.summary,
        description: item.description.join(" "),
        url,
        image: `${site.url}${portfolioImageSrc(item, cover.file)}`,
        creator: { "@type": "Organization", name: site.name, url: site.url },
        keywords: item.stack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: `${site.url}/portfolio`,
          },
          { "@type": "ListItem", position: 3, name: item.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="mx-auto max-w-[76rem] px-6 pt-16 pb-12 lg:px-10 lg:pt-24 lg:pb-16">
        <Link
          href="/portfolio"
          className="eyebrow inline-flex items-center gap-2 text-slate transition-colors hover:text-ink"
        >
          <ArrowRight className="size-4 shrink-0 rotate-180" />
          All projects
        </Link>

        <p className="eyebrow mt-12 text-slate">{item.category}</p>
        <h1 className="mt-5 max-w-[22ch] text-title">{item.name}</h1>
        <p className="mt-7 max-w-[56ch] text-lead text-steel">{item.summary}</p>

        <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-[var(--color-line)] pt-8 sm:grid-cols-3">
          <div>
            <dt className="eyebrow text-slate">Client</dt>
            <dd className="mt-2 text-ink">{item.client}</dd>
          </div>
          <div>
            <dt className="eyebrow text-slate">Built with</dt>
            <dd className="mt-2 text-ink">{item.stack.join(", ")}</dd>
          </div>
          {item.link && host ? (
            <div>
              <dt className="eyebrow text-slate">Live</dt>
              <dd className="mt-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-steel"
                >
                  {host}
                  <span className="sr-only">(opens in a new tab)</span>
                  <ArrowUpRight className="size-4 shrink-0" />
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      <div className="mx-auto max-w-[76rem] px-6 lg:px-10">
        {/* No w-auto or h-auto on next/image: an unloaded replaced element
            computes to 0 wide and the lazy-load observer never fires. */}
        <Image
          src={portfolioImageSrc(item, cover.file)}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes={WIDE_SIZES}
          priority
          className="w-full rounded-[2px] border border-[var(--color-line)]"
        />
      </div>

      <section className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-slate">The project</p>
            <div className="mt-6 grid gap-5 text-lead text-steel">
              {item.description.map((paragraph) => (
                <p key={paragraph} className="max-w-[62ch]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-slate">What we delivered</p>
            <ul className="mt-6 grid gap-4 border-t border-[var(--color-line)] pt-6">
              {item.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-3.5">
                  <CheckMark className="mt-1 size-5 shrink-0 text-ink" />
                  <span className="text-steel">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {gallery.length > 0 ? (
        <section className="border-t border-[var(--color-line)] bg-mist">
          <div className="mx-auto max-w-[76rem] px-6 py-24 lg:px-10 lg:py-32">
            <p className="eyebrow text-slate">Screens</p>

            {wide.length > 0 ? (
              <div className="mt-10 grid gap-8">
                {wide.map((image) => (
                  <Image
                    key={image.file}
                    src={portfolioImageSrc(item, image.file)}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes={WIDE_SIZES}
                    className="w-full rounded-[2px] border border-[var(--color-line)] bg-paper"
                  />
                ))}
              </div>
            ) : null}

            {tall.length > 0 ? (
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {tall.map((image) => (
                  <Image
                    key={image.file}
                    src={portfolioImageSrc(item, image.file)}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 266px, (min-width: 640px) 33vw, 50vw"
                    className="w-full rounded-[2px] border border-[var(--color-line)] bg-paper"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="on-ink bg-ink text-paper" data-nav-tone="dark">
        <div className="mx-auto flex max-w-[76rem] flex-wrap items-end justify-between gap-10 px-6 py-20 lg:px-10 lg:py-24">
          <div>
            <p className="eyebrow text-paper/70">Your project</p>
            <h2 className="mt-5 max-w-[20ch] text-title">
              Need something like this built?
            </h2>
          </div>
          <ButtonLink href="/contact" variant="inverse">
            Tell us about your project
            <ArrowRight className="size-5 shrink-0" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
