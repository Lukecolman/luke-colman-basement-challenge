import { HeroGlowBackground } from "@/components/blog/hero-glow-background";
import { HeroBanner } from "@/components/blog/hero-banner";
import { Container } from "@/components/layout/container";
import { HeroSection } from "@/components/layout/hero-section";
import { Section } from "@/components/layout/section";
import type { SiteSettings } from "@/sanity/queries/settings";
import type { PostSummary } from "@/types/blog";

type PostHeroProps = {
  settings: SiteSettings;
  featuredPost?: PostSummary;
};

export function PostHero({ settings, featuredPost }: PostHeroProps) {
  const title = settings.postPage?.heroTitle ?? "";

  return (
    <Section className="relative overflow-hidden bg-black py-2.5 text-[#E6E6E6] md:py-24">
      <HeroGlowBackground />
      <div className="relative z-10">
        <HeroSection title={title} />
        {featuredPost ? (
          <Container className="pt-28 md:pt-40">
            <HeroBanner
              post={featuredPost}
              ctaLabel={settings.postPage?.featuredCtaLabel}
              dateFallback={settings.postPage?.dateFallback}
            />
          </Container>
        ) : null}
      </div>
    </Section>
  );
}
