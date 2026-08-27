import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostFilters } from "@/components/blog/post-filters";
import { PostGrid } from "@/components/blog/post-grid";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { getCategories } from "@/sanity/queries/categories";
import { getPostsByCategory } from "@/sanity/queries/posts";
import { getSiteSettings } from "@/sanity/queries/settings";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
    alternates: {
      canonical: `/category/${slug}`
    }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, posts, settings] = await Promise.all([getCategories(), getPostsByCategory(slug), getSiteSettings()]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) notFound();

  return (
    <Section className="bg-basement-light-grey pt-0">
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader title={category.title} />
          <PostFilters categories={categories} settings={settings} activeCategorySlug={category.slug} />
        </div>
        <PostGrid
          posts={posts}
          ctaLabel={settings.postPage?.cardCtaLabel}
          emptyStateTitle={settings.postPage?.emptyStateTitle}
          emptyStateDescription={settings.postPage?.emptyStateDescription}
          dateFallback={settings.postPage?.dateFallback}
        />
      </Container>
    </Section>
  );
}
