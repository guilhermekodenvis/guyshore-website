import { getAllPosts } from "@/lib/posts";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { founder } from "@/lib/team";

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

export async function GET(): Promise<Response> {
  const posts = await getAllPosts();

  const body = `# ${site.name}

> ${site.description}

${site.name} is a custom software development company. We work with non-technical
founders and startups, and we hand over the full source code. The office is in
Lisbon, Portugal, and clients are served remotely, mostly in the United States.
We publish no prices: scope and cost are quoted per project.

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

${line("Privacy Policy", "/privacy", "What we collect and who processes it. The site sets no tracking cookies and runs no analytics or advertising pixel.")}
${line("Terms of Use", "/terms", "The terms covering use of this website.")}
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
