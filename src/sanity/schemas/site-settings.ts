import { defineArrayMember, defineField, defineType } from "sanity";
import { seoFields } from "./objects";

const linkFields = [
  defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required().min(1).max(60) }),
  defineField({ name: "href", title: "Href", type: "string", validation: (rule) => rule.required().min(1).max(500) }),
  defineField({ name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false })
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  initialValue: {
    siteTitle: "basement.",
    siteDescription: "Research, insights, and the science behind building brands & websites.",
    navigation: [
      { label: "Showcase", href: "https://www.basement.studio/showcase", openInNewTab: true, order: 0 },
      { label: "Services", href: "https://www.basement.studio/services", openInNewTab: true, order: 1 },
      { label: "People", href: "https://www.basement.studio/people", openInNewTab: true, order: 2 },
      { label: "Laboratory", href: "https://www.basement.studio/lab", openInNewTab: true, order: 3 },
      { label: "Blog", href: "/blog", order: 4 },
      { label: "Ventures", href: "https://www.basement.studio/", openInNewTab: true, order: 5 },
      { label: "Contact us", href: "https://www.basement.studio/", openInNewTab: true, order: 6 }
    ],
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
  },
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "siteDescription", title: "Site description", type: "text", rows: 3 }),
    defineField({
      name: "postPage",
      title: "Post page",
      type: "object",
      fields: [
        defineField({
          name: "heroTitle",
          title: "Hero title",
          type: "text",
          rows: 2,
          validation: (rule) => rule.max(180)
        }),
        defineField({ name: "featuredCtaLabel", title: "Featured post CTA label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({
          name: "postsHeading",
          title: "Posts heading",
          type: "string",
          validation: (rule) => rule.max(100)
        }),
        defineField({
          name: "filtersLabel",
          title: "Filters label",
          type: "string",
          validation: (rule) => rule.max(60)
        }),
        defineField({ name: "cardCtaLabel", title: "Post card CTA label", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "emptyStateTitle", title: "Empty state title", type: "string", validation: (rule) => rule.max(100) }),
        defineField({ name: "emptyStateDescription", title: "Empty state description", type: "text", rows: 2, validation: (rule) => rule.max(180) }),
        defineField({ name: "articleLabel", title: "Article fallback label", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "dateFallback", title: "Date fallback label", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "emptyArticleBody", title: "Empty article body", type: "string", validation: (rule) => rule.max(180) })
      ]
    }),
    defineField({
      name: "ui",
      title: "Interface labels",
      type: "object",
      fields: [
        defineField({ name: "openNavigationLabel", title: "Open navigation label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "closeNavigationLabel", title: "Close navigation label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "menuLabel", title: "Mobile menu label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "primaryNavigationLabel", title: "Primary navigation label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "footerNavigationLabel", title: "Footer navigation label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "postCategoriesLabel", title: "Post categories label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "articleCategoriesLabel", title: "Article categories label", type: "string", validation: (rule) => rule.max(60) }),
        defineField({ name: "previousArticleLabel", title: "Previous article label", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "nextArticleLabel", title: "Next article label", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "relatedPostsTitle", title: "Related posts title", type: "string", validation: (rule) => rule.max(80) }),
        defineField({ name: "loadMoreLabel", title: "Load more label", type: "string", validation: (rule) => rule.max(40) }),
        defineField({ name: "pageNotFoundTitle", title: "404 title", type: "string", validation: (rule) => rule.max(100) }),
        defineField({ name: "pageNotFoundDescription", title: "404 description", type: "text", rows: 2, validation: (rule) => rule.max(180) }),
        defineField({ name: "backToPostsLabel", title: "Back to posts label", type: "string", validation: (rule) => rule.max(60) })
      ]
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })]
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [{
        type: "object",
        fields: [...linkFields, defineField({ name: "order", title: "Order", type: "number" })]
      }]
    }),
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().min(1).max(60) }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: linkFields
                })
              ],
              validation: (rule) => rule.required().min(1)
            })
          ]
        })
      ]
    }),
    defineField({ name: "footerCopyright", title: "Footer copyright", type: "string", validation: (rule) => rule.max(140) }),
    defineField({ name: "footerMembershipText", title: "Footer membership text", type: "string", validation: (rule) => rule.max(100) }),
    defineField({ name: "footerRightsReservedText", title: "Footer rights reserved text", type: "string", validation: (rule) => rule.max(60) }),
    seoFields
  ],
  preview: {
    prepare: () => ({ title: "Site settings" })
  }
});
