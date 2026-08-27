import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { PostArticleAnimations } from "@/components/blog/post-article-animations";
import { PortableTextRenderer } from "@/components/blog/portable-text-renderer";
import { RelatedPostsCarousel } from "@/components/blog/related-posts-carousel";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { formatDate } from "@/lib/utils";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/sanity/queries/posts";
import { urlForImage } from "@/sanity/image";
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

  const title = post.seo?.title?.trim() || post.title;
  const description = post.seo?.description?.trim() || post.excerpt;
  const socialImage = urlForImage(post.seo?.image)?.width(1200).height(630).auto("format").url() || "/images/OG.webp";

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: socialImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage]
    }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, settings, allPosts] = await Promise.all([getPostBySlug(slug), getSiteSettings(), getAllPosts()]);

  if (!post) notFound();

  const postIndex = allPosts.findIndex((item) => item.slug === slug);
  const previousPost = postIndex >= 0 ? allPosts[postIndex + 1] : undefined;
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : undefined;
  const postCategorySlugs = new Set(post.categories?.map((category) => category.slug) ?? []);
  const relatedPosts = allPosts
    .filter((item) => item.slug !== slug && item.categories?.some((category) => postCategorySlugs.has(category.slug)));
  const fallbackRelatedPosts = relatedPosts.length > 0
    ? relatedPosts
    : allPosts.filter((item) => item.slug !== slug);
  const imageUrl = urlForImage(post.featuredImage)?.width(1800).auto("format").url();

  return (
    <PostArticleAnimations>
      <article className="bg-black text-basement-light-grey">
      <Section className="pb-[101px] md:pb-20 md:pt-14">
        <Container>
          <div className="relative pb-4">
            <span data-post-line aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-basement-grey" />
            <Link
              data-post-back
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-geist-mono-14 font-medium uppercase text-[#E6E6E6] transition-colors hover:text-basement-orange"
            >
              <span
                aria-hidden="true"
                className="translate-x-0 transition-transform duration-200 ease-out group-hover:-translate-x-1"
              >
                <svg
                  width="11"
                  height="10"
                  viewBox="0 0 9 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block"
                >
                  <path
                    d="M5.30634 7.294L3.62634 7.28L0.000343753 3.64L3.62634 -1.43051e-06H5.29234L1.66634 3.64L5.30634 7.294ZM8.07834 4.27H0.854344V3.024H8.07834V4.27Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>{settings.ui?.backToPostsLabel}</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:mt-12 md:gap-8 lg:min-h-[420px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
            <div>
              <h1
                data-post-title
                tabIndex={0}
                className="relative z-10 block max-w-xl text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-basement-light-grey focus:outline-none focus-visible:text-basement-orange md:text-geist-38"
              >
                {post.title}
              </h1>
            </div>
            <div className="flex min-h-[420px] flex-col justify-between gap-8">
              <div data-post-intro>{post.intro?.length ? <PortableTextRenderer value={post.intro} emptyMessage="" tone="intro" /> : null}</div>
              <div data-post-meta className="flex flex-col gap-3 text-geist-13 font-semibold text-basement-light-grey sm:flex-row sm:items-center sm:justify-between">
                <div className="order-last flex flex-wrap items-center gap-2 sm:order-none">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {post.author?.name ? (
                    <>
                      <span aria-hidden="true" className="h-1 w-1 bg-[#666666]" />
                      <p>{post.author.name}</p>
                    </>
                  ) : null}
                </div>
                {post.categories?.length ? (
                  <ul className="order-first flex flex-wrap gap-1 sm:order-none" aria-label={settings.ui?.articleCategoriesLabel}>
                    {post.categories.map((category) => (
                      <li key={category.slug} className="flex">
                        <span
                          className="inline-flex items-center py-0 leading-none"
                          style={{ backgroundColor: "#2E2E2E", paddingInline: "2px" }}
                        >
                          {category.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          {imageUrl ? (
            <div data-post-image className="relative mt-6 aspect-[1372/472] overflow-hidden bg-basement-dark-grey md:mt-8">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt ?? post.title}
                fill
                sizes="(max-width: 768px) calc(100vw - 40px), 1140px"
                priority
                className="object-cover"
              />
            </div>
          ) : null}

          <div data-post-body className="mx-auto mt-12 max-w-[904px] md:mt-16">
            <PortableTextRenderer value={post.body} emptyMessage={settings.postPage?.emptyArticleBody} />
          </div>

          {previousPost || nextPost ? (
            <nav className="mx-auto mt-20 flex max-w-[904px] items-center justify-between gap-6 md:mt-28" aria-label="Article navigation">
              {previousPost ? (
                <Link href={`/blog/${previousPost.slug}`} className="group flex min-w-0 max-w-[48%] items-center gap-3 text-basement-light-grey">
                  <span className="shrink-0 rounded-[4px] bg-basement-grey px-2 py-1 font-mono text-geist-mono-14 font-normal uppercase transition-colors group-hover:bg-basement-orange group-hover:text-black">{settings.ui?.previousArticleLabel}</span>
                  <span className="hidden truncate font-mono text-geist-mono-14 font-normal uppercase text-basement-light-grey group-hover:text-basement-orange md:block">{previousPost.title}</span>
                </Link>
              ) : null}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="group ml-auto flex min-w-0 max-w-[48%] items-center justify-end gap-3 text-right text-basement-light-grey">
                  <span className="hidden truncate font-mono text-geist-mono-14 font-normal uppercase text-basement-light-grey group-hover:text-basement-orange md:block">{nextPost.title}</span>
                  <span className="shrink-0 rounded-[4px] bg-basement-grey px-2 py-1 font-mono text-geist-mono-14 font-normal uppercase transition-colors group-hover:bg-basement-orange group-hover:text-black">{settings.ui?.nextArticleLabel}</span>
                </Link>
              ) : null}
            </nav>
          ) : null}
        </Container>
      </Section>

      {fallbackRelatedPosts.length ? (
        <Section className="overflow-hidden bg-black text-basement-light-grey">
          <Container>
            <div className="md:hidden">
              <h2 className="text-geist-38 font-semibold leading-[0.95] text-basement-light-grey">
                {settings.ui?.relatedPostsTitle}
              </h2>
              <div className="mt-10 flex flex-col items-center gap-6">
                {fallbackRelatedPosts.slice(0, 3).map((relatedPost, index) => (
                  <BlogCard
                    key={relatedPost._id}
                    post={relatedPost}
                    ctaLabel={settings.postPage?.cardCtaLabel}
                    ctaAccessibleLabel={settings.postPage?.cardCtaAccessibleLabel}
                    dateFallback={settings.postPage?.dateFallback}
                    priority={index === 0}
                    tone="dark"
                    className="h-[430px] max-h-none w-full max-w-[400px]"
                    animationDelay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-[180px_minmax(0,1fr)] md:items-start md:gap-12">
              <div className="pt-1">
                <h2 className="max-w-[150px] text-geist-38 font-semibold leading-[0.95] text-basement-light-grey">
                  {settings.ui?.relatedPostsTitle}
                </h2>
              </div>

              <RelatedPostsCarousel className="min-w-0 md:w-[calc(100%+max(2rem,calc((100vw-var(--container-width))/2+2rem)))] md:pr-8">
                {fallbackRelatedPosts.map((relatedPost, index) => (
                  <BlogCard
                    key={relatedPost._id}
                    post={relatedPost}
                    ctaLabel={settings.postPage?.cardCtaLabel}
                    ctaAccessibleLabel={settings.postPage?.cardCtaAccessibleLabel}
                    dateFallback={settings.postPage?.dateFallback}
                    priority={index === 0}
                    tone="dark"
                    className="h-[430px] max-h-none w-full max-w-[352px] shrink-0"
                    animationDelay={index * 0.1}
                  />
                ))}
              </RelatedPostsCarousel>
            </div>
          </Container>
        </Section>
      ) : null}
      </article>
    </PostArticleAnimations>
  );
}
