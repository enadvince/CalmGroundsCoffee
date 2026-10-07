import { ArrowUpRight } from "lucide-react";
import type { LineArtName } from "@/content/types";
import { LineArt } from "@/components/ui/line-art";
import { TransitionLink } from "@/components/motion/page-transition";
import { ThemeSection } from "@/components/motion/theme-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const WAYS: { n: string; title: string; body: string; href: string; cta: string; art: LineArtName }[] = [
  {
    n: "01",
    title: "Visit a pop-up",
    body: "Catch the blue cart at a mall, campus, or market near you. New stops every week.",
    href: "/pop-ups",
    cta: "See this week's spots",
    art: "pin",
  },
  {
    n: "02",
    title: "Order delivery",
    body: "Pre-order a batch for the office or a slow morning at home. We'll bring it to you.",
    href: "/delivery",
    cta: "How delivery works",
    art: "bag",
  },
  {
    n: "03",
    title: "Book us privately",
    body: "Weddings, launches, birthdays, campus weeks — we roll the cart right in.",
    href: "/events",
    cta: "Plan your event",
    art: "calendar",
  },
];

export function ThreeWays() {
  return (
    <ThemeSection theme="blue" flipFrom="milk" aria-labelledby="three-ways-title" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="text-eyebrow mb-4 text-accent">However you like it</p>
          <h2 id="three-ways-title" className="text-h2 max-w-2xl">
            Three ways to get your cup
          </h2>
        </Reveal>
        <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
          {WAYS.map((w) => (
            <StaggerItem as="li" key={w.n}>
              <TransitionLink
                href={w.href}
                className="card-lift group flex h-full flex-col gap-6 rounded-card border-2 border-current/30 p-7 hover:bg-foam-cream hover:text-calm-blue md:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm font-bold">{w.n}</span>
                  <LineArt name={w.art} className="size-14 transition-transform duration-500 ease-(--ease-calm) group-hover:-translate-y-1" strokeWidth={2.5} />
                </div>
                <h3 className="text-h3 mt-6">{w.title}</h3>
                <p className="opacity-90">{w.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-medium">
                  {w.cta}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </TransitionLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </ThemeSection>
  );
}
