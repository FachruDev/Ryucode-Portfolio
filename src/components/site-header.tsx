"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { useActiveSection } from "@/lib/hooks";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";

const sectionIds = navItems.map((item) => item.id);

export function SiteHeader() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: lock page scroll, trap focus within the
  // header, close on Escape, and close if the viewport grows past mobile.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const header = headerRef.current;
    header?.querySelector<HTMLElement>("[data-menu-link]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !header) return;
      const focusable = Array.from(
        header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  // The page stays mounted across navigations; never come back to an open menu.
  useEffect(() => () => setOpen(false), []);

  const raised = scrolled || open;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 isolate h-(--header-h) border-b transition-[border-color] duration-300 ${
        raised ? "border-line" : "border-transparent"
      }`}
    >
      {/* The blur lives on its own layer: backdrop-filter on the header itself
          would become the containing block for the fixed mobile panel. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-(--header-bg) backdrop-blur-md transition-opacity duration-300 ${
          raised ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="page-container flex h-full items-center justify-between gap-6">
        <a
          href="#home"
          className="-mx-2 rounded-full px-2 py-1"
          onClick={() => open && close(false)}
          aria-label={`${site.name}, back to top`}
        >
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                      isActive ? "text-primary-dark" : "text-subtle hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
                aria-hidden="true"
              >
                {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-(--header-h) bottom-0 overflow-y-auto border-t border-line bg-bg md:hidden"
          >
            <nav aria-label="Primary" className="page-container flex min-h-full flex-col justify-between gap-10 py-8">
              <ul className="flex flex-col">
                {navItems.map((item, index) => {
                  const isActive = active === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index + 0.06, duration: 0.3 }}
                      className="border-b border-line"
                    >
                      <a
                        data-menu-link
                        href={`#${item.id}`}
                        onClick={() => close(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex min-h-16 items-center justify-between font-display text-[2rem] tracking-tight ${
                          isActive ? "text-primary-dark" : "text-ink"
                        }`}
                      >
                        {item.label}
                        {isActive && <span className="size-2 rounded-full bg-primary" aria-hidden="true" />}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="space-y-1 text-sm text-subtle">
                <p>{site.availability}</p>
                <a href={`mailto:${site.email}`} className="font-medium text-primary-dark underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
