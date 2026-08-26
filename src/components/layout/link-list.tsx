import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SiteLink } from "@/sanity/queries/settings";

type LinkListProps = {
  links: SiteLink[];
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
};

export function LinkList({ links, className, itemClassName, onNavigate }: LinkListProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-6", className)}>
      {links.map((item) => (
        <li key={`${item.label}-${item.href}`}>
          <Link
            href={item.href}
            target={item.openInNewTab ? "_blank" : undefined}
            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
            className={itemClassName}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
