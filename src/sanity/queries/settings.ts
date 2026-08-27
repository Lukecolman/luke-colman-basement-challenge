import { sanityFetch } from "@/sanity/client";
import type { SanityImage } from "@/types/blog";

export type SiteLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  order?: number;
};

export type FooterColumn = {
  title: string;
  links: SiteLink[];
};

export type SiteSettings = {
  siteTitle?: string;
  siteDescription?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImage;
  };
  logo?: SanityImage;
  postPage?: {
    heroTitle?: string;
    featuredCtaLabel?: string;
    postsHeading?: string;
    filtersLabel?: string;
    cardCtaLabel?: string;
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    articleLabel?: string;
    dateFallback?: string;
    emptyArticleBody?: string;
  };
  ui?: {
    openNavigationLabel?: string;
    closeNavigationLabel?: string;
    menuLabel?: string;
    primaryNavigationLabel?: string;
    footerNavigationLabel?: string;
    postCategoriesLabel?: string;
    articleCategoriesLabel?: string;
    previousArticleLabel?: string;
    nextArticleLabel?: string;
    relatedPostsTitle?: string;
    loadMoreLabel?: string;
    pageNotFoundTitle?: string;
    pageNotFoundDescription?: string;
    backToPostsLabel?: string;
  };
  navigation?: SiteLink[];
  footerColumns?: FooterColumn[];
  footerCopyright?: string;
  footerMembershipText?: string;
  footerRightsReservedText?: string;
};

export const defaultSiteSettings: Required<
  Pick<
    SiteSettings,
    | "siteTitle"
    | "siteDescription"
    | "postPage"
    | "ui"
    | "navigation"
    | "footerColumns"
    | "footerCopyright"
    | "footerMembershipText"
    | "footerRightsReservedText"
  >
> = {
  siteTitle: "basement.",
  siteDescription: "Research, insights, and the science behind building brands & websites.",
  postPage: {
    heroTitle: "Research, insights, and the science behind building brands & websites.",
    featuredCtaLabel: "READ FULL BLOG POST",
    postsHeading: "Knowledge Is Meant to Be Shared",
    filtersLabel: "All posts",
    cardCtaLabel: "READ MORE",
    emptyStateTitle: "No posts found",
    emptyStateDescription: "Publish posts in Sanity to fill this listing.",
    articleLabel: "Article",
    dateFallback: "Basement",
    emptyArticleBody: "This article does not have body content yet."
  },
  ui: {
    openNavigationLabel: "Open navigation",
    closeNavigationLabel: "Close navigation",
    menuLabel: "Menu",
    primaryNavigationLabel: "Primary",
    footerNavigationLabel: "Footer",
    postCategoriesLabel: "Post categories",
    articleCategoriesLabel: "Article categories",
    previousArticleLabel: "Previous",
    nextArticleLabel: "Next",
    relatedPostsTitle: "Related Posts",
    loadMoreLabel: "Load more",
    pageNotFoundTitle: "Page not found",
    pageNotFoundDescription: "The page may have moved, or the article is not published yet.",
    backToPostsLabel: "Back to posts"
  },
  navigation: [
    { label: "Showcase", href: "https://www.basement.studio/showcase", openInNewTab: true, order: 0 },
    { label: "Services", href: "https://www.basement.studio/services", openInNewTab: true, order: 1 },
    { label: "People", href: "https://www.basement.studio/people", openInNewTab: true, order: 2 },
    { label: "Laboratory", href: "https://www.basement.studio/lab", openInNewTab: true, order: 3 },
    { label: "Blog", href: "/blog", order: 4 },
    { label: "Ventures", href: "https://www.basement.studio/", openInNewTab: true, order: 5 },
    { label: "Contact us", href: "https://www.basement.studio/", openInNewTab: true, order: 6 }
  ],
  footerColumns: [
    {
      title: "Website",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "https://www.basement.studio/services", openInNewTab: true },
        { label: "Showcase", href: "https://www.basement.studio/showcase", openInNewTab: true },
        { label: "People", href: "https://www.basement.studio/people", openInNewTab: true },
        { label: "Blog", href: "https://www.basement.studio/blog", openInNewTab: true },
        { label: "Lab", href: "https://www.basement.studio/lab", openInNewTab: true }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Use", href: "/terms" },
        { label: "Terms and Conditions", href: "/terms-and-conditions" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Trust Center", href: "/trust-center" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "X (Twitter)", href: "https://x.com/basementstudio", openInNewTab: true },
        { label: "Instagram", href: "https://www.instagram.com/basementdotstudio", openInNewTab: true },
        { label: "Github", href: "https://github.com/basementstudio", openInNewTab: true }
      ]
    }
  ],
  footerCopyright: "© BASEMENT.STUDIO LLC 2026. ALL RIGHTS RESERVED.",
  footerMembershipText: "PROUD MEMBER OF SODA",
  footerRightsReservedText: "ALL RIGHTS RESERVED."
};

function cleanLink(link?: SiteLink | null): SiteLink | null {
  const label = link?.label?.trim();
  const href = link?.href?.trim();

  if (!label || !href) return null;

  return {
    label,
    href,
    openInNewTab: Boolean(link?.openInNewTab),
    order: link?.order
  };
}

function sortLinks(links: SiteLink[]) {
  return [...links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await sanityFetch<SiteSettings>({
    query: `*[_type == "siteSettings"][0] {
      siteTitle,
      siteDescription,
      seo {
        title,
        description,
        image
      },
      logo,
      "postPage": {
        "heroTitle": coalesce(postPage.heroTitle, blogPage.heroTitle, blogPage.title),
        "featuredCtaLabel": postPage.featuredCtaLabel,
        "postsHeading": coalesce(postPage.postsHeading, blogPage.postsHeading),
        "filtersLabel": coalesce(postPage.filtersLabel, blogPage.filtersLabel),
        cardCtaLabel,
        emptyStateTitle,
        emptyStateDescription,
        articleLabel,
        dateFallback,
        emptyArticleBody
      },
      ui {
        openNavigationLabel,
        closeNavigationLabel,
        menuLabel,
        primaryNavigationLabel,
        footerNavigationLabel,
        postCategoriesLabel,
        articleCategoriesLabel,
        previousArticleLabel,
        nextArticleLabel,
        relatedPostsTitle,
        loadMoreLabel,
        pageNotFoundTitle,
        pageNotFoundDescription,
        backToPostsLabel
      },
      navigation[] { label, href, openInNewTab, order },
      footerColumns[] {
        title,
        links[] { label, href, openInNewTab }
      },
      footerCopyright,
      footerMembershipText,
      footerRightsReservedText
    }`,
    tags: ["site-settings"]
  });

  const navigation = sortLinks(
    (settings?.navigation ?? [])
      .map(cleanLink)
      .filter((link): link is SiteLink => Boolean(link))
  );

  const footerColumns = (settings?.footerColumns ?? [])
    .map((column) => ({
      title: column.title?.trim() ?? "",
      links: (column.links ?? [])
        .map(cleanLink)
        .filter((link): link is SiteLink => Boolean(link))
    }))
    .filter((column) => column.title && column.links.length > 0);

  return {
    ...defaultSiteSettings,
    ...(settings ?? {}),
    siteTitle: settings?.siteTitle?.trim() || defaultSiteSettings.siteTitle,
    siteDescription: settings?.siteDescription?.trim() || defaultSiteSettings.siteDescription,
    postPage: {
      ...defaultSiteSettings.postPage,
      ...(settings?.postPage ?? {}),
      heroTitle: settings?.postPage?.heroTitle?.trim() || defaultSiteSettings.postPage.heroTitle,
      featuredCtaLabel: settings?.postPage?.featuredCtaLabel?.trim() || defaultSiteSettings.postPage.featuredCtaLabel,
      postsHeading: settings?.postPage?.postsHeading?.trim() || defaultSiteSettings.postPage.postsHeading,
      filtersLabel: settings?.postPage?.filtersLabel?.trim() || defaultSiteSettings.postPage.filtersLabel,
      cardCtaLabel: settings?.postPage?.cardCtaLabel?.trim() || defaultSiteSettings.postPage.cardCtaLabel,
      emptyStateTitle: settings?.postPage?.emptyStateTitle?.trim() || defaultSiteSettings.postPage.emptyStateTitle,
      emptyStateDescription: settings?.postPage?.emptyStateDescription?.trim() || defaultSiteSettings.postPage.emptyStateDescription,
      articleLabel: settings?.postPage?.articleLabel?.trim() || defaultSiteSettings.postPage.articleLabel,
      dateFallback: settings?.postPage?.dateFallback?.trim() || defaultSiteSettings.postPage.dateFallback,
      emptyArticleBody: settings?.postPage?.emptyArticleBody?.trim() || defaultSiteSettings.postPage.emptyArticleBody
    },
    ui: {
      ...defaultSiteSettings.ui,
      openNavigationLabel: settings?.ui?.openNavigationLabel?.trim() || defaultSiteSettings.ui.openNavigationLabel,
      closeNavigationLabel: settings?.ui?.closeNavigationLabel?.trim() || defaultSiteSettings.ui.closeNavigationLabel,
      menuLabel: settings?.ui?.menuLabel?.trim() || defaultSiteSettings.ui.menuLabel,
      primaryNavigationLabel: settings?.ui?.primaryNavigationLabel?.trim() || defaultSiteSettings.ui.primaryNavigationLabel,
      footerNavigationLabel: settings?.ui?.footerNavigationLabel?.trim() || defaultSiteSettings.ui.footerNavigationLabel,
      postCategoriesLabel: settings?.ui?.postCategoriesLabel?.trim() || defaultSiteSettings.ui.postCategoriesLabel,
      articleCategoriesLabel: settings?.ui?.articleCategoriesLabel?.trim() || defaultSiteSettings.ui.articleCategoriesLabel,
      previousArticleLabel: settings?.ui?.previousArticleLabel?.trim() || defaultSiteSettings.ui.previousArticleLabel,
      nextArticleLabel: settings?.ui?.nextArticleLabel?.trim() || defaultSiteSettings.ui.nextArticleLabel,
      relatedPostsTitle: settings?.ui?.relatedPostsTitle?.trim() || defaultSiteSettings.ui.relatedPostsTitle,
      loadMoreLabel: settings?.ui?.loadMoreLabel?.trim() || defaultSiteSettings.ui.loadMoreLabel,
      pageNotFoundTitle: settings?.ui?.pageNotFoundTitle?.trim() || defaultSiteSettings.ui.pageNotFoundTitle,
      pageNotFoundDescription: settings?.ui?.pageNotFoundDescription?.trim() || defaultSiteSettings.ui.pageNotFoundDescription,
      backToPostsLabel: settings?.ui?.backToPostsLabel?.trim() || defaultSiteSettings.ui.backToPostsLabel
    },
    navigation: navigation.length > 0 ? navigation : defaultSiteSettings.navigation,
    footerColumns: footerColumns.length > 0 ? footerColumns : defaultSiteSettings.footerColumns,
    footerCopyright: settings?.footerCopyright?.trim() || defaultSiteSettings.footerCopyright,
    footerMembershipText: settings?.footerMembershipText?.trim() || defaultSiteSettings.footerMembershipText,
    footerRightsReservedText: settings?.footerRightsReservedText?.trim() || defaultSiteSettings.footerRightsReservedText
  };
}
