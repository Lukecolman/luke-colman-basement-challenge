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

export function PostKnowledgeSection({ settings, categories, posts }: PostKnowledgeSectionProps) {
  const postPage = settings.postPage;

  return (
    <Section className="bg-basement-light-grey pt-0">
      <Container className="space-y-10">
        <div className="space-y-8 lg:space-y-[191px]">
          <div className="min-w-0 max-w-[42rem]">
            <SectionHeader title={postPage?.postsHeading ?? ""} />
          </div>
          <div className="w-full">
            <PostFilters categories={categories} settings={settings} />
          </div>
        </div>
        <PostGrid
          posts={posts}
          ctaLabel={postPage?.cardCtaLabel}
          emptyStateTitle={postPage?.emptyStateTitle}
          emptyStateDescription={postPage?.emptyStateDescription}
          dateFallback={postPage?.dateFallback}
        />
      </Container>
    </Section>
  );
}
