import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export function Button({ asChild, className, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-ui bg-foreground px-5 text-geist-16 font-semibold text-background transition-transform duration-200 ease-standard hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
