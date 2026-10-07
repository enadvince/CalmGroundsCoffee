"use client";

import { Moon, Sun } from "lucide-react";
import { useColorTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/cn";

/** Light/dark switch. Renders a neutral icon until hydrated so SSR markup matches. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useColorTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={theme === null ? undefined : isDark}
      className={cn("flex size-11 items-center justify-center rounded-full transition-colors hover:bg-foam-cream/15", className)}
    >
      {isDark ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
    </button>
  );
}
