"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  applyTheme,
  currentTheme,
  persistTheme,
  readStoredTheme,
  subscribeToTheme,
  systemTheme,
  type Theme,
} from "@/lib/theme";

const getServerTheme = (): Theme | null => null;

export function ThemeToggle({ className = "" }: { className?: string }) {
  // null on the server and during hydration, so markup always matches.
  const theme = useSyncExternalStore<Theme | null>(subscribeToTheme, currentTheme, getServerTheme);

  // Strict Mode's dev remount resets <html> attributes; re-apply before paint.
  useLayoutEffect(() => {
    applyTheme(readStoredTheme() ?? systemTheme());
  }, []);

  // Follow system changes until the visitor picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!readStoredTheme()) applyTheme(systemTheme(), { animate: true });
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const isDark = theme === "dark";
  const nextTheme: Theme = isDark ? "light" : "dark";

  function toggle() {
    applyTheme(nextTheme, { animate: true });
    persistTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${nextTheme} theme` : "Toggle color theme"}
      title={theme ? `Switch to ${nextTheme} theme` : "Toggle color theme"}
      className={`relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-line bg-surface text-ink transition-colors hover:border-line-strong hover:bg-primary-soft ${className}`}
    >
      {!theme && (
        // Before hydration the icon follows the attribute via CSS alone.
        <span className="inline-flex" aria-hidden="true">
          <Sun className="size-[18px] dark:hidden" strokeWidth={1.75} />
          <Moon className="hidden size-[18px] dark:block" strokeWidth={1.75} />
        </span>
      )}
      <AnimatePresence mode="popLayout" initial={false}>
        {theme && (
          <motion.span
            key={theme}
            initial={{ y: 14, rotate: -40, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
            aria-hidden="true"
          >
            {isDark ? <Moon className="size-[18px]" strokeWidth={1.75} /> : <Sun className="size-[18px]" strokeWidth={1.75} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
