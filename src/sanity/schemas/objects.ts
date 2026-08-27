import { createElement } from "react";
import { defineArrayMember, defineField, type BlockStyleProps } from "sanity";

function QuoteStyle(props: BlockStyleProps) {
  return createElement(
    "blockquote",
    {
      style: {
        borderLeft: "2px solid currentColor",
        margin: 0,
        paddingLeft: "0.75rem"
      }
    },
    props.children
  );
}

const portableTextBlocks = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading 2", value: "h2" },
      { title: "Heading 3", value: "h3" },
      { title: "Quote", value: "blockquote", component: QuoteStyle }
    ],
    marks: {
      annotations: [
        {
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto"] })
            })
          ]
        }
      ]
    }
  }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        validation: (rule) => rule.required()
      })
    ]
  })
];

export const seoFields = defineField({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Meta title", type: "string" }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Social image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alternative text", type: "string" })]
    })
  ]
});

export const portableText = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: portableTextBlocks
});

export const introPortableText = defineField({
  name: "intro",
  title: "Intro",
  type: "array",
  description: "Content shown in the post hero before the main article body.",
  of: portableTextBlocks
});
