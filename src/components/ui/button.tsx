"use client";

/**
 * Brand button with a fill that sweeps in from the side the cursor enters.
 * Custom: Watermelon's shimmer-button was off-brand (shimmer ≠ calm).
 * Renders a TransitionLink (internal href), <a> (external), or <button>.
 */

import { useState, type ComponentProps, type PointerEvent } from "react";
import { TransitionLink } from "@/components/motion/page-transition";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

type ButtonAsButton = BaseProps & Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };
type ButtonAsLink = BaseProps & Omit<ComponentProps<"a">, "className" | "children" | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full border-2 font-medium tracking-[0.01em] transition-[color,transform] duration-[350ms] ease-(--ease-calm) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, { root: string; fill: string; hoverText: string }> = {
  solid: {
    root: "border-accent bg-accent text-on-accent",
    fill: "bg-bg",
    hoverText: "group-hover/btn:text-accent group-focus-visible/btn:text-accent",
  },
  outline: {
    root: "border-accent bg-transparent text-accent",
    fill: "bg-accent",
    hoverText: "group-hover/btn:text-on-accent group-focus-visible/btn:text-on-accent",
  },
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-7 text-base sm:px-8",
};

export function Button(props: ButtonProps) {
  const { variant = "solid", size = "md", className, children, icon, ...rest } = props;
  const [origin, setOrigin] = useState<"left" | "right">("left");
  const v = variants[variant];

  const onPointerEnter = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(e.clientX - r.left < r.width / 2 ? "left" : "right");
  };

  const classes = cn(base, sizes[size], v.root, v.hoverText, className);
  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 scale-x-0 transition-transform duration-[350ms] ease-(--ease-calm) group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100 motion-reduce:transition-none",
          origin === "left" ? "origin-left" : "origin-right",
          v.fill,
        )}
      />
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform duration-200 group-hover/btn:translate-x-0.5">{icon}</span>}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof BaseProps>;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          onPointerEnter={onPointerEnter}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorRest}
        >
          {inner}
        </a>
      );
    }
    return (
      <TransitionLink href={href} className={classes} onPointerEnter={onPointerEnter} {...anchorRest}>
        {inner}
      </TransitionLink>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button type="button" className={classes} onPointerEnter={onPointerEnter} {...buttonRest}>
      {inner}
    </button>
  );
}
