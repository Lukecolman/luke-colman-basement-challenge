import Link from "next/link";
import type { PortableTextBlock } from "next-sanity";
import { RichText } from "@/components/blog/rich-text";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { SiteLink } from "@/sanity/queries/settings";

type HeroSectionProps = {
  title: string;
  body?: PortableTextBlock[];
  cta?: SiteLink;
};

export function HeroSection({ title, body, cta }: HeroSectionProps) {
  return (
    <Section className="bg-black text-white">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="space-y-6">
          <h1 className="max-w-5xl text-geist-38 font-semibold md:text-geist-76">{title}</h1>
        </div>
        {(body?.length || cta) ? (
          <div className="space-y-5 text-white">
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
    </Section>
  );
}
