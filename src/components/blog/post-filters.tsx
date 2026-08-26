import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/sanity/queries/settings";
import type { Category } from "@/types/blog";

type PostFiltersProps = {
  categories: Category[];
  settings: SiteSettings;
  activeCategorySlug?: string;
};

export function PostFilters({ categories, settings, activeCategorySlug }: PostFiltersProps) {
  const postPage = settings.postPage;

  return (
    <nav
      aria-label={settings.ui?.postCategoriesLabel}
      className="flex w-full flex-wrap gap-x-8 gap-y-4 md:gap-x-12"
    >
      <Link
        href="/blog"
        className={cn(
          "font-mono text-geist-mono-14 font-normal uppercase text-basement-grey transition-colors duration-200 hover:text-black focus-visible:text-black",
          !activeCategorySlug && "text-black"
        )}
      >
        {postPage?.filtersLabel}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className={cn(
            "font-mono text-geist-mono-14 font-normal uppercase text-basement-grey transition-colors duration-200 hover:text-black focus-visible:text-black",
            activeCategorySlug === category.slug && "text-black"
          )}
        >
          {category.title}
        </Link>
      ))}
    </nav>
  );
}
