"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import type { FooterColumn } from "@/sanity/queries/settings";
import type { MotionValue } from "motion/react";

type FooterProps = {
  columns: FooterColumn[];
  copyright: string;
  membershipText?: string;
  rightsReservedText?: string;
  navigationLabel?: string;
};

export function Footer({ columns, copyright, membershipText = "", rightsReservedText = "", navigationLabel = "Footer" }: FooterProps) {
  const mobileCopyright = copyright.replace(rightsReservedText, "").trim();
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start 95%", "end end"],
  });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-basement-grey bg-black py-5 md:py-8 lg:py-10">
      <Container className="text-geist-16 text-basement-grey">
        <nav aria-label={navigationLabel} className="grid grid-cols-3 gap-x-4 gap-y-8 text-[12px] md:flex md:flex-wrap md:items-start md:gap-16 md:text-geist-16 lg:gap-20">
          {columns.map((column, index) => (
            <FooterColumnLinks key={column.title} column={column} index={index} pathname={pathname} progress={scrollYProgress} reduceMotion={reduceMotion} />
          ))}
        </nav>
        <div aria-hidden="true" className="relative left-1/2 mt-14 aspect-[107/15] w-screen -translate-x-1/2 md:left-auto md:mt-16 md:w-full md:translate-x-0 lg:mt-20">
          <FooterWordmarkShimmer progress={scrollYProgress} reduceMotion={reduceMotion} />
        </div>
        <FooterLegalReveal progress={scrollYProgress} reduceMotion={reduceMotion}>
          <div className="mt-3 flex items-end justify-between gap-4 font-mono text-[12px] uppercase leading-[1.15] tracking-[-0.01em] text-basement-grey md:text-geist-mono-14 md:leading-[1.1]">
            <p className="max-w-[15rem] text-[9px] md:max-w-none md:text-geist-mono-14">
              <span className="md:hidden">
                {mobileCopyright}
                <br />
                {rightsReservedText}
              </span>
              <span className="hidden md:inline">{copyright}</span>
            </p>
            <div className="flex items-center gap-2 text-right md:gap-4">
              <p className="text-[9px] md:text-geist-mono-14">{membershipText}</p>
              <Image src="/assets/logo-soda.svg" alt="" width={11} height={13} className="h-[13px] w-auto shrink-0 md:h-6 md:w-[20.73px]" />
            </div>
          </div>
        </FooterLegalReveal>
      </Container>
    </footer>
  );
}

function FooterColumnLinks({
  column,
  index,
  pathname,
  progress,
  reduceMotion,
}: {
  column: FooterColumn;
  index: number;
  pathname: string;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const baseStart = 0.18 + index * 0.04;

  return (
    <div className="space-y-3 md:min-w-[9rem]">
      <FooterItemReveal progress={progress} reduceMotion={reduceMotion} start={baseStart}>
        <h2 className="font-mono text-[12px] font-normal uppercase tracking-[-0.01em] text-basement-orange md:text-geist-mono-14">{column.title}</h2>
      </FooterItemReveal>
      <ul className="grid gap-2">
        {column.links.map((item, itemIndex) => {
          const active = isActivePath(pathname, item.href);

          return (
            <FooterItemReveal key={`${item.label}-${item.href}`} as="li" progress={progress} reduceMotion={reduceMotion} start={baseStart + 0.07 + itemIndex * 0.035}>
              <Link
                href={item.href}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[12px] font-semibold text-[#E6E6E6] transition-colors duration-200 hover:text-basement-orange focus-visible:text-basement-orange md:text-geist-16",
                  active && "text-basement-orange hover:text-basement-orange focus-visible:text-basement-orange"
                )}
              >
                {item.label}
              </Link>
            </FooterItemReveal>
          );
        })}
      </ul>
    </div>
  );
}

function FooterItemReveal({
  as = "div",
  children,
  progress,
  reduceMotion,
  start,
}: {
  as?: "div" | "li";
  children: ReactNode;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  start: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.18], [0, 1]);
  const y = useTransform(progress, [start, start + 0.18], [18, 0]);
  const Component = as === "li" ? motion.li : motion.div;

  return <Component style={reduceMotion ? undefined : { opacity, y }}>{children}</Component>;
}

function FooterWordmarkShimmer({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const highlightPosition = useTransform(progress, [0.55, 1], [-140, 160]);
  const highlightBackgroundPosition = useMotionTemplate`${highlightPosition}% 0%`;

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-black [mask-image:url('/assets/basement.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url('/assets/basement.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full bg-[linear-gradient(180deg,#000000_0%,#434343_100%)] [mask-image:url('/assets/basement.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url('/assets/basement.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]" />
        <motion.div
          aria-hidden="true"
          style={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: highlightBackgroundPosition,
                }
          }
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,transparent_42%,rgba(214,214,214,0.08)_47%,rgba(214,214,214,0.42)_50%,rgba(214,214,214,0.08)_53%,transparent_58%)] bg-[length:260%_100%] [mask-image:url('/assets/basement.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url('/assets/basement.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]"
        />
        <div className="pointer-events-none absolute inset-0 backdrop-blur-[1px] [mask-image:url('/assets/basement.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:url('/assets/basement.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%] md:backdrop-blur-[2px]" />
      </div>
    </div>
  );
}

function normalizePath(path: string) {
  if (path === "/") return "/";
  return path.replace(/\/+$/, "");
}

function isActivePath(pathname: string, href: string) {
  const normalizedHref = normalizePath(href);
  const normalizedPathname = normalizePath(pathname);

  if (normalizedHref === "/") return normalizedPathname === "/";
  return normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`);
}

function FooterLegalReveal({ children, progress, reduceMotion }: { children: ReactNode; progress: MotionValue<number>; reduceMotion: boolean }) {
  const opacity = useTransform(progress, [0.68, 0.86], [0, 1]);
  const y = useTransform(progress, [0.68, 0.86], [10, 0]);

  return <motion.div style={reduceMotion ? undefined : { opacity, y }}>{children}</motion.div>;
}
