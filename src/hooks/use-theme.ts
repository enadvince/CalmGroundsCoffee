"use client";

import { useCallback, useSyncExternalStore } from "react";

export type ColorTheme = "light" | "dark";
export const THEME_KEY = "cg-theme";

/**
 * Inline <head> script: applies the saved (or system) theme before first paint,
 * so there's no light flash for dark-mode visitors.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}

const read = (): ColorTheme => (document.documentElement.classList.contains("dark") ? "dark" : "light");

/** Current theme (reads the <html> class) + a setter that persists the choice. */
export function useColorTheme() {
  const theme = useSyncExternalStore<ColorTheme | null>(subscribe, read, () => null);
  const setTheme = useCallback((next: ColorTheme) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable (private mode) — the toggle still works for this visit */
    }
  }, []);
  return { theme, setTheme };
}
