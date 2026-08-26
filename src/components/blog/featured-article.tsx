import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/image";
import type { PostSummary } from "@/types/blog";

type FeaturedArticleProps = {
  post: PostSummary;
  ctaLabel?: string;
  dateFallback?: string;
};

export function FeaturedArticle({ post, ctaLabel = "READ FULL BLOG POST", dateFallback = "Basement" }: FeaturedArticleProps) {
  const imageUrl = urlForImage(post.featuredImage)?.width(1200).auto("format").url();
  const postHref = `/blog/${post.slug}`;
  const categoryTitle = post.category?.title;

  return (
    <article className="featured-article group mx-auto grid w-full min-w-0 gap-6 rounded-[16px] p-6 text-basement-light-grey">
      <div className="featured-article__media relative aspect-[1.34] min-w-0 overflow-hidden rounded-[6px] bg-black">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 483px, calc(100vw - 48px)"
            priority
            className="select-none object-cover transition-transform duration-500 ease-standard motion-reduce:transition-none group-hover:scale-[1.015]"
          />
        ) : (
          <div className="absolute inset-0 bg-black" aria-hidden="true" />
        )}
      </div>

      <div className="featured-article__content flex min-w-0 flex-col justify-center gap-6">
        <div className="flex min-w-0 flex-col gap-4">
          <time dateTime={post.publishedAt} className="text-geist-13 font-semibold text-basement-medium-grey">
            {post.publishedAt ? formatDate(post.publishedAt) : dateFallback}
          </time>

          <h2 className="max-w-full text-geist-38 font-semibold text-basement-light-grey">
            <Link
              href={postHref}
              className="outline-none focus-visible:rounded-ui focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange"
            >
              {post.title}
            </Link>
          </h2>

          {categoryTitle ? (
            <div className="flex flex-wrap gap-1 text-geist-13 font-semibold text-basement-medium-grey">
              <span className="bg-basement-dark-grey px-1">{categoryTitle}</span>
            </div>
          ) : null}

          {post.excerpt ? <p className="text-geist-16 font-normal text-basement-medium-grey">{post.excerpt}</p> : null}
        </div>

        <Link
          href={postHref}
          className="featured-article__cta inline-flex w-fit max-w-full items-center rounded-[4px] bg-basement-orange px-2 py-1 font-mono text-geist-mono-14 font-medium uppercase leading-[0.9] text-black outline-none transition-[filter] duration-[var(--duration-fast)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange motion-reduce:transition-none"
        >
          <span className="break-words">{ctaLabel}</span>
        </Link>
      </div>
    </article>
  );
}
