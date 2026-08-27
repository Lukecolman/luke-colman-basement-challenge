"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
  const postCategories = post.categories?.length ? post.categories : post.category ? [post.category] : [];
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 120%", "end -20%"],
  });
  const cardY = useTransform(scrollYProgress, [0, 0.42, 1], ["64vh", "0vh", "-90vh"]);
  const cardScale = useTransform(scrollYProgress, [0, 0.42, 1], [0.8, 1, 0.97]);

  return (
    <div ref={cardRef} className="relative">
      <motion.div
        initial={reduceMotion ? false : { y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.article
          initial={{ y: "64vh", scale: 0.8 }}
          style={{ y: cardY, scale: cardScale }}
          tabIndex={0}
          className="featured-article group mx-auto grid w-full min-w-0 gap-6 rounded-[16px] p-6 text-basement-light-grey outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange"
        >
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

              {postCategories.length ? (
                <div className="flex flex-wrap gap-1 text-geist-13 font-semibold text-basement-medium-grey">
                  {postCategories.map((category) => (
                    <span key={category.slug} className="bg-basement-dark-grey px-1">
                      {category.title}
                    </span>
                  ))}
                </div>
              ) : null}

              {post.excerpt ? <p className="text-geist-16 font-normal text-basement-medium-grey">{post.excerpt}</p> : null}
            </div>

            <Link
              href={postHref}
              className="featured-article__cta inline-flex w-fit max-w-full items-center rounded-[4px] bg-basement-orange px-2 py-1 font-mono text-geist-mono-14 font-medium uppercase leading-[0.9] text-black outline-none transition-colors duration-[var(--duration-fast)] hover:bg-basement-light-grey focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange motion-reduce:transition-none"
            >
              <span className="break-words">{ctaLabel}</span>
            </Link>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}
