"use client";

/**
 * Bottom-right floating cluster: back-to-top (after scrolling) + contact
 * (Messenger). On phones the "Book us" pill sits bottom-left. Everything waits
 * until the cookie banner has been answered so nothing overlaps it.
 */

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUp, CalendarHeart, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { withUtm } from "@/lib/utm";
import { useConsent } from "@/lib/consent";
import { TransitionLink } from "@/components/motion/page-transition";
import { EASE_CALM } from "@/lib/motion";

const enter = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 16 }, transition: { duration: 0.45, ease: EASE_CALM } };

export function FloatingActions() {
  const pathname = usePathname();
  const consent = useConsent();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [deep, setDeep] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setPastHero(y > window.innerHeight * 0.8);
    setDeep(y > window.innerHeight * 1.5);
  });

  if (consent === undefined || consent === null) return null;

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis) lenis.scrollTo(0, { immediate: reduce, duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <>
      <AnimatePresence>
        {pastHero && pathname !== "/events" && (
          <motion.div {...enter} data-theme="blue" className="print:hidden fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-30 lg:hidden">
            <TransitionLink
              href="/events#book"
              className="flex min-h-12 items-center gap-2 rounded-full border-2 border-foam-cream bg-calm-blue px-5 font-medium text-foam-cream shadow-lift transition-colors hover:bg-foam-cream hover:text-calm-blue active:scale-[0.98]"
            >
              <CalendarHeart className="size-4" aria-hidden="true" />
              Book us
            </TransitionLink>
          </motion.div>
        )}
      </AnimatePresence>

      <div data-theme="blue" className="print:hidden fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-3">
        <AnimatePresence>
          {deep && (
            <motion.button
              {...enter}
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              className="flex size-12 items-center justify-center rounded-full border-2 border-calm-blue bg-foam-cream text-calm-blue shadow-lift transition-colors hover:bg-calm-blue hover:text-foam-cream"
            >
              <ArrowUp className="size-5" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a
          {...enter}
          href={withUtm(site.messenger, "floating-contact")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on Messenger (opens in a new tab)"
          className="group flex h-12 items-center gap-2 rounded-full border-2 border-foam-cream bg-calm-blue px-3.5 text-foam-cream shadow-lift transition-colors hover:bg-foam-cream hover:text-calm-blue lg:px-5"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          <span className="hidden font-medium lg:inline">Message us</span>
        </motion.a>
      </div>
    </>
  );
}
