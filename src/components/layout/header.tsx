"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/layout/container";
import { LinkList } from "@/components/layout/link-list";
import type { SiteLink } from "@/sanity/queries/settings";

type HeaderProps = {
  siteTitle: string;
  logoSrc: string;
  logoAlt: string;
  navigation: SiteLink[];
  navigationLabel?: string;
  mobileLabels?: { open: string; close: string; menu: string };
};

export function Header({ siteTitle, logoSrc, logoAlt, navigation, navigationLabel = "Primary", mobileLabels }: HeaderProps) {
  const contactLink = navigation.find((item) => item.label.trim().toLowerCase() === "contact us");
  const primaryNavigation = navigation.filter((item) => item !== contactLink);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isBlogLanding = pathname === "/blog";

  useEffect(() => {
    if (reduceMotion) return;

    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        const delta = currentScrollY - lastScrollY.current;

        if (currentScrollY === 0) {
          setIsHidden(false);
        } else if (Math.abs(delta) >= 8) {
          setIsHidden(delta > 0);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ticking.current = false;
    };
  }, [reduceMotion]);

  return (
    <motion.header
      className="sticky top-[23px] z-[100]"
      initial={isBlogLanding && !reduceMotion ? { y: "calc(-100% - 23px)", opacity: 0 } : false}
      animate={
        reduceMotion
          ? { y: 0, opacity: 1 }
          : { y: isHidden ? "calc(-100% - 23px)" : 0, opacity: 1 }
      }
      transition={{ duration: isBlogLanding && !isHidden ? 1.15 : 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      <Container>
        <div className="flex items-center gap-5 rounded-[10px] border border-white/15 bg-[linear-gradient(90deg,rgba(42,42,42,0.4),rgba(92,92,92,0.4),rgba(42,42,42,0.4))] px-[16px] py-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md md:pl-[24px] md:pr-[7.5px]">
          <Link
            href="/"
            aria-label={siteTitle}
            className="z-[99999] shrink-0 transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-80"
          >
            <Image src={logoSrc} alt={logoAlt} width={107} height={15} priority />
          </Link>
          <nav aria-label={navigationLabel} className="hidden min-w-0 flex-1 justify-center md:flex">
            <LinkList
              links={primaryNavigation}
              className="justify-center gap-5 lg:gap-8"
              itemClassName="text-geist-16 font-semibold text-[#E6E6E6] transition-colors duration-200 hover:text-basement-orange focus-visible:text-basement-orange"
            />
          </nav>
          {contactLink ? (
            <Link
              href={contactLink.href}
              target={contactLink.openInNewTab ? "_blank" : undefined}
              rel={contactLink.openInNewTab ? "noopener noreferrer" : undefined}
              className="group relative hidden shrink-0 overflow-hidden rounded-[8px] bg-black px-[16px] py-[5px] font-mono text-geist-mono-14 font-normal uppercase text-[#E6E6E6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-14px_28px_rgba(255,255,255,0.08),inset_0_10px_18px_rgba(0,0,0,0.92)] outline-none transition-colors duration-300 ease-out hover:text-black focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange md:block"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-8 -inset-y-4 origin-bottom scale-[0.72] opacity-25 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                style={{
                  background: "radial-gradient(62% 115% at 50% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 42%, rgba(255,255,255,0) 100%)"
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-center scale-[0.72] opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                style={{
                  background: "radial-gradient(62% 115% at 50% 100%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.14) 48%, rgba(0,0,0,0) 100%)"
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-black/15 opacity-0 blur-md transition-all duration-700 ease-out group-hover:left-[125%] group-hover:opacity-100 group-focus-visible:left-[125%] group-focus-visible:opacity-100"
              />
              <span className="relative z-10">{contactLink.label}</span>
            </Link>
          ) : null}
          <MobileNav items={navigation} logoSrc={logoSrc} logoAlt={logoAlt} navigationLabel={navigationLabel} labels={mobileLabels} />
        </div>
      </Container>
    </motion.header>
  );
}
