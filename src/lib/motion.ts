/** Motion system tokens — keep every animation on the site in this vocabulary. */
export const EASE_CALM = [0.22, 1, 0.36, 1] as const;

export const SPRING_PRESS = { type: "spring", stiffness: 260, damping: 24 } as const;

export const DUR = {
  fast: 0.2,
  base: 0.45,
  slow: 0.6,
} as const;

export const REVEAL = {
  y: 24,
  duration: 0.6,
  stagger: 0.08,
  amount: 0.2,
} as const;

export const CURTAIN = {
  cover: 0.45,
  hold: 0.15,
  reveal: 0.45,
} as const;

export const PARALLAX_MAX = 60;
