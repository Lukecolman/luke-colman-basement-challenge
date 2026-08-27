"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/image";
import type { PostSummary } from "@/types/blog";

type BlogCardProps = {
  post: PostSummary;
  priority?: boolean;
  ctaLabel?: string;
  dateFallback?: string;
  showImage?: boolean;
  tone?: "light" | "dark";
  className?: string;
  animationDelay?: number;
};

export function BlogCard({
  post,
  priority = false,
  ctaLabel = "",
  dateFallback = "",
  showImage = true,
  tone = "light",
  className,
  animationDelay = 0
}: BlogCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imageUrl = urlForImage(post.featuredImage)?.width(900).height(320).auto("format").url();
  const postHref = `/blog/${post.slug}`;
  const postCategories = post.categories?.length ? post.categories : post.category ? [post.category] : [];
  const isDark = tone === "dark";

  useLayoutEffect(() => {
    const card = cardRef.current;

    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;
    let hasRevealed = false;
    const context = gsap.context(() => {
      const reveal = () => {
        if (hasRevealed) return;
        hasRevealed = true;
        observer?.disconnect();
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: animationDelay,
        });
      };

      gsap.set(card, { opacity: 0, y: 32 });

      if (typeof IntersectionObserver === "undefined") {
        reveal();
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) reveal();
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
      );
      observer.observe(card);
    }, cardRef);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative flex w-full max-w-[400px] md:max-w-[352px] flex-col gap-6 overflow-hidden border p-6",
        showImage ? "h-[400px] max-h-[436px]" : "h-[250px] max-h-[250px]",
        isDark
          ? "rounded-[22px] border-white/10 bg-[#111111] text-basement-light-grey shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_50px_rgba(0,0,0,0.3)]"
          : "rounded-2xl border-white/80 bg-[#EBEBEB] text-black",
        className
      )}
    >
      <div className="flex flex-col gap-6">
        {showImage ? (
          <div className={cn("relative h-[137px] w-full overflow-hidden rounded-md bg-black", isDark && "rounded-[8px]")}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt ?? ""}
                fill
                sizes="(max-width: 768px) calc(100vw - 48px), 388px"
                priority={priority}
                className="select-none object-cover"
              />
            ) : (
              <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <span className="absolute -left-3 bottom-[-0.24em] font-mono text-8xl font-black uppercase leading-none text-white md:text-[10rem]">
                  B
                </span>
                <span className="absolute left-[27%] top-[10%] h-[42%] w-[7%] bg-[#f2f2f2]" />
                <span className="absolute left-[48%] top-[10%] h-[86%] w-[7%] bg-[#f2f2f2]" />
                <span className="absolute left-[65%] top-[55%] h-[41%] w-[6%] bg-[#f2f2f2]" />
                <span className="absolute right-0 bottom-0 h-[43%] w-[18%] rounded-tl-[34px] border-[1.6rem] border-r-0 border-b-0 border-[#f2f2f2]" />
                <span className="absolute right-[30%] top-[10%] font-mono text-geist-mono-14 uppercase text-white">
                  {post.publishedAt ? formatDate(post.publishedAt) : dateFallback}
                  <br />
                  Journal
                </span>
              </div>
            )}
          </div>
        ) : null}

        <div className="flex flex-col items-start gap-4">
          {post.publishedAt ? (
            <time
              dateTime={post.publishedAt}
              className={`block text-geist-13 font-semibold ${isDark ? "text-[#666666]" : "text-[#6f6f6f]"}`}
            >
              {formatDate(post.publishedAt)}
            </time>
          ) : null}

          <h2 className={`text-geist-24 font-semibold ${isDark ? "text-basement-light-grey" : "text-black"}`}>
            <span className="block text-geist-24 font-semibold leading-[1.1]">{post.title}</span>
          </h2>

          {postCategories.length ? (
            <div className={`flex flex-wrap items-start gap-1 text-geist-13 font-semibold ${isDark ? "text-basement-light-grey" : "text-[#c9c9c9]"}`}>
              {postCategories.map((category) => (
                <span
                  key={category.slug}
                  className={`inline-flex items-center justify-center px-0.5 text-geist-13 font-semibold ${
                    isDark ? "bg-[#2E2E2E] text-basement-light-grey" : "bg-basement-light-grey text-basement-medium-grey"
                  }`}
                >
                  {category.title}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-auto">
        <Link
          href={postHref}
          aria-label={`Read more about ${post.title}`}
          className={cn(
            "inline-flex items-center self-start rounded px-2 py-1 uppercase leading-[0.9] outline-none transition-colors duration-200 focus-visible:rounded-ui focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange",
            isDark
              ? "bg-basement-orange text-black hover:bg-basement-light-grey"
              : "bg-basement-light-grey text-black hover:bg-basement-orange"
          )}
        >
          <span aria-hidden="true" className="font-mono text-geist-mono-14 font-medium">
            {ctaLabel}
          </span>
        </Link>
      </div>
    </article>
  );
}
