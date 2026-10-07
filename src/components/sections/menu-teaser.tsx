"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import type { MenuItem } from "@/content/types";
import { menuTagLabels } from "@/content/menu";
import { formatPrice } from "@/lib/content";
import { LineArt } from "@/components/ui/line-art";
import { Tag } from "@/components/ui/status-badge";
import { Annotation } from "@/components/ui/annotation";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function MenuTeaser({ items }: { items: MenuItem[] }) {
  const wrapper = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = wrapper.current?.querySelector("ul");
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section data-theme="milk" aria-labelledby="menu-teaser-title" className="overflow-hidden bg-milk py-20 md:py-28">
      <div className="container-page">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow text-accent">On the menu</p>
            <h2 id="menu-teaser-title" className="text-h2">
              Signature cups
            </h2>
            <p className="text-body-lg opacity-90">Made slowly, poured gently. Here&apos;s what people come back for.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous drinks" className="flex size-12 items-center justify-center rounded-full border-2 border-calm-blue text-calm-blue transition-colors hover:bg-calm-blue hover:text-steam">
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Next drinks" className="flex size-12 items-center justify-center rounded-full border-2 border-calm-blue text-calm-blue transition-colors hover:bg-calm-blue hover:text-steam">
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <Annotation className="mt-10 ml-4 md:ml-10">our bestseller ↓</Annotation>

        <div ref={wrapper}>
        <Stagger
          as="ul"
          className="scrollbar-none -mx-4 mt-3 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pt-2 pb-8 md:-mx-8 md:scroll-px-8 md:px-8 xl:mx-0 xl:grid xl:grid-cols-4 xl:overflow-visible xl:px-0"
          aria-label="Signature drinks"
        >
          {items.map((item, i) => (
            <StaggerItem as="li" key={item.id} className="w-[78%] shrink-0 snap-start xs:w-[18rem] xl:w-auto">
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card border-2 border-latte bg-steam">
                <div className="relative aspect-[4/3] overflow-hidden bg-foam-cream">
                  <div className="flex size-full items-center justify-center transition-transform duration-500 ease-(--ease-calm) group-hover:scale-105">
                    <LineArt name={item.tags?.includes("iced") && i % 2 ? "iced" : "cup"} className="size-28 text-calm-blue" strokeWidth={2} />
                  </div>
                  <span className="absolute top-4 right-4 rounded-full bg-calm-blue px-3 py-1 font-display text-sm font-bold text-foam-cream">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-h3">{item.name}</h3>
                  <p className="opacity-90">{item.description}</p>
                  {item.tags && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-2 text-calm-blue" aria-label="Tags">
                      {item.tags.map((t) => (
                        <li key={t}>
                          <Tag>{menuTagLabels[t]}</Tag>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        </div>

        <div className="mt-4 flex justify-center md:justify-start">
          <Button href="/menu" variant="outline" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
            See the full menu
          </Button>
        </div>
      </div>
    </section>
  );
}
