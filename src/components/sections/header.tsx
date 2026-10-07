"use client";

/**
 * Sticky header — hides on scroll down, returns on scroll up, and the logo
 * shrinks once the hero is passed. Custom: Watermelon's navigation blocks are
 * SaaS mega-menus / glassmorphism, both off-brief.
 */

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";
import { navLinks } from "@/content/nav";
import { site } from "@/content/site";
import { TransitionLink } from "@/components/motion/page-transition";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Wordmark } from "@/components/ui/logo";
import { EASE_CALM } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const pastHero = y > (typeof window !== "undefined" ? window.innerHeight * 0.6 : 600);
    setCompact(pastHero);
    if (menuOpen) return;
    setHidden(y > 160 && y > prev + 2 ? true : y < prev - 2 ? false : hidden);
  });

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[120] rounded-full bg-foam-cream px-4 py-2 text-deep-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <motion.header
        data-theme="blue"
        className="fixed inset-x-0 top-0 z-50 bg-calm-blue text-foam-cream"
        initial={false}
        animate={{ y: hidden && !reduce ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE_CALM }}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-4 transition-[height] duration-[450ms] ease-(--ease-calm)",
            compact ? "h-16" : "h-[4.5rem] md:h-20",
          )}
        >
          <TransitionLink href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <span
              className={cn(
                "relative overflow-hidden rounded-full bg-foam-cream transition-[width,height] duration-[450ms] ease-(--ease-calm)",
                compact ? "size-10" : "size-12 md:size-14",
              )}
            >
              <Image src="/brand/mascot.png" alt="" fill sizes="56px" className="object-cover" priority />
            </span>
            <Wordmark
              className={cn("transition-[font-size] duration-[450ms] ease-(--ease-calm)", compact ? "text-sm" : "text-base md:text-lg")}
            />
          </TransitionLink>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <TransitionLink
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative px-3 py-2 text-[0.9375rem] font-medium"
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-current transition-transform duration-300 ease-(--ease-calm)",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                    aria-hidden="true"
                  />
                </TransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Calm Grounds on Instagram (opens in a new tab)"
              className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-foam-cream/15"
            >
              <SocialIcon network="instagram" />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Calm Grounds on Facebook (opens in a new tab)"
              className="hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-foam-cream/15 sm:flex"
            >
              <SocialIcon network="facebook" />
            </a>
            <Button href="/events#book" className="hidden min-h-11 px-5 lg:inline-flex">
              Book us
            </Button>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full border-2 border-foam-cream lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-(--ease-calm)",
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-(--ease-calm)",
                    menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
