"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import type { PortableTextBlock } from "next-sanity";
import { gsap } from "gsap";
import { RichText } from "@/components/blog/rich-text";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { SiteLink } from "@/sanity/queries/settings";

type HeroSectionProps = {
  title: string;
  body?: PortableTextBlock[];
  cta?: SiteLink;
};

export function HeroSection({ title, body, cta }: HeroSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const titleElement = titleRef.current;
    const words = titleElement?.querySelectorAll<HTMLElement>("[data-hero-word]");

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
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.055,
        delay: 0.08,
      });
    }, titleRef);

    return () => context.revert();
  }, [title]);

  return (
    <Container className="pt-7 md:pt-0 gap-8 md:items-end">
      <div className="space-y-6">
        <h1
          ref={titleRef}
          className="max-w-[68rem] text-geist-38 font-semibold md:text-geist-76"
          style={{ visibility: "hidden" }}
        >
          <span className="sr-only">{title}</span>
          <span aria-hidden="true">
            {title.split(" ").map((word, index, words) => (
              <span key={`${word}-${index}`}>
                <span className="-mb-[0.12em] inline-block overflow-hidden align-bottom pb-[0.12em]">
                  <span
                    data-hero-word
                    className="inline-block"
                  >
                    {word}
                  </span>
                </span>
                {index < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        </h1>
      </div>
      {(body?.length || cta) ? (
        <div className="space-y-5 text-[#E6E6E6]">
          <RichText value={body} className="text-geist-16 md:text-geist-24" />
          {cta ? (
            <Button asChild>
              <Link
                href={cta.href}
                target={cta.openInNewTab ? "_blank" : undefined}
                rel={cta.openInNewTab ? "noopener noreferrer" : undefined}
              >
                {cta.label}
              </Link>
            </Button>
          ) : null}
        </div>
      ) : null}
    </Container>
  );
}
