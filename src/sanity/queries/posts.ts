import { sanityFetch } from "@/sanity/client";
import type { Post, PostSummary } from "@/types/blog";

const postSummaryFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  featuredImage,
  "category": categories[0]->{
    title,
    "slug": slug.current,
    description
  },
  "categories": categories[]->{
    title,
    "slug": slug.current,
    description
  },
  "author": author->{
    name,
    "slug": slug.current
  }
`;

export async function getAllPosts() {
  const posts = await sanityFetch<PostSummary[]>({
    query: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postSummaryFields} }`,
    tags: ["post"]
  });

  return posts ?? [];
}

export async function getRecentPosts(limit = 6) {
  const posts = await sanityFetch<PostSummary[]>({
    query: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit] { ${postSummaryFields} }`,
    params: { limit },
    tags: ["post"]
  });

  return posts ?? [];
}

export async function getFeaturedPosts() {
  const posts = await sanityFetch<PostSummary[]>({
    query: `*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) { ${postSummaryFields} }`,
    tags: ["post"]
  });

  return posts ?? [];
}

export async function getPostSlugs() {
  try {
    const slugs = await sanityFetch<string[]>({
      query: `*[_type == "post" && defined(slug.current)].slug.current`,
      tags: ["post"]
    });

    return slugs ?? [];
  } catch (error) {
    console.error("[Sanity] Failed to fetch post slugs; generating a sitemap without post URLs.", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  return sanityFetch<Post>({
    query: `*[_type == "post" && slug.current == $slug][0] {
      ${postSummaryFields},
      intro,
      updatedAt,
      body,
      tags,
      seo
    }`,
    params: { slug },
    tags: ["post"]
  });
}

export async function getPostsByCategory(slug: string) {
  const posts = await sanityFetch<PostSummary[]>({
    query: `*[_type == "post" && defined(slug.current) && $slug in categories[]->slug.current] | order(publishedAt desc) {
      ${postSummaryFields}
    }`,
    params: { slug },
    tags: ["post", "category"]
  });

  return posts ?? [];
}
