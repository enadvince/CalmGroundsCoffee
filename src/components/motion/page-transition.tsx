"use client";

/**
 * Calm-blue curtain page transitions (custom — nothing comparable in Watermelon).
 *
 * App Router templates remount on navigation but can't run exit animations,
 * so the transition is split in two:
 *   1. <TransitionLink> intercepts SPA navigation (Link `onNavigate`), raises the
 *      curtain (450ms), THEN calls router.push.
 *   2. <PageEnter> (rendered by app/template.tsx) sees the curtain is up when the
 *      new page mounts, scrolls to top, holds the mascot (150ms), and lowers the
 *      curtain upward (450ms).
 * Back/forward (popstate) never goes through TransitionLink, so it stays instant
 * and native scroll restoration is untouched. Reduced motion: 150ms crossfade.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { CURTAIN, EASE_CALM } from "@/lib/motion";

type Phase = "idle" | "covering" | "covered" | "revealing";

type Ctx = {
  phase: Phase;
  navigate: (href: string) => void;
  pageMounted: () => void;
};

const TransitionContext = createContext<Ctx | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used inside <TransitionProvider>");
  return ctx;
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTop = useCallback(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [lenis]);

  const navigate = useCallback(
    (href: string) => {
      const target = new URL(href, window.location.href);
      const samePage = target.pathname === pathname;
      if (samePage || reduce || phase !== "idle") {
        router.push(href);
        return;
      }
      pendingHref.current = href;
      setPhase("covering");
    },
    [pathname, phase, reduce, router],
  );

  const onCovered = useCallback(() => {
    if (phase !== "covering" || !pendingHref.current) return;
    setPhase("covered");
    router.push(pendingHref.current);
    pendingHref.current = null;
    // Never leave the curtain stuck if the next page is slow or errors.
    safety.current = setTimeout(() => setPhase("revealing"), 4000);
  }, [phase, router]);

  const pageMounted = useCallback(() => {
    if (phase !== "covered") return;
    if (safety.current) clearTimeout(safety.current);
    scrollTop();
    setTimeout(() => setPhase("revealing"), CURTAIN.hold * 1000 + 150);
  }, [phase, scrollTop]);

  useEffect(() => () => {
    if (safety.current) clearTimeout(safety.current);
  }, []);

  const value = useMemo(() => ({ phase, navigate, pageMounted }), [phase, navigate, pageMounted]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-calm-blue"
            initial={{ y: "100%" }}
            animate={{ y: phase === "revealing" ? "-100%" : "0%" }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: phase === "revealing" ? CURTAIN.reveal : CURTAIN.cover, ease: EASE_CALM }}
            onAnimationComplete={() => {
              if (phase === "covering") onCovered();
              else if (phase === "revealing") setPhase("idle");
            }}
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: phase === "covered" ? 1 : 0, scale: phase === "covered" ? 1 : 0.96 }}
              transition={{ duration: CURTAIN.hold, ease: EASE_CALM }}
              className="size-32 overflow-hidden rounded-full bg-foam-cream sm:size-40"
            >
              <Image src="/brand/mascot.png" alt="" width={160} height={160} className="size-full object-cover" priority={false} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

/** Wraps each page (via app/template.tsx). */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const { pageMounted } = usePageTransition();
  const reduce = useReducedMotion();

  useEffect(() => {
    pageMounted();
    // Run once per mount — template remounts on every navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduce) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
        {children}
      </motion.div>
    );
  }
  return <>{children}</>;
}

type TransitionLinkProps = ComponentProps<typeof Link> & { href: string };

/** next/link that plays the curtain before client-side navigation. */
export function TransitionLink({ href, onNavigate, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const isHash = href.startsWith("#");
  return (
    <Link
      href={href}
      onNavigate={(e) => {
        onNavigate?.(e);
        if (isHash) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
