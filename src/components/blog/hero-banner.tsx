import { FeaturedArticle } from "@/components/blog/featured-article";
import type { PostSummary } from "@/types/blog";

type HeroBannerProps = {
  post: PostSummary;
  ctaLabel?: string;
  dateFallback?: string;
};

export function HeroBanner({ post, ctaLabel, dateFallback }: HeroBannerProps) {
  return <FeaturedArticle post={post} ctaLabel={ctaLabel} dateFallback={dateFallback} />;
}
