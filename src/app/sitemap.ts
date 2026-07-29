import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Stamped once per build. Every route here is public marketing content.
  const lastModified = new Date();

  const staticRoutes = ["", "/about", "/blog", "/contact"];
  const postSlugs = await getPostSlugs();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...postSlugs.map((slug) => ({
      url: `${site.url}/blog/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
