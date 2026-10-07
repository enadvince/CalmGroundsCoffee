"use client";

// Adapted from Watermelon UI: animated-components/pagination (rolling digit mechanism).
// Re-timed to the Calm Grounds motion system — 350ms ease-calm, no spring overshoot.

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_CALM } from "@/lib/motion";

/** One digit that rolls vertically whenever its value changes. */
export function RollingDigit({ value }: { value: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block h-[1em] w-[0.72em] overflow-hidden text-center leading-none tabular-nums">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { y: "-100%" }}
          animate={reduce ? { opacity: 1 } : { y: "0%" }}
          exit={reduce ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: reduce ? 0.15 : 0.35, ease: EASE_CALM }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function RollingNumber({ value, pad = 2 }: { value: number; pad?: number }) {
  const digits = String(Math.max(0, value)).padStart(pad, "0").split("");
  return (
    <span className="inline-flex" aria-hidden="true">
      {digits.map((d, i) => (
        <RollingDigit key={digits.length - i} value={d} />
      ))}
    </span>
  );
}
