import { getFeasibility } from "@/lib/feasibility";
import { homeCopy } from "@/lib/home";
import { getAllPosts, postPath } from "@/lib/posts";
import { getServices } from "@/lib/services";
import { site } from "@/lib/site";
import { getFounder } from "@/lib/team";

/**
 * `/llms.txt`, the curated plain-text index described at llms.txt.org.
 *
 * It exists because the blog is written for answer engines as much as for
 * search engines: the file gives an assistant one page that names the
 * company, its services and every article, instead of making it infer the
 * shape of the site from the sitemap.
 *
 * Be honest about what it buys. No crawler has publicly committed to reading
 * it, and Google has said it does not use it, so treat any AEO benefit as
 * speculative. It is here because it is free, exposes nothing that is not
 * already in `sitemap.xml`, and, generated this way, cannot go stale.
 *
 * WRITE NOTHING BY HAND IN THIS FILE. Every line is derived from the same
 * modules the pages render, so publishing a service or a post adds it here
 * automatically. That is the whole point: a hand-maintained index would be
 * wrong within two commits.
 *
 * Next.js has no file convention for this one, so it is a route handler.
 * `force-static` prerenders it at build time, like `sitemap.xml`.
 */
export const dynamic = "force-static";

const { address, phone } = site;

function line(label: string, url: string, summary: string): string {
  return `- [${label}](${site.url}${url}): ${summary}`;
}

// The index is written in English; the Portuguese section of the site is
// listed at the end with its own articles.
const home = homeCopy.en;
const feasibility = getFeasibility("en");
const founder = getFounder("en");
const services = getServices("en");

export async function GET(): Promise<Response> {
  const posts = await getAllPosts("en");
  const postsPt = await getAllPosts("pt");

  const body = `# ${site.name}

> ${home.description}

${home.about}
${feasibility.eyebrow}: ${feasibility.priceLabel}. ${feasibility.lead}
${feasibility.priceNote} Request it at ${site.url}/#${feasibility.id}.

Business name in listings: ${site.listingName}
Founder: ${founder.name}, ${founder.role} (${founder.linkedin})
Address: ${address.street}, ${address.postalCode} ${address.city}, ${address.country}
Phone: ${phone.display}
Email: ${site.email}

## Services

${services.map((service) => line(service.title, `/services/${service.slug}`, service.lead)).join("\n")}
${line("All services", "/services", "Index of every service, one per row.")}

## Blog

${posts.map((post) => line(post.meta.title, `/blog/${post.slug}`, `${post.meta.description} Published ${post.meta.date}${post.meta.updated ? `, updated ${post.meta.updated}` : ""}.`)).join("\n")}
${line("Blog index", "/blog", "Every article, newest first.")}

## Company

${line("About", "/about", `Who we are and how we work. ${founder.bio}`)}
${line("Contact", "/contact", `Contact form, plus the address, phone and email above. Direct email: ${site.email}.`)}

## Legal

${line("Privacy Policy", "/privacy", "What we collect and who processes it. A Google tag for Google Ads and Google Analytics sets cookies only if the visitor accepts, and nothing else tracks visitors.")}
${line("Terms of Use", "/terms", "The terms covering use of this website.")}

## Portuguese (pt-PT)

Every page above also exists in European Portuguese under /pt, with the same path after it (for example /pt/services/mvp-development).

${line(homeCopy.pt.headline, "/pt", homeCopy.pt.description)}
${postsPt.map((post) => line(post.meta.title, postPath("pt", post.slug), `${post.meta.description} Published ${post.meta.date}.`)).join("\n")}
${line("Blog em português", "/pt/blog", "Portuguese articles, newest first.")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
