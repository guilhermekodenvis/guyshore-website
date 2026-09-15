import bhg from "../../public/portfolio/bhg/details.json";
import hubfive from "../../public/portfolio/hubfive/details.json";
import kz from "../../public/portfolio/kz/details.json";
import sabas from "../../public/portfolio/sabas/details.json";
import solumart from "../../public/portfolio/solumart/details.json";

/**
 * Portfolio projects. Each lives in its own folder under `public/portfolio/`,
 * holding its screenshots and a `details.json` with everything the card and
 * the detail page render. The folder name is the URL slug.
 *
 * ADDING A PROJECT: create the folder with its images and details.json, then
 * add one import and one line to `entries` below. That is the whole change.
 *
 * Why static imports and not a directory listing with `fs`: the home page is
 * revalidated at runtime for the Google reviews, and on Netlify that render
 * runs in a function that is not guaranteed to have `public/` on disk. An
 * import is bundled, so it works wherever the page renders. It also means
 * TypeScript checks every details.json against `PortfolioDetails` at build
 * time, the same way partners.json is checked.
 *
 * Only images listed in `images` are shown. A screenshot that is not listed is
 * still served if it sits in the folder and is committed, so anything that
 * must not be public has to stay out of the repository altogether.
 */

export type PortfolioImage = {
  file: string;
  /** Intrinsic pixels. They reserve the space before the image loads. */
  width: number;
  height: number;
  alt: string;
};

export type PortfolioDetails = {
  name: string;
  client: string;
  category: string;
  /** One or two sentences. The card copy and the meta description. */
  summary: string;
  /** The full description, one string per paragraph. */
  description: string[];
  /** What was delivered, one short item each. */
  deliverables: string[];
  stack: string[];
  /** A public URL that genuinely belongs to this project, or null. */
  link: string | null;
  /** Shown on the home page. */
  featured: boolean;
  /** Ascending. Orders both the home row and the index. */
  order: number;
  /** File name of the cover, which must also be listed in `images`. */
  cover: string;
  images: PortfolioImage[];
};

export type PortfolioItem = PortfolioDetails & { slug: string };

const entries: Record<string, PortfolioDetails> = {
  bhg,
  hubfive,
  kz,
  sabas,
  solumart,
};

export const portfolio: PortfolioItem[] = Object.entries(entries)
  .map(([slug, details]) => ({ slug, ...details }))
  .sort((a, b) => a.order - b.order);

export const featuredPortfolio = portfolio.filter((item) => item.featured);

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.slug === slug);
}

export function portfolioImageSrc(item: PortfolioItem, file: string): string {
  return `/portfolio/${item.slug}/${file}`;
}

export function portfolioCover(item: PortfolioItem): PortfolioImage {
  return item.images.find((image) => image.file === item.cover) ?? item.images[0];
}
