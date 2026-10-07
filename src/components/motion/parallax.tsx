"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PARALLAX_MAX } from "@/lib/motion";

type ParallaxProps = {
  children: React.ReactNode;
  /** -1…1 — fraction of the max 60px offset; negative moves against scroll. */
  speed?: number;
  className?: string;
};

/** Subtle scroll parallax for decorative layers only (max ±60px). */
export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = Math.max(-1, Math.min(1, speed)) * PARALLAX_MAX;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
