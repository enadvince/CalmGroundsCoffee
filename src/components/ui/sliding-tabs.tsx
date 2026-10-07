"use client";

// Adapted from Watermelon UI: animated-components/continuous-tabs.
// Changes: brand tokens instead of zinc gradients, renders during SSR (the
// original returned null until mounted), press spring 260/24, roving-tabindex
// keyboard support, and either `tablist` or `radiogroup`-style semantics.

import { LayoutGroup, motion } from "motion/react";
import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { SPRING_PRESS } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type TabItem = { id: string; label: string; count?: number };

type SlidingTabsProps = {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  /**
   * "tabs" → role=tablist (needs panels); "filter" → toggle buttons with aria-pressed;
   * "nav" → in-page jump buttons marked aria-current="location".
   */
  mode?: "tabs" | "filter" | "nav";
  className?: string;
  /** id prefix for tab/panel association in "tabs" mode */
  idPrefix?: string;
};

export function SlidingTabs({ tabs, active, onChange, label, mode = "filter", className, idPrefix }: SlidingTabsProps) {
  const layoutId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep the active pill visible when the row overflows (e.g. scrollspy on phones).
  useEffect(() => {
    const i = tabs.findIndex((t) => t.id === active);
    const btn = refs.current[i];
    const row = btn?.parentElement;
    if (!btn || !row || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: btn.offsetLeft - row.clientWidth / 2 + btn.offsetWidth / 2, behavior: "smooth" });
  }, [active, tabs]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (mode === "nav") return; // plain buttons in tab order
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(tabs[next].id);
  };

  return (
    <LayoutGroup id={layoutId}>
      <div
        role={mode === "tabs" ? "tablist" : "group"}
        aria-label={label}
        className={cn(
          "scrollbar-none flex max-w-full items-center gap-1 overflow-x-auto rounded-full border-2 border-accent/25 bg-bg p-1",
          className,
        )}
      >
        {tabs.map((tab, i) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              id={idPrefix ? `${idPrefix}-tab-${tab.id}` : undefined}
              role={mode === "tabs" ? "tab" : undefined}
              aria-selected={mode === "tabs" ? isActive : undefined}
              aria-controls={mode === "tabs" && idPrefix ? `${idPrefix}-panel-${tab.id}` : undefined}
              aria-pressed={mode === "filter" ? isActive : undefined}
              aria-current={mode === "nav" && isActive ? "location" : undefined}
              tabIndex={mode === "nav" || isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="relative min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap sm:px-5"
            >
              {isActive && (
                <motion.span layoutId="active-pill" transition={SPRING_PRESS} className="absolute inset-0 rounded-full bg-accent" />
              )}
              <span
                className={cn(
                  "relative z-10 transition-colors duration-200",
                  isActive ? "text-on-accent" : "text-fg hover:text-accent",
                )}
              >
                {tab.label}
                {tab.count !== undefined && <span className="ml-1.5 opacity-70">{tab.count}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
