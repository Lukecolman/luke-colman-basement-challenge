"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LinkList } from "@/components/layout/link-list";
import { IconButton } from "@/components/ui/icon-button";

type MobileNavProps = {
  items: Array<{ label: string; href: string; openInNewTab?: boolean }>;
  navigationLabel?: string;
  labels?: { open: string; close: string; menu: string };
};

export function MobileNav({ items, navigationLabel = "Primary", labels = { open: "Open navigation", close: "Close navigation", menu: "Menu" } }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      if (hasOpenedRef.current) openButtonRef.current?.focus();
      return;
    }

    hasOpenedRef.current = true;
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <IconButton
        ref={openButtonRef}
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="border-white/20 bg-black text-white hover:bg-black hover:text-basement-orange"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" size={20} />
      </IconButton>

      {open ? (
        <div
          ref={dialogRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={navigationLabel}
          className="fixed inset-0 z-50 bg-black p-5 text-white"
        >
          <div className="flex items-center justify-between">
            <span className="text-geist-13 font-semibold uppercase text-basement-orange">{labels.menu}</span>
            <IconButton
              ref={closeButtonRef}
              aria-label={labels.close}
              className="border-white/20 bg-black text-white hover:bg-black hover:text-basement-orange"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" size={20} />
            </IconButton>
          </div>
          <nav aria-label="Mobile primary" className="mt-12">
            <LinkList
              links={items}
              className="grid gap-4"
              itemClassName="text-geist-24 font-semibold text-white transition-colors duration-200 hover:text-basement-orange focus-visible:text-basement-orange"
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
