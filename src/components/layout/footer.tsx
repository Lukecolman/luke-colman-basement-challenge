import Image from "next/image";
import { Container } from "@/components/layout/container";
import { LinkList } from "@/components/layout/link-list";
import type { FooterColumn } from "@/sanity/queries/settings";

type FooterProps = {
  columns: FooterColumn[];
  copyright: string;
  navigationLabel?: string;
};

const FOOTER_MEMBERSHIP_TEXT = "PROUD MEMBER OF SODA";
const RIGHTS_RESERVED_TEXT = "ALL RIGHTS RESERVED.";

export function Footer({ columns, copyright, navigationLabel = "Footer" }: FooterProps) {
  const mobileCopyright = copyright.replace(RIGHTS_RESERVED_TEXT, "").trim();

  return (
    <footer className="relative overflow-hidden border-t border-basement-grey bg-black py-5 md:py-8 lg:py-10">
      <Container className="text-geist-16 text-basement-grey">
        <nav aria-label={navigationLabel} className="grid grid-cols-3 gap-x-4 gap-y-8 text-[12px] md:text-geist-16 lg:gap-x-20 lg:gap-y-12">
          {columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h2 className="font-mono text-[12px] font-normal uppercase tracking-[-0.01em] text-basement-orange md:text-geist-mono-14">{column.title}</h2>
              <LinkList
                links={column.links}
                className="grid gap-2"
                itemClassName="text-[12px] font-semibold text-white transition-colors duration-200 hover:text-basement-orange focus-visible:text-basement-orange md:text-geist-16"
              />
            </div>
          ))}
        </nav>
        <div aria-hidden="true" className="relative left-1/2 mt-14 aspect-[107/15] w-screen -translate-x-1/2 md:left-auto md:mt-16 md:w-full md:translate-x-0 lg:mt-20">
          <div className="h-full w-full bg-[linear-gradient(180deg,#000000_0%,#434343_100%)] [mask-image:url('/assets/basement.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%]" />
          <div className="pointer-events-none absolute inset-0 backdrop-blur-[1px] [mask-image:url('/assets/basement.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] md:backdrop-blur-[2px]" />
        </div>
        <div className="mt-3 flex items-end justify-between gap-4 font-mono text-[12px] uppercase leading-[1.15] tracking-[-0.01em] text-basement-grey md:text-geist-mono-14 md:leading-[1.1]">
          <p className="max-w-[15rem] text-[9px] md:max-w-none md:text-inherit">
            <span className="md:hidden">
              {mobileCopyright}
              <br />
              {RIGHTS_RESERVED_TEXT}
            </span>
            <span className="hidden md:inline">{copyright}</span>
          </p>
          <div className="flex items-center gap-2 text-right">
            <p className="text-[9px] md:text-inherit">{FOOTER_MEMBERSHIP_TEXT}</p>
            <Image src="/assets/logo-soda.svg" alt="" width={11} height={13} className="h-[13px] w-auto shrink-0" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
