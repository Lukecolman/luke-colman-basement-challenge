import { BlogCard } from "@/components/blog/blog-card";
import type { PostSummary } from "@/types/blog";

type PostGridProps = {
  posts: PostSummary[];
  ctaLabel?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  dateFallback?: string;
};

export function PostGrid({ posts, ctaLabel, emptyStateTitle = "", emptyStateDescription = "", dateFallback }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-ui border border-border bg-surface p-8">
        <h2 className="text-geist-24 font-semibold">{emptyStateTitle}</h2>
        <p className="mt-3 text-geist-16 text-muted">{emptyStateDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 justify-items-center gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {posts.map((post, index) => (
        <BlogCard
          key={post._id}
          post={post}
          ctaLabel={ctaLabel}
          dateFallback={dateFallback}
          showImage={index < 3}
          animationDelay={index * 0.1}
        />
      ))}
    </div>
  );
}
