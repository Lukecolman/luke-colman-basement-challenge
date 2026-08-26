import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { cn } from "@/lib/utils";

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
  },
  block: {
    normal: ({ children }) => <p>{children}</p>
  }
};

type RichTextProps = {
  value?: PortableTextBlock[];
  className?: string;
};

export function RichText({ value, className }: RichTextProps) {
  if (!value?.length) return null;

  return (
    <div className={cn("[&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
