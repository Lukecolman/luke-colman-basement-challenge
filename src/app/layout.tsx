import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/constants";
import { getSiteSettings } from "@/sanity/queries/settings";
import { ConsoleBanner } from "@/components/layout/console-banner";
import "@/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

const defaultOgImage = {
  url: "/images/OG.webp",
  width: 1200,
  height: 630,
  alt: "basement."
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seo?.title?.trim() || settings.siteTitle || siteConfig.name;
  const description = settings.seo?.description?.trim() || settings.siteDescription || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: settings.siteTitle || title,
      type: "website",
      images: [defaultOgImage]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url]
    }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <ConsoleBanner />
        {children}
      </body>
    </html>
  );
}
