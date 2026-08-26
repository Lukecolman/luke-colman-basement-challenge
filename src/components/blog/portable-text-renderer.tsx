import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";

type PortableTextRendererProps = {
  value?: PortableTextBlock[];
  emptyMessage?: string;
};

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      const external = href.startsWith("http");

      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    }
  }
};

export function PortableTextRenderer({ value, emptyMessage = "This article does not have body content yet." }: PortableTextRendererProps) {
  if (!value?.length) {
    return <p className="text-geist-16 text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="max-w-none space-y-6 text-geist-16 text-foreground md:text-geist-24 [&_a]:font-medium [&_a]:text-accent [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:text-geist-24 [&_blockquote]:font-semibold [&_h2]:pt-8 [&_h2]:text-geist-38 [&_h2]:font-semibold [&_h3]:pt-6 [&_h3]:text-geist-24 [&_h3]:font-semibold [&_li]:ml-5">
      <PortableText value={value} components={components} />
    </div>
  );
}
