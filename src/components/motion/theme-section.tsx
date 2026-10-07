"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE_CALM } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useColorTheme } from "@/hooks/use-theme";

export type Theme = "blue" | "cream" | "milk";

const COLORS: Record<"light" | "dark", Record<Theme, { bg: string; fg: string }>> = {
  light: {
    blue: { bg: "#0e36f0", fg: "#fbefe3" },
    cream: { bg: "#fbefe3", fg: "#0b1a5c" },
    milk: { bg: "#fffbf5", fg: "#0b1a5c" },
  },
  // Mirrors the dark-mode token remap in globals.css.
  dark: {
    blue: { bg: "#0e36f0", fg: "#fbefe3" },
    cream: { bg: "#11236f", fg: "#fbefe3" },
    milk: { bg: "#0b1a5c", fg: "#fbefe3" },
  },
};

type ThemeSectionProps = React.ComponentProps<"section"> & {
  theme: Theme;
  /**
   * When set, the section starts in this theme's colors and flips to `theme`
   * once ~35% of it is in view (600ms, background + text together, so every
   * resting state stays WCAG AA). SSR/no-JS always renders the final theme.
   */
  flipFrom?: Theme;
};

/** A page section with brand theming and an optional scroll-triggered color flip. */
export function ThemeSection({ theme, flipFrom, className, children, ...rest }: ThemeSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const reduce = useReducedMotion();
  const { theme: colorTheme } = useColorTheme();

  if (!flipFrom || reduce) {
    return (
      <section data-theme={theme} className={cn("bg-bg text-fg", className)} {...rest}>
        {children}
      </section>
    );
  }

  const palette = COLORS[colorTheme ?? "light"];
  const from = palette[flipFrom];
  const to = palette[theme];
  const { onAnimationStart, onDrag, onDragStart, onDragEnd, ...sectionProps } = rest;
  void onAnimationStart; void onDrag; void onDragStart; void onDragEnd;

  return (
    <motion.section
      ref={ref}
      data-theme={inView ? theme : flipFrom}
      className={cn("text-fg", className)}
      initial={false}
      animate={{ backgroundColor: inView ? to.bg : from.bg, color: inView ? to.fg : from.fg }}
      transition={{ duration: 0.6, ease: EASE_CALM }}
      style={{ backgroundColor: to.bg }}
      {...sectionProps}
    >
      {children}
    </motion.section>
  );
}
