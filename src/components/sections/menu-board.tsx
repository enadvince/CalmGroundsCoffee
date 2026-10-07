"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import type { MenuCategory, MenuItem } from "@/content/types";
import { menuTagLabels } from "@/content/menu";
import { formatPrice } from "@/lib/content";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { LineArt } from "@/components/ui/line-art";
import { Tag } from "@/components/ui/status-badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { LineArtName } from "@/content/types";

const ART: Record<MenuCategory, LineArtName> = {
  signatures: "steam",
  espresso: "cup",
  cold: "iced",
  "non-coffee": "leaf",
  food: "pastry",
};

type Props = {
  categories: { id: MenuCategory; label: string; blurb: string }[];
  items: MenuItem[];
};

/** Sticky category tabs that follow scroll (scrollspy) + category sections. */
export function MenuBoard({ categories, items }: Props) {
  const [active, setActive] = useState<string>(categories[0].id);
  const lenis = useLenis();

  const jumping = useRef(false);

  // Scrollspy: the active category is the last one whose heading has passed
  // just below the sticky bars. Paused while a tab-click scroll is animating.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (jumping.current) return;
      let current = categories[0].id as string;
      for (const c of categories) {
        const el = document.getElementById(`cat-${c.id}`);
        if (el && el.getBoundingClientRect().top <= 200) current = c.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [categories]);

  const jump = (id: string) => {
    setActive(id);
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const offset = -150;
    jumping.current = true;
    const done = () => {
      jumping.current = false;
    };
    setTimeout(done, 1600); // safety if the scroll is interrupted
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.1, onComplete: done });
    else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
      done();
    }
    // Move focus to the heading for keyboard + screen reader users.
    el.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  };

  return (
    <div data-theme="milk" className="bg-milk">
      <div className="sticky top-16 z-20 border-b-2 border-latte bg-milk py-3 md:top-[4.5rem] print:hidden">
        <div className="container-page">
          <SlidingTabs
            mode="nav"
            label="Menu categories"
            active={active}
            onChange={jump}
            tabs={categories.map((c) => ({ id: c.id, label: c.label }))}
            className="w-fit"
          />
        </div>
      </div>

      <div className="container-page flex flex-col gap-20 py-16 md:gap-28 md:py-24">
        {categories.map((cat) => {
          const list = items.filter((i) => i.category === cat.id);
          return (
            <section key={cat.id} id={`cat-${cat.id}`} aria-labelledby={`cat-${cat.id}-title`} className="scroll-mt-40">
              <Reveal className="mb-8 flex items-end justify-between gap-6 border-b-2 border-deep-ink pb-5">
                <div className="flex flex-col gap-2">
                  <h2 id={`cat-${cat.id}-title`} tabIndex={-1} className="text-h2 outline-none">
                    {cat.label}
                  </h2>
                  <p className="opacity-90">{cat.blurb}</p>
                </div>
                <LineArt name={ART[cat.id]} className="hidden size-16 shrink-0 text-calm-blue sm:block" strokeWidth={2.25} />
              </Reveal>
              <Stagger as="ul" className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
                {list.map((item) => (
                  <StaggerItem as="li" key={item.id}>
                    <article className="flex flex-col gap-2">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-lg font-bold uppercase tracking-[-0.01em]">{item.name}</h3>
                        <span className="h-0 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-latte" aria-hidden="true" />
                        <p className="font-display text-lg font-bold text-calm-blue">
                          <span className="sr-only">Price: </span>
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="opacity-90">{item.description}</p>
                      {item.tags && (
                        <ul className="flex flex-wrap gap-2 pt-1 text-calm-blue" aria-label="Tags">
                          {item.tags.map((t) => (
                            <li key={t}>
                              <Tag>{menuTagLabels[t]}</Tag>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          );
        })}
      </div>
    </div>
  );
}
