import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableTextRenderer } from "@/components/blog/portable-text-renderer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { formatDate } from "@/lib/utils";
import { getPostBySlug, getPostSlugs } from "@/sanity/queries/posts";
import { getSiteSettings } from "@/sanity/queries/settings";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt
    }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()]);

  if (!post) notFound();

  return (
    <article>
      <Section>
        <Container className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <p className="text-geist-13 font-medium uppercase text-accent">
              {post.category?.title ?? settings.postPage?.articleLabel}
            </p>
            <h1 className="text-geist-38 font-semibold md:text-geist-76">{post.title}</h1>
            <p className="text-geist-16 text-muted md:text-geist-24">{post.excerpt}</p>
            <p className="text-geist-16 text-muted">
              {post.author?.name ? `${post.author.name} · ` : ""}
              {formatDate(post.publishedAt)}
            </p>
          </div>
          <PortableTextRenderer value={post.body} emptyMessage={settings.postPage?.emptyArticleBody} />
        </Container>
      </Section>
    </article>
  );
}
