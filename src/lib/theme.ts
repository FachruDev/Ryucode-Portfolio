export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs inline in <head> before first paint: saved preference first,
 * otherwise the system setting. Kept dependency-free and ES5-safe.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem("${THEME_STORAGE_KEY}"),t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d.setAttribute("data-theme",t)}catch(e){}})()`;

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme, { animate = false } = {}) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (animate && !reduce) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 460);
  }

  root.setAttribute("data-theme", theme);
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The theme
    // still applies for this visit.
  }
}

/** Subscribe to data-theme changes on <html> (for useSyncExternalStore). */
export function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
