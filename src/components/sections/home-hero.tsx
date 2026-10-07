import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/ui/mascot";
import { LineArt } from "@/components/ui/line-art";
import { SteamPaths } from "@/components/motion/steam-paths";
import { Parallax } from "@/components/motion/parallax";
import { site } from "@/content/site";

// Layout is custom (every Watermelon hero is photo/landscape-led); the staggered
// entrance choreography follows blocks/hero-20, re-timed to the brand motion system.

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em] whitespace-nowrap" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={i} className="hero-letter" style={{ "--i": i + offset } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function HomeHero() {
  return (
    <section
      data-theme="blue"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-calm-blue pt-24 text-foam-cream md:pt-28"
    >
      {/* Decorative line-art with subtle parallax */}
      <Parallax speed={0.8} className="pointer-events-none absolute top-[18%] left-[-2.5rem] -z-10 opacity-25 md:left-6">
        <LineArt name="beans" className="size-28 md:size-36" strokeWidth={2.5} />
      </Parallax>
      <Parallax speed={-0.6} className="pointer-events-none absolute bottom-[8%] left-[46%] -z-10 hidden opacity-25 lg:block">
        <LineArt name="leaf" className="size-24" strokeWidth={2.5} />
      </Parallax>

      <div className="container-page grid flex-1 items-center gap-8 pb-16 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <p className="text-eyebrow hero-fade" style={{ "--d": "100ms" } as React.CSSProperties}>
            Specialty coffee pop-ups · Cebu
          </p>
          <h1 id="hero-title" className="text-[clamp(2.5rem,11.5vw,7rem)] leading-[0.88] font-extrabold tracking-[-0.03em] lg:text-[clamp(4.5rem,6.4vw,8.5rem)]">
            <span className="sr-only">Calm Grounds Coffee</span>
            <Letters text="Calm" />
            <Letters text="Grounds" offset={4} />
            <span
              className="hero-fade mt-3 block font-display text-[clamp(0.875rem,0.7rem+0.8vw,1.375rem)] font-bold tracking-[0.5em]"
              style={{ "--d": "650ms" } as React.CSSProperties}
              aria-hidden="true"
            >
              Coffee
            </span>
          </h1>
          <p className="hero-fade text-body-lg max-w-md" style={{ "--d": "750ms" } as React.CSSProperties}>
            <span className="text-note mr-1 inline-block text-[1.5em]">{site.tagline}.</span>
            <br />
            Good coffee from a little blue cart — at malls, campuses, and markets around Cebu.
          </p>
          <div className="hero-fade flex flex-col gap-3 xs:flex-row xs:flex-wrap" style={{ "--d": "850ms" } as React.CSSProperties}>
            <Button href="/pop-ups" size="lg" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
              Find us this week
            </Button>
            <Button href="/events" size="lg" variant="outline">
              Book us for your event
            </Button>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-[min(58vw,15rem)] pt-16 sm:w-[min(50vw,20rem)] lg:order-2 lg:w-full lg:max-w-[32rem] lg:pt-24">
          <SteamPaths className="absolute top-0 left-1/2 h-20 w-16 -translate-x-1/2 text-foam-cream sm:h-24 sm:w-20 lg:h-32 lg:w-28" delay={0.9} />
          <div className="bob">
            <Mascot priority className="w-full shadow-[0_30px_60px_-30px_rgb(11_26_92/0.6)]" sizes="(min-width: 1024px) 32rem, (min-width: 640px) 20rem, 58vw" />
          </div>
        </div>
      </div>

      <a
        href="#next-pop-up"
        className="hero-fade group absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-sm font-medium md:flex"
        style={{ "--d": "1200ms" } as React.CSSProperties}
      >
        Scroll
        <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
      </a>
    </section>
  );
}
