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
    <>
      <HeroSection title={title} />
      {featuredPost ? (
        <Section className="bg-black pt-0">
          <Container>
            <HeroBanner
              post={featuredPost}
              ctaLabel="READ FULL BLOG POST"
              dateFallback={settings.postPage?.dateFallback}
            />
          </Container>
        </Section>
      ) : null}
    </>
  );
}
