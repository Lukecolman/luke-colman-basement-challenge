import type { Metadata } from "next";
import { PostHero } from "@/components/blog/post-hero";
import { PostKnowledgeSection } from "@/components/blog/post-knowledge-section";
import { getCategories } from "@/sanity/queries/categories";
import { getAllPosts, getFeaturedPosts, getRecentPosts } from "@/sanity/queries/posts";
import { getSiteSettings } from "@/sanity/queries/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings.postPage?.heroTitle,
    description: settings.siteDescription,
    alternates: {
      canonical: "/blog"
    }
  };
}

export default async function BlogIndexPage() {
  const [posts, featuredPosts, recentPosts, categories, settings] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getRecentPosts(),
    getCategories(),
    getSiteSettings()
  ]);
  const featuredPost = featuredPosts[0] ?? recentPosts[0];

  return (
    <>
      <PostHero settings={settings} featuredPost={featuredPost} />
      <PostKnowledgeSection settings={settings} categories={categories} posts={posts} />
    </>
  );
}
