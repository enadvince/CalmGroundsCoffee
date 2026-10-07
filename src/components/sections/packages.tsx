"use client";

// Adapted from Watermelon UI: blocks/pricing-3 — split header (title left,
// "enterprise" aside right → our Custom package) and plan cards with a price
// column and an includes list. Changes: brand tokens, featured tier inverted to
// calm-blue, lucide icons instead of react-icons, CTA preselects the booking form.

import { ArrowRight, Check, Coffee, Clock } from "lucide-react";
import { useLenis } from "lenis/react";
import type { Package } from "@/content/types";
import { formatPrice } from "@/lib/content";
import { choosePackage } from "@/lib/events";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

export function Packages({ packages }: { packages: Package[] }) {
  const lenis = useLenis();
  const tiers = packages.filter((p) => !p.isCustom);
  const custom = packages.find((p) => p.isCustom);

  const pick = (id: string) => {
    choosePackage(id);
    const form = document.getElementById("book");
    if (!form) return;
    if (lenis) lenis.scrollTo(form, { offset: -90 });
    else form.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section data-theme="cream" aria-labelledby="packages-title" className="bg-foam-cream py-20 md:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow text-accent">Packages</p>
            <h2 id="packages-title" className="text-h2">
              Pick a size, we&apos;ll bring the calm
            </h2>
            <p className="text-body-lg opacity-90">Every package includes the cart, our baristas, cups, and setup. Prices are starting rates within Metro Cebu.</p>
          </Reveal>
          {custom && (
            <Reveal delay={0.1} className="flex flex-col gap-4 lg:w-1/3 lg:pt-10">
              <p className="text-eyebrow">{custom.name}</p>
              <p className="opacity-90">{custom.blurb}</p>
              <ul className="flex flex-col gap-1.5 text-[0.9375rem]">
                {custom.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-1 size-4 shrink-0 text-calm-blue" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
              <Button variant="outline" onClick={() => pick(custom.id)} icon={<ArrowRight className="size-4" aria-hidden="true" />} className="self-start">
                Plan something custom
              </Button>
            </Reveal>
          )}
        </div>

        <Stagger as="ul" className="grid gap-5 lg:grid-cols-3">
          {tiers.map((p) => (
            <StaggerItem as="li" key={p.id}>
              <article
                data-theme={p.featured ? "blue" : "milk"}
                aria-labelledby={`pkg-${p.id}`}
                className={cn(
                  "card-lift relative flex h-full flex-col gap-6 rounded-card border-2 p-7 md:p-8",
                  p.featured ? "border-calm-blue bg-calm-blue text-foam-cream" : "border-latte bg-milk",
                )}
              >
                {p.featured && (
                  <span className="absolute -top-3.5 left-7 rounded-full border-2 border-calm-blue bg-foam-cream px-3 py-0.5 text-eyebrow text-calm-blue">
                    Most booked
                  </span>
                )}
                <div className="flex flex-col gap-2">
                  <h3 id={`pkg-${p.id}`} className="text-h3">
                    {p.name}
                  </h3>
                  <p className="opacity-90">{p.blurb}</p>
                </div>
                <p className="flex items-baseline gap-2">
                  <span className="text-sm opacity-80">from</span>
                  <span className="font-display text-[clamp(2rem,1.6rem+1.5vw,2.75rem)] leading-none font-extrabold">{p.priceFrom ? formatPrice(p.priceFrom) : "—"}</span>
                </p>
                <div className="flex gap-5 text-sm font-medium">
                  {p.cups && (
                    <span className="inline-flex items-center gap-1.5">
                      <Coffee className="size-4" aria-hidden="true" />
                      {p.cups} cups
                    </span>
                  )}
                  {p.hours && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" aria-hidden="true" />
                      {p.hours} hours
                    </span>
                  )}
                </div>
                <ul className="flex flex-col gap-2.5 border-t-2 border-line pt-6">
                  {p.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.featured ? "solid" : "outline"}
                  onClick={() => pick(p.id)}
                  icon={<ArrowRight className="size-4" aria-hidden="true" />}
                  className="mt-auto self-start"
                  aria-label={`Choose the ${p.name} package`}
                >
                  Choose this
                </Button>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-8 text-sm opacity-80">Rates are placeholders for this demo and will be confirmed with your quote.</p>
      </div>
    </section>
  );
}
