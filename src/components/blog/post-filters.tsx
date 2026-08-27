"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/sanity/queries/settings";
import type { Category } from "@/types/blog";

type PostFiltersProps = {
  categories: Category[];
  settings: SiteSettings;
  activeCategorySlug?: string;
  onCategoryChange?: (slug?: string) => void;
};

export function PostFilters({ categories, settings, activeCategorySlug, onCategoryChange }: PostFiltersProps) {
  const filtersRef = useRef<HTMLElement>(null);
  const dragState = useRef({
    isDragging: false,
    suppressClick: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: null as number | null,
  });
  const postPage = settings.postPage;
  const filterClassName =
    "font-mono text-geist-mono-14 font-normal uppercase text-basement-grey transition-colors duration-200 hover:text-black focus-visible:text-black";
  const isInteractiveFilter = typeof onCategoryChange === "function";

  useLayoutEffect(() => {
    const filters = filtersRef.current?.querySelectorAll<HTMLElement>("[data-filter-item]");

    if (!filters?.length) return;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set(filters, { opacity: 0, y: 12 });
      gsap.to(filters, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.35,
      });
    }, filtersRef);

    return () => context.revert();
  }, [categories.length, postPage?.filtersLabel]);

  return (
    <nav
      ref={filtersRef}
      aria-label={settings.ui?.postCategoriesLabel}
      className="flex w-full cursor-grab select-none flex-nowrap touch-pan-x gap-x-8 overflow-x-auto overscroll-x-contain whitespace-nowrap pb-1 active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0 [&>*:last-child]:mr-6 md:flex-wrap md:gap-x-12 md:gap-y-4 md:overflow-visible md:whitespace-normal md:pb-0 md:[&>*:last-child]:mr-0"
      onPointerDown={(event) => {
        const filters = filtersRef.current;
        if (!filters) return;

        dragState.current = {
          isDragging: false,
          suppressClick: false,
          startX: event.clientX,
          scrollLeft: filters.scrollLeft,
          pointerId: event.pointerId,
        };
      }}
      onPointerMove={(event) => {
        const filters = filtersRef.current;
        const state = dragState.current;
        if (!filters || state.pointerId !== event.pointerId) return;

        const distance = Math.abs(event.clientX - state.startX);
        if (!state.isDragging && distance < 6) return;

        if (!state.isDragging) {
          state.isDragging = true;
          state.suppressClick = true;
          filters.setPointerCapture(event.pointerId);
        }

        event.preventDefault();
        filters.scrollLeft = state.scrollLeft - (event.clientX - state.startX);
      }}
      onPointerUp={(event) => {
        const filters = filtersRef.current;
        const state = dragState.current;
        if (state.pointerId !== event.pointerId) return;

        state.isDragging = false;
        state.pointerId = null;
        if (filters?.hasPointerCapture(event.pointerId)) {
          filters.releasePointerCapture(event.pointerId);
        }
      }}
      onPointerCancel={() => {
        dragState.current.isDragging = false;
        dragState.current.pointerId = null;
      }}
      onClick={(event) => {
        if (!dragState.current.suppressClick) return;

        event.preventDefault();
        event.stopPropagation();
        dragState.current.suppressClick = false;
      }}
      onDragStart={(event) => {
        event.preventDefault();
      }}
    >
      {isInteractiveFilter ? (
          <button
            type="button"
            data-filter-item
          onClick={() => onCategoryChange?.(undefined)}
          className={cn(filterClassName, !activeCategorySlug && "text-black")}
          aria-pressed={!activeCategorySlug}
        >
          {postPage?.filtersLabel}
        </button>
      ) : (
        <Link data-filter-item href="/blog" className={cn(filterClassName, !activeCategorySlug && "text-black")}>
          {postPage?.filtersLabel}
        </Link>
      )}
      {categories.map((category) => (
        isInteractiveFilter ? (
          <button
            key={category.slug}
            type="button"
            data-filter-item
            onClick={() => onCategoryChange?.(category.slug)}
            className={cn(filterClassName, activeCategorySlug === category.slug && "text-black")}
            aria-pressed={activeCategorySlug === category.slug}
          >
            {category.title}
          </button>
        ) : (
          <Link
            key={category.slug}
            data-filter-item
            href={`/category/${category.slug}`}
            className={cn(filterClassName, activeCategorySlug === category.slug && "text-black")}
          >
            {category.title}
          </Link>
        )
      ))}
    </nav>
  );
}
