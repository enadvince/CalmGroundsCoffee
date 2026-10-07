"use client";

import type { PopUp, PopUpStatus } from "@/content/types";
import { getStatus } from "@/lib/dates";
import { useNow } from "@/hooks/use-now";
import { StatusBadge } from "./status-badge";

/** Status badge that re-derives itself on the client (server value used until hydrated). */
export function LiveStatus({
  popUp,
  initial,
  className,
  upcomingLabel,
}: {
  popUp: PopUp;
  initial: PopUpStatus;
  className?: string;
  /** e.g. "Next up" in the home spotlight */
  upcomingLabel?: string;
}) {
  const now = useNow();
  const status = now ? getStatus(popUp, new Date(now)) : initial;
  return <StatusBadge status={status} className={className} label={status === "upcoming" ? upcomingLabel : undefined} />;
}
