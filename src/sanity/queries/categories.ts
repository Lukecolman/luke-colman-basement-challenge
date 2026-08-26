import { sanityFetch } from "@/sanity/client";
import type { Category } from "@/types/blog";

export async function getCategories() {
  const categories = await sanityFetch<Category[]>({
    query: `*[_type == "category" && defined(slug.current)] | order(title asc) {
      title,
      "slug": slug.current,
      description
    }`,
    tags: ["category"]
  });

  return categories ?? [];
}
