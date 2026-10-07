"use client";

import type { PopUp } from "@/content/types";
import { getStatus } from "@/lib/dates";
import { useNow } from "@/hooks/use-now";
import { RollingNumber } from "@/components/motion/rolling-digit";
import { cn } from "@/lib/cn";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

/** Live countdown — to opening if upcoming, to close if happening now. */
export function Countdown({ popUp, className }: { popUp: PopUp; className?: string }) {
  const now = useNow();
  const status = now ? getStatus(popUp, new Date(now)) : null;
  const target = status === "now" ? popUp.endDate : popUp.startDate;
  const parts = now ? split(new Date(target).getTime() - now) : null;
  const label = status === "now" ? "Closes in" : "Opens in";

  const units = [
    { key: "d", label: "Days", value: parts?.d },
    { key: "h", label: "Hrs", value: parts?.h },
    { key: "m", label: "Min", value: parts?.m },
    { key: "s", label: "Sec", value: parts?.s },
  ] as const;

  const srText = parts
    ? `${label} ${parts.d} days, ${parts.h} hours, ${parts.m} minutes`
    : "Countdown loading";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-eyebrow opacity-80">{status ? label : "Countdown"}</p>
      {/* Static (non-live) summary for screen readers; the ticking digits are hidden. */}
      <p className="sr-only">
        {srText}
      </p>
      <div className="flex items-end gap-1.5 sm:gap-3" aria-hidden="true">
        {units.map((u, i) => (
          <div key={u.key} className="flex items-end gap-1.5 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <span className="rounded-sm border-2 border-current/15 px-1.5 py-2 font-display text-[clamp(1.375rem,6vw,2.75rem)] font-extrabold leading-none sm:px-3">
                {u.value === undefined ? <span className="inline-block w-[1.44em] text-center">––</span> : <RollingNumber value={u.value} />}
              </span>
              <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] opacity-75">{u.label}</span>
            </div>
            {i < units.length - 1 && <span className="pb-8 font-display text-base font-extrabold opacity-40 sm:text-xl">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
