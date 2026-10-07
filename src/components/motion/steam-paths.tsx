"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_CALM } from "@/lib/motion";
import { cn } from "@/lib/cn";

const WISPS = [
  "M20 118 C 8 98, 32 84, 20 62 S 30 26, 20 6",
  "M50 118 C 38 94, 62 80, 50 56 S 60 22, 50 2",
  "M80 118 C 68 98, 92 84, 80 62 S 90 26, 80 6",
];

/**
 * Original single-stroke steam wisps (not part of the mascot).
 * Draw in via pathLength over 1.2s, then breathe softly on a loop.
 */
export function SteamPaths({ className, delay = 0.6 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      {WISPS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 1, opacity: [0, 1, 1, 0.55, 1], y: [0, 0, -4, 0] }
          }
          transition={
            reduce
              ? undefined
              : {
                  pathLength: { duration: 1.2, ease: EASE_CALM, delay: delay + i * 0.15 },
                  opacity: {
                    duration: 4,
                    times: [0, 0.15, 0.5, 0.75, 1],
                    delay: delay + i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: "easeInOut",
                  },
                  y: { duration: 4, delay: delay + 1.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                }
          }
        />
      ))}
    </svg>
  );
}
