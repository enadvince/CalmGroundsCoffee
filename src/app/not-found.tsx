import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/ui/mascot";
import { SteamPaths } from "@/components/motion/steam-paths";
import { TransitionLink } from "@/components/motion/page-transition";
import { NotFoundSearch } from "@/components/sections/not-found-search";
import { getNextPopUp } from "@/lib/content";
import { formatDateRange } from "@/lib/dates";

const POPULAR = [
  { href: "/pop-ups", label: "Where's the cart this week?" },
  { href: "/menu", label: "See the menu" },
  { href: "/events", label: "Book us for an event" },
  { href: "/delivery", label: "Order delivery" },
];

export default function NotFound() {
  const next = getNextPopUp();
  return (
    <>
      <section data-theme="blue" className="bg-calm-blue pt-32 pb-20 text-foam-cream md:pt-40">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="flex max-w-2xl flex-col gap-6">
            <p className="text-eyebrow">Error 404</p>
            <h1 className="text-h1">This page wandered off for a coffee</h1>
            <p className="text-body-lg">
              The link might be old, or the page moved. Take a breath — everything else is right where you left it.
            </p>
            <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button href="/" size="lg">
                Back home
              </Button>
              <NotFoundSearch />
            </div>
          </div>
          <div className="relative mx-auto w-48 pt-16 lg:w-64">
            <SteamPaths className="absolute top-0 left-1/2 h-16 w-14 -translate-x-1/2" />
            <div className="bob">
              <Mascot className="w-full" decorative sizes="256px" />
            </div>
          </div>
        </div>
      </section>

      <section data-theme="milk" className="bg-milk py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-h3 mb-5">Popular right now</h2>
            <ul className="flex flex-col divide-y-2 divide-latte border-y-2 border-latte">
              {POPULAR.map((l) => (
                <li key={l.href}>
                  <TransitionLink href={l.href} className="group flex items-center justify-between gap-4 py-4 font-medium transition-colors hover:text-calm-blue">
                    {l.label}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
          {next && (
            <div data-theme="cream" className="flex flex-col gap-3 rounded-card border-2 border-latte bg-foam-cream p-7">
              <p className="text-eyebrow text-accent">While you&apos;re here</p>
              <p className="text-h3">{next.venue}</p>
              <p>{formatDateRange(next.startDate, next.endDate)}{next.hours ? ` · ${next.hours}` : ""}</p>
              <Button href="/pop-ups" variant="outline" className="mt-2 self-start" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
                See the next pop-up
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
