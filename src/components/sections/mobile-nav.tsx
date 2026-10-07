"use client";

/** Full-screen calm-blue overlay with staggered link reveal (custom). */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navLinks } from "@/content/nav";
import { site } from "@/content/site";
import { TransitionLink } from "@/components/motion/page-transition";
import { SocialIcon } from "@/components/ui/social-icon";
import { SteamPaths } from "@/components/motion/steam-paths";
import { EASE_CALM } from "@/lib/motion";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock scroll, close on Escape, keep focus inside while open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-theme="blue"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-calm-blue px-4 pt-28 pb-10 text-foam-cream lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE_CALM }}
        >
          <motion.ul
            className="flex flex-col gap-1"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
          >
            {[{ href: "/", label: "Home" }, ...navLinks].map((l) => (
              <motion.li
                key={l.href}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_CALM } },
                }}
              >
                <TransitionLink
                  href={l.href}
                  onClick={onClose}
                  aria-current={pathname === l.href ? "page" : undefined}
                  className="block py-2 font-display text-[clamp(2rem,9vw,3rem)] font-extrabold uppercase leading-tight tracking-[-0.02em] aria-[current=page]:underline aria-[current=page]:decoration-4 aria-[current=page]:underline-offset-8"
                >
                  {l.label}
                </TransitionLink>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-auto flex items-end justify-between gap-6 pt-12">
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-note">{site.tagline}</p>
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
              <div className="flex gap-2">
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="flex size-11 items-center justify-center rounded-full border-2 border-foam-cream/40">
                  <SocialIcon network="instagram" />
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)" className="flex size-11 items-center justify-center rounded-full border-2 border-foam-cream/40">
                  <SocialIcon network="facebook" />
                </a>
                <a href={site.messenger} target="_blank" rel="noopener noreferrer" aria-label="Messenger (opens in a new tab)" className="flex size-11 items-center justify-center rounded-full border-2 border-foam-cream/40">
                  <SocialIcon network="messenger" />
                </a>
              </div>
            </div>
            <SteamPaths className="h-24 w-20 shrink-0 opacity-60" delay={0.3} />
          </div>
          {/* Close control inside the dialog so the focus trap never strands keyboard users. */}
          <button type="button" onClick={onClose} className="sr-only focus:not-sr-only focus:mt-6 focus:self-start focus:rounded-full focus:border-2 focus:border-foam-cream focus:px-5 focus:py-2">
            Close menu
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
