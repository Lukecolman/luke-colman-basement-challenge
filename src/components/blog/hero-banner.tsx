import { FeaturedArticle } from "@/components/blog/featured-article";
import type { PostSummary } from "@/types/blog";

type HeroBannerProps = {
  post: PostSummary;
  ctaLabel?: string;
  ctaAccessibleLabel?: string;
  dateFallback?: string;
};

export function HeroBanner({ post, ctaLabel, ctaAccessibleLabel, dateFallback }: HeroBannerProps) {
  return <FeaturedArticle post={post} ctaLabel={ctaLabel} ctaAccessibleLabel={ctaAccessibleLabel} dateFallback={dateFallback} />;
}
