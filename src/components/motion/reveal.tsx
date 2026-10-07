"use client";

/**
 * Scroll reveals: fade-up 24px over 600ms, children staggered 80ms, once at 20%.
 *
 * Content is rendered fully visible in HTML. After hydration, only elements that
 * are still below the fold get hidden (instantly) and then revealed as they
 * scroll in. Anything already on screen is left alone, so nothing ever depends
 * on JS or animation to be visible, and LCP isn't held hostage by hydration.
 */

import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from "react";
import { EASE_CALM, REVEAL } from "@/lib/motion";

const ITEM = "[data-reveal-item]";

type RevealOwnProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  /** Stagger direct `[data-reveal-item]` descendants instead of the element itself. */
  stagger?: boolean;
};
type RevealProps<T extends ElementType> = RevealOwnProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

export function Reveal<T extends ElementType = "div">({ as, delay = 0, stagger: staggered = false, ...rest }: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, amount: REVEAL.amount });
  const reduce = useReducedMotion();
  const armed = useRef(false);

  // Arm (hide) only if below the fold at hydration time.
  useEffect(() => {
    const el = scope.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    const targets = staggered ? el.querySelectorAll(ITEM) : el;
    animate(targets, { opacity: 0, y: REVEAL.y }, { duration: 0 });
    armed.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scope.current;
    if (!inView || !armed.current || !el) return;
    armed.current = false;
    const targets = staggered ? el.querySelectorAll(ITEM) : el;
    animate(
      targets,
      { opacity: 1, y: 0 },
      { duration: REVEAL.duration, ease: EASE_CALM, delay: staggered ? stagger(REVEAL.stagger, { startDelay: delay }) : delay },
    );
  }, [inView, animate, scope, staggered, delay]);

  return <Tag ref={scope} {...rest} />;
}

/** Parent that staggers its <StaggerItem> children by 80ms. */
export function Stagger<T extends ElementType = "div">(props: Omit<RevealProps<T>, "stagger">) {
  return <Reveal {...(props as RevealProps<T>)} stagger />;
}

type StaggerItemProps<T extends ElementType> = { as?: T } & Omit<ComponentPropsWithoutRef<T>, "as">;

export function StaggerItem<T extends ElementType = "div">({ as, ...rest }: StaggerItemProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag data-reveal-item="" {...rest} />;
}
