import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/layout/container";
import { LinkList } from "@/components/layout/link-list";
import type { SiteLink } from "@/sanity/queries/settings";

type HeaderProps = {
  siteTitle: string;
  navigation: SiteLink[];
  navigationLabel?: string;
  mobileLabels?: { open: string; close: string; menu: string };
};

export function Header({ siteTitle, navigation, navigationLabel = "Primary", mobileLabels }: HeaderProps) {
  const contactLink = navigation.find((item) => item.label.trim().toLowerCase() === "contact us");
  const primaryNavigation = navigation.filter((item) => item !== contactLink);

  return (
    <header className="sticky top-0 z-40 mt-[23px]">
      <Container>
        <div className="flex items-center gap-5 rounded-[10px] border border-white/15 bg-[linear-gradient(90deg,rgba(74,74,74,0.4),rgba(153,153,153,0.4),rgba(74,74,74,0.4))] pl-[24px] pr-[7.5px] py-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <Link
            href="/"
            aria-label={siteTitle}
            className="shrink-0 transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-80"
          >
            <Image src="/assets/basement.svg" alt={siteTitle} width={107} height={15} priority />
          </Link>
          <nav aria-label={navigationLabel} className="hidden min-w-0 flex-1 justify-center md:flex">
            <LinkList
              links={primaryNavigation}
              className="justify-center gap-5 lg:gap-8"
              itemClassName="text-geist-16 font-semibold text-white transition-colors duration-200 hover:text-basement-orange focus-visible:text-basement-orange"
            />
          </nav>
          {contactLink ? (
            <Link
              href={contactLink.href}
              target={contactLink.openInNewTab ? "_blank" : undefined}
              rel={contactLink.openInNewTab ? "noopener noreferrer" : undefined}
              className="hidden shrink-0 rounded-[10px] border border-white/10 bg-black px-5 py-3 text-geist-13 font-semibold uppercase text-white transition-colors duration-200 hover:text-basement-orange focus-visible:text-basement-orange md:block"
            >
              {contactLink.label}
            </Link>
          ) : null}
          <MobileNav items={navigation} navigationLabel={navigationLabel} labels={mobileLabels} />
        </div>
      </Container>
    </header>
  );
}
