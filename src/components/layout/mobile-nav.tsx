"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconButton } from "@/components/ui/icon-button";
import type { SiteLink } from "@/sanity/queries/settings";

type MobileNavProps = {
  items: SiteLink[];
  navigationLabel?: string;
  labels?: { open: string; close: string; menu: string };
};

function HamburgerIcon() {
  return (
    <svg aria-hidden="true" width="40" height="10" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0.5H40" stroke="#E6E6E6" />
      <path d="M0 5H40" stroke="#E6E6E6" />
      <path d="M0 9.5H40" stroke="#E6E6E6" />
    </svg>
  );
}

function isActivePath(pathname: string, href: string) {
  const current = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  return target === "/" ? current === "/" : current === target || current.startsWith(`${target}/`);
}

function ContactButton({ link }: { link: SiteLink }) {
  return (
    <Link
      href={link.href}
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
      className="group relative block w-full overflow-hidden rounded-[8px] bg-black px-4 py-3 text-center font-mono text-geist-mono-14 font-normal uppercase text-[#E6E6E6] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-14px_28px_rgba(255,255,255,0.08),inset_0_10px_18px_rgba(0,0,0,0.92)] outline-none transition-colors duration-300 ease-out hover:text-black focus-visible:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-basement-orange"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -inset-x-8 -inset-y-4 origin-bottom scale-[0.72] opacity-25 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" style={{ background: "radial-gradient(62% 115% at 50% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 42%, rgba(255,255,255,0) 100%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 origin-center scale-[0.72] opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" style={{ background: "radial-gradient(62% 115% at 50% 100%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.14) 48%, rgba(0,0,0,0) 100%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-black/15 opacity-0 blur-md transition-all duration-700 ease-out group-hover:left-[125%] group-hover:opacity-100 group-focus-visible:left-[125%] group-focus-visible:opacity-100" />
      <span className="relative z-10">{link.label}</span>
    </Link>
  );
}

export function MobileNav({ items, navigationLabel = "Primary", labels = { open: "Open navigation", close: "Close navigation", menu: "Menu" } }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const contactLink = items.find((item) => item.label.trim().toLowerCase() === "contact us");
  const menuItems = items.filter((item) => item !== contactLink);

  useEffect(() => {
    if (!open) {
      if (hasOpenedRef.current) openButtonRef.current?.focus();
      document.body.style.overflow = "";
      return;
    }

    hasOpenedRef.current = true;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="ml-auto md:hidden">
      <IconButton ref={openButtonRef} aria-label={labels.open} aria-expanded={open} aria-controls="mobile-navigation" className="h-auto w-auto rounded-none border-0 bg-transparent p-0 text-[#E6E6E6] hover:bg-transparent hover:text-[#E6E6E6]" onClick={() => setOpen(true)}>
        <HamburgerIcon />
      </IconButton>

      {typeof document !== "undefined" ? createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div ref={dialogRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label={navigationLabel} className="fixed inset-0 z-[9999] flex h-full flex-col bg-black text-[#E6E6E6]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}>
              <div className="relative z-[10000] flex items-center justify-between px-[28px] pt-[23px] sm:px-[40px]">
                <Link href="/" aria-label="Basement" onClick={() => setOpen(false)}>
                  <Image src="/assets/basement.svg" alt="Basement" width={107} height={15} priority />
                </Link>
                <IconButton ref={closeButtonRef} aria-label={labels.close} className="size-10 rounded-none border-0 bg-transparent p-0 text-[#E6E6E6] hover:bg-transparent hover:text-basement-orange" onClick={() => setOpen(false)}>
                  <XIcon />
                </IconButton>
              </div>

              <motion.div className="relative flex min-h-0 flex-1 flex-col" initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }} animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }} transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.77, 0, 0.175, 1] }}>
                <nav aria-label="Mobile primary" className="flex flex-1 flex-col justify-center gap-5 px-[28px] py-8 pb-32 sm:px-[40px]">
                  {menuItems.map((item, index) => (
                    <motion.div key={`${item.label}-${item.href}`} initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.25 + index * 0.06 }}>
                      <Link href={item.href} target={item.openInNewTab ? "_blank" : undefined} rel={item.openInNewTab ? "noopener noreferrer" : undefined} aria-current={isActivePath(pathname, item.href) ? "page" : undefined} className={`block text-geist-40 font-semibold transition-colors duration-200 hover:text-basement-orange focus-visible:text-basement-orange${isActivePath(pathname, item.href) ? " text-basement-orange" : " text-[#E6E6E6]"}`} onClick={() => setOpen(false)}>{item.label}</Link>
                    </motion.div>
                  ))}
                </nav>

                {contactLink ? <motion.div className="absolute inset-x-0 bottom-0 z-[10000] w-full px-[28px] pb-5 sm:px-[40px]" initial={{ y: "120%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "120%", opacity: 0 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}><ContactButton link={contactLink} /></motion.div> : null}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      ) : null}
    </div>
  );
}

function XIcon() {
  return <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8L28 28M28 8L8 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>;
}
