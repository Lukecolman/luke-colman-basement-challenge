"use client";

import { useLayoutEffect, useRef } from "react";
import type { PortableTextBlock } from "next-sanity";
import { gsap } from "gsap";
import { RichText } from "@/components/blog/rich-text";

type SectionHeaderProps = {
  title: string;
  description?: PortableTextBlock[];
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const titleElement = titleRef.current;
    const words = titleElement?.querySelectorAll<HTMLElement>("[data-knowledge-word]");

    if (!titleElement || !words?.length) return;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { opacity: 1, yPercent: 0 });
        titleElement.style.visibility = "visible";
        return;
      }

      gsap.set(words, { opacity: 0, yPercent: 110 });
      titleElement.style.visibility = "visible";
      gsap.to(words, {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.055,
      });
    }, titleRef);

    return () => context.revert();
  }, [title]);

  return (
    <div className="max-w-3xl space-y-4">
      <h2 ref={titleRef} className="text-geist-38 font-semibold md:text-geist-76" style={{ visibility: "hidden" }}>
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          {title.split(" ").map((word, index, words) => (
            <span key={`${word}-${index}`}>
              <span className="-mb-[0.12em] inline-block overflow-hidden align-bottom pb-[0.12em]">
                <span data-knowledge-word className="inline-block">
                  {word}
                </span>
              </span>
              {index < words.length - 1 ? " " : null}
            </span>
          ))}
        </span>
      </h2>
      <RichText value={description} className="text-geist-16 text-muted md:text-geist-24" />
    </div>
  );
}
