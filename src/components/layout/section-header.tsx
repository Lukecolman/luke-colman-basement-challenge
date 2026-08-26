import type { PortableTextBlock } from "next-sanity";
import { RichText } from "@/components/blog/rich-text";

type SectionHeaderProps = {
  title: string;
  description?: PortableTextBlock[];
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <h2 className="text-geist-38 font-semibold md:text-geist-76">{title}</h2>
      <RichText value={description} className="text-geist-16 text-muted md:text-geist-24" />
    </div>
  );
}
