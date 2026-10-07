"use client";

import { MotionConfig } from "motion/react";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { TransitionProvider } from "@/components/motion/page-transition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <TransitionProvider>{children}</TransitionProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
