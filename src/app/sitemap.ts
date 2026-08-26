import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getPostSlugs } from "@/sanity/queries/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPostSlugs();

  return [
    {
      url: siteConfig.url,
      lastModified: new Date()
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date()
    },
    ...slugs.map((slug) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified: new Date()
    }))
  ];
}
