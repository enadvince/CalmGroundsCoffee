"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Repeat, MapPin, Clock } from "lucide-react";
import type { PopUp, PopUpStatus, Regular } from "@/content/types";
import { formatMonth, getStatus, isThisMonth, isThisWeek, formatShortDate } from "@/lib/dates";
import { useNow } from "@/hooks/use-now";
import { SlidingTabs } from "@/components/ui/sliding-tabs";
import { Button } from "@/components/ui/button";
import { LineArt } from "@/components/ui/line-art";
import { Reveal } from "@/components/motion/reveal";
import { EASE_CALM } from "@/lib/motion";
import { PopUpCard } from "./pop-up-card";
import { withUtm } from "@/lib/utm";

type Filter = "all" | "week" | "month" | "regulars";

type Props = {
  popUps: PopUp[];
  regulars: Regular[];
  /** Server-derived statuses, used until the client clock hydrates. */
  initialStatus: Record<string, PopUpStatus>;
  /** Server render time, so SSR and hydration filter identically. */
  renderedAt: number;
};

export function PopUpExplorer({ popUps, regulars, initialStatus, renderedAt }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const clock = useNow();
  const now = clock ?? renderedAt;

  const statusOf = (p: PopUp) => (clock ? getStatus(p, new Date(clock)) : initialStatus[p.id]);
  // Bucket by minute so lists don't recompute every second.
  const minute = Math.floor(now / 60000);

  const { active, past } = useMemo(() => {
    const at = new Date(minute * 60000);
    const active = popUps.filter((p) => getStatus(p, at) !== "past");
    const past = popUps.filter((p) => getStatus(p, at) === "past").reverse();
    return { active, past };
  }, [popUps, minute]);

  const visible = useMemo(() => {
    const at = new Date(minute * 60000);
    if (filter === "week") return active.filter((p) => isThisWeek(p, at));
    if (filter === "month") return active.filter((p) => isThisMonth(p, at));
    if (filter === "regulars") return [];
    return active;
  }, [active, filter, minute]);

  const groups = useMemo(() => {
    const map = new Map<string, PopUp[]>();
    for (const p of visible) {
      const key = formatMonth(p.startDate);
      map.set(key, [...(map.get(key) ?? []), p]);
    }
    return Array.from(map.entries());
  }, [visible]);

  const showTimeline = filter !== "regulars";
  const showRegulars = filter === "all" || filter === "regulars";
  const resultText =
    filter === "regulars"
      ? `${regulars.length} regular spots`
      : `${visible.length} upcoming pop-up${visible.length === 1 ? "" : "s"}${filter === "week" ? " this week" : filter === "month" ? " this month" : ""}`;

  return (
    <>
      <div className="sticky top-16 z-20 border-b-2 border-latte bg-milk/95 py-3 md:top-[4.5rem] print:hidden" data-theme="milk">
        <div className="container-page flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <SlidingTabs
            label="Filter pop-ups"
            active={filter}
            onChange={(id) => setFilter(id as Filter)}
            tabs={[
              { id: "all", label: "All" },
              { id: "week", label: "This week" },
              { id: "month", label: "This month" },
              { id: "regulars", label: "Regulars" },
            ]}
            className="self-start"
          />
          <p className="text-sm opacity-80" role="status" aria-live="polite">
            {resultText}
          </p>
        </div>
      </div>

      {showTimeline && (
        <section data-theme="milk" aria-labelledby="upcoming-title" className="bg-milk py-16 md:py-24">
          <div className="container-page">
            <Reveal>
              <h2 id="upcoming-title" className="text-h2 mb-10">
                Upcoming
              </h2>
            </Reveal>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE_CALM }}
              >
                {groups.length === 0 ? (
                  <div className="flex flex-col items-start gap-5 rounded-card border-2 border-dashed border-latte p-8 md:p-12">
                    <LineArt name="cart" className="size-20 text-calm-blue" strokeWidth={2} />
                    <p className="text-h3">Nothing booked {filter === "week" ? "this week" : "this month"} — yet.</p>
                    <p className="max-w-md opacity-90">Our regular spots are still on. Or follow us on Instagram — new dates land there first.</p>
                    <Button variant="outline" onClick={() => setFilter("regulars")}>
                      See our regulars
                    </Button>
                  </div>
                ) : (
                  <ol className="relative flex flex-col gap-14 border-l-2 border-latte pl-6 md:pl-10">
                    {groups.map(([month, items]) => (
                      <li key={month}>
                        <h3 className="text-eyebrow relative mb-5 text-calm-blue">
                          <span className="absolute top-1/2 -left-[calc(1.5rem+7px)] size-3 -translate-y-1/2 rounded-full border-2 border-calm-blue bg-milk md:-left-[calc(2.5rem+7px)]" aria-hidden="true" />
                          {month}
                        </h3>
                        <ul className="flex flex-col gap-5">
                          {items.map((p) => (
                            <li key={p.id}>
                              <PopUpCard popUp={p} status={statusOf(p)} />
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {showRegulars && (
        <section data-theme="cream" aria-labelledby="regulars-title" className="bg-foam-cream py-16 md:py-24">
          <div className="container-page">
            <Reveal className="mb-10 flex max-w-2xl flex-col gap-4">
              <p className="text-eyebrow text-accent">Every week, like clockwork</p>
              <h2 id="regulars-title" className="text-h2">
                Regulars
              </h2>
              <p className="text-body-lg opacity-90">The spots we come back to. If you&apos;re nearby, you know where to find us.</p>
            </Reveal>
            <ul className="grid gap-5 md:grid-cols-3">
              {regulars.map((r) => (
                <li key={r.id} className="card-lift flex flex-col gap-4 rounded-card border-2 border-latte bg-milk p-7">
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-calm-blue px-3 py-1 text-eyebrow text-foam-cream">
                    <Repeat className="size-3.5" aria-hidden="true" />
                    {r.schedule}
                  </span>
                  <h3 className="text-h3">{r.venue}</h3>
                  <dl className="flex flex-col gap-2 text-[0.9375rem]">
                    {r.city && (
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Area</dt>
                        <MapPin className="size-4" aria-hidden="true" />
                        <dd>{r.city}</dd>
                      </div>
                    )}
                    {r.hours && (
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Hours</dt>
                        <Clock className="size-4" aria-hidden="true" />
                        <dd>{r.hours}</dd>
                      </div>
                    )}
                  </dl>
                  {r.mapUrl && (
                    <a href={withUtm(r.mapUrl, "regulars")} target="_blank" rel="noopener noreferrer" className="mt-auto pt-2 font-medium text-calm-blue underline underline-offset-4 hover:decoration-2" aria-label={`Directions to ${r.venue} (opens Google Maps)`}>
                      Get directions
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section data-theme="milk" aria-labelledby="past-title" className="bg-milk py-14 md:py-20">
          <div className="container-page">
            <details className="group rounded-card border-2 border-latte">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8 [&::-webkit-details-marker]:hidden">
                <span>
                  <span id="past-title" className="text-h3 block">
                    Past pop-ups
                  </span>
                  <span className="text-sm opacity-80">
                    {past.length} recent stop{past.length === 1 ? "" : "s"} — thanks for coming by.
                  </span>
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-calm-blue text-xl leading-none text-calm-blue transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <ul className="divide-y-2 divide-latte border-t-2 border-latte">
                {past.map((p) => (
                  <li key={p.id} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
                    <span className="font-medium">
                      {p.venue}
                      <span className="font-normal opacity-80"> · {p.title}</span>
                    </span>
                    <span className="text-sm opacity-80">{formatShortDate(p.startDate)}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>
      )}
    </>
  );
}
