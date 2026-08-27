"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SiteLink } from "@/sanity/queries/settings";

type LinkListProps = {
  links: SiteLink[];
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
};

export function LinkList({ links, className, itemClassName, onNavigate }: LinkListProps) {
  const pathname = usePathname();

  function normalizePath(path: string) {
    if (path === "/") return "/";
    return path.replace(/\/+$/, "");
  }

  function isActive(href: string) {
    const normalizedHref = normalizePath(href);
    const normalizedPathname = normalizePath(pathname);

    if (normalizedHref === "/") return normalizedPathname === "/";
    return normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`);
  }

  return (
    <ul className={cn("flex flex-wrap items-center gap-6", className)}>
      {links.map((item) => (
        <li key={`${item.label}-${item.href}`}>
          <Link
            href={item.href}
            target={item.openInNewTab ? "_blank" : undefined}
            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
            aria-current={isActive(item.href) ? "page" : undefined}
            className={cn(
              itemClassName,
              isActive(item.href) && "text-basement-orange hover:text-basement-orange focus-visible:text-basement-orange"
            )}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
