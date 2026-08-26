import { BlogCard } from "@/components/blog/blog-card";
import type { PostSummary } from "@/types/blog";

type PostGridProps = {
  posts: PostSummary[];
  ctaLabel?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  dateFallback?: string;
};

export function PostGrid({ posts, ctaLabel, emptyStateTitle = "No posts found", emptyStateDescription = "Publish posts in Sanity to fill this listing.", dateFallback }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-ui border border-border bg-surface p-8">
        <h2 className="text-geist-24 font-semibold">{emptyStateTitle}</h2>
        <p className="mt-3 text-geist-16 text-muted">{emptyStateDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),436px))] justify-start gap-5">
      {posts.map((post, index) => (
        <BlogCard
          key={post._id}
          post={post}
          ctaLabel={ctaLabel}
          dateFallback={dateFallback}
          showImage={index < 3}
        />
      ))}
    </div>
  );
}
