import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/sanity/queries/settings";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <Section>
      <Container className="max-w-2xl space-y-5">
        <h1 className="text-geist-38 font-semibold">{settings.ui?.pageNotFoundTitle}</h1>
        <p className="text-geist-16 text-muted">{settings.ui?.pageNotFoundDescription}</p>
        <Button asChild>
          <Link href="/blog">{settings.ui?.backToPostsLabel}</Link>
        </Button>
      </Container>
    </Section>
  );
}
