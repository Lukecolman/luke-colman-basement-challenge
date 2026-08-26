"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-ui border border-border bg-surface text-foreground transition-colors hover:bg-background",
        className
      )}
      {...props}
    />
  );
});
