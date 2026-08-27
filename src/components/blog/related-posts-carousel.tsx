"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type RelatedPostsCarouselProps = {
  children: ReactNode;
  className?: string;
};

export function RelatedPostsCarousel({ children, className }: RelatedPostsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    isDragging: false,
    suppressClick: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: null as number | null,
  });

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollerRef}
        className={cn(
          "flex cursor-grab select-none gap-8 overflow-x-auto overscroll-x-contain pb-4 pr-20 active:cursor-grabbing md:pr-28 lg:pr-40",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}
        onPointerDown={(event) => {
          const scroller = scrollerRef.current;
          if (!scroller) return;

          dragState.current = {
            isDragging: false,
            suppressClick: false,
            startX: event.clientX,
            scrollLeft: scroller.scrollLeft,
            pointerId: event.pointerId,
          };
        }}
        onPointerMove={(event) => {
          const scroller = scrollerRef.current;
          const state = dragState.current;
          if (!scroller || state.pointerId !== event.pointerId) return;

          const distance = Math.abs(event.clientX - state.startX);
          if (!state.isDragging && distance < 6) return;

          if (!state.isDragging) {
            state.isDragging = true;
            state.suppressClick = true;
            scroller.setPointerCapture(event.pointerId);
          }

          event.preventDefault();
          scroller.scrollLeft = state.scrollLeft - (event.clientX - state.startX);
        }}
        onPointerUp={(event) => {
          const scroller = scrollerRef.current;
          const state = dragState.current;
          if (state.pointerId !== event.pointerId) return;

          state.isDragging = false;
          state.pointerId = null;
          if (scroller?.hasPointerCapture(event.pointerId)) {
            scroller.releasePointerCapture(event.pointerId);
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
        {children}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-black/0 to-black md:w-32"
      />
    </div>
  );
}
