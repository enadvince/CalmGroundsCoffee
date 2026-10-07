"use client";

// Adapted from Watermelon UI: blocks/faq-6 (numbered accordion items).
// Changes: dropped the dashed grid + Radix dependency, brand tokens, Unbounded
// numerals, motion height animation, and explicit aria-expanded/aria-controls.

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";
import { EASE_CALM } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Accordion({ items, className }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className={cn("divide-y-2 divide-line border-y-2 border-line", className)}>
      {items.map((item, index) => {
        const isOpen = open === item.id;
        const btnId = `${baseId}-btn-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <div key={item.id}>
            <h3 className="font-sans normal-case tracking-normal">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6"
              >
                <span className="font-display text-sm font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-lg font-medium sm:text-xl">{item.question}</span>
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-[transform,background-color,color] duration-300 ease-(--ease-calm) group-hover:bg-accent group-hover:text-on-accent",
                    isOpen && "rotate-45 bg-accent text-on-accent",
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_CALM }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-10 text-body-lg opacity-90 sm:pl-12">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
