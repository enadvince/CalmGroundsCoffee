"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin reading-progress bar along the bottom edge of the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      data-scroll-progress=""
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-foam-cream"
      style={{ scaleX }}
    />
  );
}
