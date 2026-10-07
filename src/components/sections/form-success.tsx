"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Mascot } from "@/components/ui/mascot";
import { SteamPaths } from "@/components/motion/steam-paths";
import { Button } from "@/components/ui/button";
import { EASE_CALM } from "@/lib/motion";

/** Animated mascot success state shared by all forms. Focus moves to the heading. */
export function FormSuccess({
  title,
  body,
  reference,
  onReset,
  resetLabel = "Send another",
}: {
  title: string;
  body: React.ReactNode;
  reference?: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_CALM }}
      className="flex flex-col items-center gap-6 py-6 text-center"
    >
      <div className="relative w-40 pt-14">
        <SteamPaths className="absolute top-0 left-1/2 h-14 w-12 -translate-x-1/2 text-calm-blue" delay={0.3} />
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
          transition={{
            scale: { duration: 0.6, ease: EASE_CALM },
            opacity: { duration: 0.6, ease: EASE_CALM },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
          }}
        >
          <Mascot className="w-40 border-2 border-calm-blue/20" decorative sizes="160px" />
        </motion.div>
      </div>
      <h3 ref={headingRef} tabIndex={-1} className="text-h2 outline-none">
        {title}
      </h3>
      <div className="text-body-lg max-w-md opacity-90">{body}</div>
      {reference && (
        <p className="rounded-full border-2 border-latte px-4 py-1.5 text-sm">
          Reference <strong className="font-display tracking-wide">{reference}</strong>
        </p>
      )}
      <Button variant="outline" onClick={onReset}>
        {resetLabel}
      </Button>
    </motion.div>
  );
}
