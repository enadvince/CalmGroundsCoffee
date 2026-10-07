import { CalendarDays, Clock, MapPin, Handshake } from "lucide-react";
import type { PopUp, PopUpStatus } from "@/content/types";
import { dateParts, formatDateRange } from "@/lib/dates";
import { LiveStatus } from "@/components/ui/live-status";
import { AddToCalendarButton, MapButton } from "@/components/ui/popup-actions";
import { cn } from "@/lib/cn";

export function PopUpCard({ popUp, status, className }: { popUp: PopUp; status: PopUpStatus; className?: string }) {
  const { day, month, weekday } = dateParts(popUp.startDate);
  const isNow = status === "now";
  return (
    <article
      data-theme={isNow ? "blue" : "milk"}
      aria-labelledby={`popup-${popUp.id}`}
      className={cn(
        "card-lift flex flex-col gap-6 rounded-card border-2 p-6 sm:flex-row sm:p-8",
        isNow ? "border-calm-blue bg-calm-blue text-foam-cream" : "border-latte bg-steam",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-20 shrink-0 flex-col items-center justify-center rounded-sm border-2 py-3 text-center",
          isNow ? "border-foam-cream/40" : "border-calm-blue/25 text-calm-blue",
        )}
        aria-hidden="true"
      >
        <span className="text-xs font-medium uppercase tracking-[0.14em]">{weekday}</span>
        <span className="font-display text-3xl leading-none font-extrabold">{day}</span>
        <span className="text-xs font-medium uppercase tracking-[0.14em]">{month}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <LiveStatus popUp={popUp} initial={status} />
          {popUp.partnerEvent && (
            <span className="inline-flex items-center gap-1.5 text-sm">
              <Handshake className="size-4" aria-hidden="true" />
              Event partner
            </span>
          )}
        </div>
        <div>
          <h3 id={`popup-${popUp.id}`} className="text-h3">
            {popUp.venue}
          </h3>
          {popUp.partnerEvent ? (
            <p className="mt-1 italic opacity-90">{popUp.partnerEvent}</p>
          ) : (
            <p className="mt-1 opacity-90">{popUp.title}</p>
          )}
        </div>
        <dl className="grid gap-2 text-[0.9375rem] md:grid-cols-3">
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
            <dt className="sr-only">Area</dt>
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <dd>{popUp.city}</dd>
          </div>
        </dl>
        {popUp.note && <p className="text-note text-[1.25rem]">{popUp.note}</p>}
        {status !== "past" && (
          <div className="flex flex-col gap-3 pt-1 xs:flex-row xs:flex-wrap">
            {popUp.mapUrl && <MapButton href={popUp.mapUrl} venue={popUp.venue} variant={isNow ? "solid" : "outline"} />}
            <AddToCalendarButton popUp={popUp} />
          </div>
        )}
      </div>
    </article>
  );
}
