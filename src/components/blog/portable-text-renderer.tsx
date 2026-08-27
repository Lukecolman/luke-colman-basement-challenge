import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import { cn } from "@/lib/utils";

type PortableTextRendererProps = {
  value?: PortableTextBlock[];
  emptyMessage?: string;
  tone?: "body" | "intro";
};

function isEmptyTextBlock(value?: PortableTextBlock) {
  return value?.children?.every((child) => !("text" in child) || !child.text?.trim()) ?? false;
}

type SpacerBlock = PortableTextBlock & {
  spacerSize: "small" | "large";
};

function normalizeValue(value: PortableTextBlock[]) {
  return value.reduce<PortableTextBlock[]>((blocks, block, index) => {
    if (!isEmptyTextBlock(block)) {
      blocks.push(block);
      return blocks;
    }

    const previousBlock = value[index - 1];
    const nextBlock = value[index + 1];

    if (!previousBlock || !nextBlock) return blocks;
    if (previousBlock && isEmptyTextBlock(previousBlock)) return blocks;

    blocks.push({
      ...block,
      _type: "spacer",
      spacerSize: isEmptyTextBlock(nextBlock) ? "large" : "small"
    } as SpacerBlock);

    return blocks;
  }, []);
}

function createComponents(tone: NonNullable<PortableTextRendererProps["tone"]>): PortableTextComponents {
  return {
    hardBreak: () => <br />,
    types: {
      spacer: ({ value }) => (
        <div aria-hidden="true" className={value.spacerSize === "large" ? "mt-12 h-0 md:mt-20" : "mt-4 h-0 md:mt-6"} />
      )
    },
    block: {
      normal: ({ children }) => (
        <p className="m-0 mb-6 whitespace-pre-line last:mb-0">{children}</p>
      ),
      h2: ({ children }) => (
        <h2
          tabIndex={0}
          className={cn(
            "m-0 mb-6 whitespace-pre-line focus:outline-none focus-visible:text-basement-orange last:mb-0",
            tone === "intro" ? "text-geist-20 font-normal md:text-geist-24" : "text-geist-24 font-semibold md:text-geist-38"
          )}
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          className={cn(
            "m-0 mb-6 whitespace-pre-line last:mb-0",
            tone === "intro"
              ? "text-geist-20 font-normal leading-[1.1] tracking-[-0.03em] md:text-geist-24"
              : "text-geist-14 font-semibold leading-[1.3] tracking-normal md:text-geist-24"
          )}
        >
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote
          className={
            tone === "intro"
              ? "m-0 mb-6 whitespace-pre-line text-geist-16 font-semibold leading-[1.35] text-basement-light-grey last:mb-0 [&>p]:m-0"
              : "m-0 mb-6 whitespace-pre-line text-geist-24 font-semibold leading-[1.15] text-basement-light-grey last:mb-0 md:text-[2rem] [&>p]:m-0"
          }
        >
          {children}
        </blockquote>
      )
    },
    list: {
      bullet: ({ children }) => <ul className="m-0 mb-6 list-disc space-y-3 pl-6 marker:text-basement-orange last:mb-0">{children}</ul>,
      number: ({ children }) => <ol className="m-0 mb-6 list-decimal space-y-3 pl-6 marker:text-basement-orange last:mb-0">{children}</ol>
    },
    marks: {
      strong: ({ children }) => <strong className="text-geist-14 font-semibold text-basement-light-grey md:text-geist-16">{children}</strong>,
      em: ({ children }) => (
        <em className="text-geist-13 font-semibold not-italic text-[#666666] md:text-geist-16">{children}</em>
      ),
      link: ({ children, value }) => {
        const href = typeof value?.href === "string" ? value.href : "";
        const external = href.startsWith("http");

        return (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="text-basement-light-grey transition-colors hover:text-basement-orange focus-visible:text-basement-orange"
          >
            {children}
          </a>
        );
      }
    }
  };
}

export function PortableTextRenderer({
  value,
  emptyMessage = "This article does not have body content yet.",
  tone = "body"
}: PortableTextRendererProps) {
  if (!value?.length) {
    return <p className="text-geist-16 text-muted">{emptyMessage}</p>;
  }

  return (
    <div
      className={cn(
        "max-w-none text-basement-medium-grey [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4",
        tone === "intro"
          ? "text-geist-14 font-normal leading-[1.45] md:text-geist-16"
          : "text-geist-14 font-normal leading-[1.5] md:text-geist-16 md:leading-[1.45]"
      )}
    >
      <PortableText value={normalizeValue(value)} components={createComponents(tone)} />
    </div>
  );
}
