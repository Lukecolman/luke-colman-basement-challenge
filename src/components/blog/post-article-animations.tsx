"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PostArticleAnimationsProps = {
  children: ReactNode;
};

export function PostArticleAnimations({ children }: PostArticleAnimationsProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = articleRef.current;
    if (!root) return;

    const line = root.querySelector<HTMLElement>("[data-post-line]");
    const backButton = root.querySelector<HTMLElement>("[data-post-back]");
    const title = root.querySelector<HTMLElement>("[data-post-title]");
    const intro = root.querySelector<HTMLElement>("[data-post-intro]");
    const meta = root.querySelector<HTMLElement>("[data-post-meta]");
    const image = root.querySelector<HTMLElement>("[data-post-image]");
    const body = root.querySelector<HTMLElement>("[data-post-body]");
    const bodyContent = body?.querySelector<HTMLElement>(":scope > div");
    const bodyBlocks = bodyContent ? (Array.from(bodyContent.children) as HTMLElement[]) : [];

    if (!line || !backButton || !title || !intro || !meta || !body) return;

    let observer: IntersectionObserver | null = null;
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.set(line, { opacity: 0, scaleX: 0 });
      gsap.set(backButton, { opacity: 0, y: 10 });
      gsap.set([title, intro, meta, image].filter(Boolean), { opacity: 0, y: 18 });
      if (bodyBlocks.length) gsap.set(bodyBlocks, { opacity: 0, y: 12 });

      if (image) {
        gsap.fromTo(
          image,
          {
            width: "100vw",
            left: "50%",
            xPercent: -50,
          },
          {
            width: "100%",
            // Keep the image centered while its width changes so both sides
            // contract evenly into the final container width.
            left: "50%",
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 90%",
              end: "center 50%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const introTimeline = gsap.timeline();
      introTimeline
        .to(line, { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" })
        .to(backButton, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.42")
        .to(title, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.38")
        .to(intro, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.48")
        .to(meta, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.38");

      if (image) {
        introTimeline.to(image, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.26");
      }

      if (!bodyBlocks.length) return;

      let hasRevealed = false;
      const revealBody = () => {
        if (hasRevealed) return;
        hasRevealed = true;
        observer?.disconnect();
        gsap.to(bodyBlocks, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.09,
        });
      };

      if (typeof IntersectionObserver === "undefined") {
        revealBody();
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) revealBody();
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );
      observer.observe(body);
    }, articleRef);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, []);

  return (
    <div ref={articleRef} className="post-article-animations">
      {children}
    </div>
  );
}
