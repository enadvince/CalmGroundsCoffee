"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarHeart } from "lucide-react";
import { TransitionLink } from "@/components/motion/page-transition";
import { EASE_CALM } from "@/lib/motion";

/** Mobile-only "Book us" pill, shown once the hero is scrolled past. */
export function FloatingBookPill() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setShow(y > window.innerHeight * 0.8);
  });

  if (pathname === "/events") return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 lg:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: EASE_CALM }}
        >
          <TransitionLink
            href="/events#book"
            className="flex min-h-12 items-center gap-2 rounded-full border-2 border-foam-cream bg-calm-blue px-5 font-medium text-foam-cream shadow-lift active:scale-[0.98]"
          >
            <CalendarHeart className="size-4" aria-hidden="true" />
            Book us
          </TransitionLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
