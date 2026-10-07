// Adapted from Watermelon UI: components/badge-1 — re-themed to brand tokens,
// with a pulse ring for "Happening now" (disabled under reduced motion via CSS).

import type { PopUpStatus } from "@/content/types";
import { cn } from "@/lib/cn";

const LABEL: Record<PopUpStatus, string> = {
  now: "Happening now",
  upcoming: "Upcoming",
  past: "Past",
};

export function StatusBadge({ status, className, label }: { status: PopUpStatus; className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-eyebrow",
        status === "now" && "border-accent bg-accent text-on-accent",
        status === "upcoming" && "border-accent text-accent",
        status === "past" && "border-line text-fg/75",
        className,
      )}
    >
      <span className="relative inline-flex size-2 rounded-full bg-current">
        {status === "now" && <span className="pulse-dot absolute inset-0 rounded-full" />}
      </span>
      {label ?? LABEL[status]}
    </span>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-current/40 px-2.5 py-0.5 text-xs font-medium", className)}>
      {children}
    </span>
  );
}
