import { ArrowRight, Clock, MapPin, CalendarDays } from "lucide-react";
import type { PopUp } from "@/content/types";
import { getStatus, formatDateRange } from "@/lib/dates";
import { eventJsonLd } from "@/lib/jsonld";
import { Countdown } from "@/components/ui/countdown";
import { LiveStatus } from "@/components/ui/live-status";
import { AddToCalendarButton, MapButton } from "@/components/ui/popup-actions";
import { LineArt } from "@/components/ui/line-art";
import { Annotation } from "@/components/ui/annotation";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { TransitionLink } from "@/components/motion/page-transition";
import { ThemeSection } from "@/components/motion/theme-section";

export function NextPopUpSpotlight({ popUp }: { popUp?: PopUp }) {
  return (
    <ThemeSection theme="cream" id="next-pop-up" aria-labelledby="next-pop-up-title" className="py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="min-w-0">
          <p className="text-eyebrow mb-4 text-accent">Next pop-up</p>
          <h2 id="next-pop-up-title" className="text-h2 mb-8 max-w-xl">
            Find us this week
          </h2>

          {popUp ? (
            <article data-theme="blue" className="rounded-card bg-calm-blue p-6 text-foam-cream shadow-lift sm:p-8 md:p-10">
              <JsonLd data={eventJsonLd(popUp)} />
              <div className="flex flex-wrap items-center gap-3">
                <LiveStatus popUp={popUp} initial={getStatus(popUp)} upcomingLabel="Next up" />
                {popUp.partnerEvent && <span className="text-sm opacity-90">Event partner</span>}
              </div>
              <h3 className="text-h3 mt-5 text-[clamp(1.5rem,1.2rem+1.5vw,2.25rem)]">{popUp.venue}</h3>
              {popUp.partnerEvent && <p className="mt-2 max-w-xl text-body-lg italic opacity-90">{popUp.partnerEvent}</p>}

              <dl className="mt-6 grid gap-3 text-[0.9375rem] sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <dt className="sr-only">Dates</dt>
                  <CalendarDays className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <dd>{formatDateRange(popUp.startDate, popUp.endDate)}</dd>
                </div>
                {popUp.hours && (
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Hours</dt>
                    <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <dd>{popUp.hours}</dd>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <dt className="sr-only">Location</dt>
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <dd>{popUp.city}</dd>
                </div>
              </dl>

              <Countdown popUp={popUp} className="mt-8 border-t-2 border-foam-cream/20 pt-6" />

              <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                {popUp.mapUrl && <MapButton href={popUp.mapUrl} venue={popUp.venue} variant="solid" />}
                <AddToCalendarButton popUp={popUp} />
              </div>
            </article>
          ) : (
            <p className="text-body-lg max-w-lg">
              We&apos;re planning the next stop. Follow us on Instagram — new dates land there first.
            </p>
          )}
        </Reveal>

        <div className="relative flex flex-col items-center gap-6 lg:items-start">
          <Parallax speed={0.5}>
            <LineArt name="cart" className="size-56 text-calm-blue md:size-72" strokeWidth={1.75} />
          </Parallax>
          <Annotation className="lg:ml-16">come say hi →</Annotation>
          <TransitionLink
            href="/pop-ups"
            className="group inline-flex items-center gap-2 font-medium text-calm-blue underline-offset-4 hover:underline"
          >
            See every pop-up
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </TransitionLink>
        </div>
      </div>
    </ThemeSection>
  );
}
