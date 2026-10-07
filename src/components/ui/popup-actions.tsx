"use client";

import { CalendarPlus, MapPin } from "lucide-react";
import type { PopUp } from "@/content/types";
import { downloadIcs } from "@/lib/ics";
import { Button } from "./button";

export function AddToCalendarButton({ popUp, variant = "outline" }: { popUp: PopUp; variant?: "solid" | "outline" }) {
  return (
    <Button
      variant={variant}
      onClick={() => downloadIcs(popUp)}
      icon={<CalendarPlus className="size-4" aria-hidden="true" />}
      aria-label={`Add ${popUp.title} at ${popUp.venue} to your calendar`}
    >
      Add to calendar
    </Button>
  );
}

export function MapButton({ href, venue, variant = "outline" }: { href: string; venue: string; variant?: "solid" | "outline" }) {
  return (
    <Button
      href={href}
      variant={variant}
      icon={<MapPin className="size-4" aria-hidden="true" />}
      aria-label={`Directions to ${venue} (opens Google Maps)`}
    >
      Directions
    </Button>
  );
}
