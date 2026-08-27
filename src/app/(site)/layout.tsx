import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/lib/constants";
import { getSiteSettings } from "@/sanity/queries/settings";
import { urlForImage } from "@/sanity/image";

export default async function SiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  const settings = await getSiteSettings();
  const logoSrc = urlForImage(settings.logo)?.width(214).auto("format").url() ?? "/assets/basement.svg";
  const logoAlt = settings.logo?.alt?.trim() || settings.siteTitle || siteConfig.name;

  return (
    <>
      <Header
        siteTitle={settings.siteTitle ?? siteConfig.name}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        navigation={settings.navigation ?? []}
        navigationLabel={settings.ui?.primaryNavigationLabel}
        mobileLabels={{
          open: settings.ui?.openNavigationLabel ?? "Open navigation",
          close: settings.ui?.closeNavigationLabel ?? "Close navigation",
          menu: settings.ui?.menuLabel ?? "Menu"
        }}
      />
      <main id="main">{children}</main>
      <Footer
        columns={settings.footerColumns ?? []}
        copyright={settings.footerCopyright ?? settings.siteTitle ?? siteConfig.name}
        membershipText={settings.footerMembershipText}
        rightsReservedText={settings.footerRightsReservedText}
        navigationLabel={settings.ui?.footerNavigationLabel}
      />
    </>
  );
}
