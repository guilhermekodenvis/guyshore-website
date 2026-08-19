import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/posts";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Stamped once per build. Every route here is public marketing content.
  const lastModified = new Date();

  const staticRoutes = ["", "/services", "/about", "/blog", "/contact"];
  // Legal pages are linked from every footer, so they are crawled anyway, but
  // they carry the lowest priority in the file.
  const legalRoutes = ["/privacy", "/terms"];
  const postSlugs = await getPostSlugs();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    // Service pages rank for their own intent, so they sit above posts.
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...legalRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...postSlugs.map((slug) => ({
      url: `${site.url}/blog/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
