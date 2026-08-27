"use client";

import { useEffect, useMemo, useState } from "react";
import { PostFilters } from "@/components/blog/post-filters";
import { PostGrid } from "@/components/blog/post-grid";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { SiteSettings } from "@/sanity/queries/settings";
import type { Category, PostSummary } from "@/types/blog";

type PostKnowledgeSectionProps = {
  settings: SiteSettings;
  categories: Category[];
  posts: PostSummary[];
};

const POSTS_PER_PAGE = 6;

export function PostKnowledgeSection({ settings, categories, posts }: PostKnowledgeSectionProps) {
  const postPage = settings.postPage;
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | undefined>();
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);
  const filteredPosts = useMemo(() => {
    if (!activeCategorySlug) return posts;

    return posts.filter((post) => post.categories?.some((category) => category.slug === activeCategorySlug));
  }, [activeCategorySlug, posts]);
  const visiblePosts = useMemo(() => filteredPosts.slice(0, visiblePostsCount), [filteredPosts, visiblePostsCount]);
  const hasMorePosts = filteredPosts.length > visiblePosts.length;

  useEffect(() => {
    setVisiblePostsCount(POSTS_PER_PAGE);
  }, [activeCategorySlug]);

  return (
    <Section className="bg-[#E6E6E6] pt-[14px] md:pt-24">
      <Container className="space-y-10">
        <div className="space-y-8 lg:space-y-[191px]">
          <div className="min-w-0 max-w-[12rem] md:max-w-[42rem]">
            <SectionHeader title={postPage?.postsHeading ?? ""} />
          </div>
          <div className="w-full pt-[155px] md:pt-0">
            <PostFilters
              categories={categories}
              settings={settings}
              activeCategorySlug={activeCategorySlug}
              onCategoryChange={setActiveCategorySlug}
            />
          </div>
        </div>
        <PostGrid
          posts={visiblePosts}
          ctaLabel={postPage?.cardCtaLabel}
          emptyStateTitle={postPage?.emptyStateTitle}
          emptyStateDescription={postPage?.emptyStateDescription}
          dateFallback={postPage?.dateFallback}
        />
        {hasMorePosts ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setVisiblePostsCount((currentCount) => currentCount + POSTS_PER_PAGE)}
              className="group relative overflow-hidden rounded-[8px] bg-black px-8 py-2 font-mono text-geist-mono-14 font-medium uppercase leading-[1.4] text-basement-light-grey shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-14px_28px_rgba(255,255,255,0.08),inset_0_10px_18px_rgba(0,0,0,0.92)] outline-none transition-colors duration-300 ease-out hover:text-black focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-8 -inset-y-4 origin-bottom scale-[0.72] opacity-25 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                style={{
                  background: "radial-gradient(62% 115% at 50% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 42%, rgba(255,255,255,0) 100%)"
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-center scale-[0.72] opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                style={{
                  background: "radial-gradient(62% 115% at 50% 100%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.14) 48%, rgba(0,0,0,0) 100%)"
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-black/15 opacity-0 blur-md transition-all duration-700 ease-out group-hover:left-[125%] group-hover:opacity-100 group-focus-visible:left-[125%] group-focus-visible:opacity-100"
              />
              <span className="relative z-10">{settings.ui?.loadMoreLabel}</span>
            </button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
