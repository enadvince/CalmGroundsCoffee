import type { PopUp, PopUpStatus } from "@/content/types";

export const TIMEZONE = "Asia/Manila";
const OFFSET = "+08:00"; // Philippines has no DST

/** YYYY-MM-DD for `date` in Manila time. */
export function manilaDay(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * ISO timestamp `daysFromToday` days from today (Manila) at `time` (HH:mm).
 * Used to seed placeholder pop-up dates relative to the current day.
 */
export function manilaDate(daysFromToday: number, time = "10:00"): string {
  const today = new Date(`${manilaDay()}T00:00:00${OFFSET}`);
  const target = new Date(today.getTime() + daysFromToday * 86_400_000);
  return `${manilaDay(target)}T${time}:00${OFFSET}`;
}

export function getStatus(popUp: PopUp, now: Date = new Date()): PopUpStatus {
  const start = new Date(popUp.startDate).getTime();
  const end = new Date(popUp.endDate).getTime();
  const t = now.getTime();
  if (t >= start && t <= end) return "now";
  return t < start ? "upcoming" : "past";
}

const dayFmt = new Intl.DateTimeFormat("en-PH", {
  timeZone: TIMEZONE,
  weekday: "short",
  month: "short",
  day: "numeric",
});
const monthFmt = new Intl.DateTimeFormat("en-PH", {
  timeZone: TIMEZONE,
  month: "long",
  year: "numeric",
});
const shortFmt = new Intl.DateTimeFormat("en-PH", {
  timeZone: TIMEZONE,
  month: "short",
  day: "numeric",
});

/** "Sat, Oct 10" or "Sat, Oct 10 – Sun, Oct 11" */
export function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (manilaDay(start) === manilaDay(end)) return dayFmt.format(start);
  return `${dayFmt.format(start)} – ${dayFmt.format(end)}`;
}

export function formatShortDate(iso: string): string {
  return shortFmt.format(new Date(iso));
}

export function formatMonth(iso: string): string {
  return monthFmt.format(new Date(iso));
}

/** Day + month parts for calendar-style date chips. */
export function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-PH", { timeZone: TIMEZONE, day: "numeric" }).format(d),
    month: new Intl.DateTimeFormat("en-PH", { timeZone: TIMEZONE, month: "short" }).format(d),
    weekday: new Intl.DateTimeFormat("en-PH", { timeZone: TIMEZONE, weekday: "short" }).format(d),
  };
}

/** Start of the current week (Monday 00:00, Manila) and end (next Monday). */
function weekBounds(now: Date) {
  const today = new Date(`${manilaDay(now)}T00:00:00${OFFSET}`);
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, weekday: "short" }).format(now);
  const idx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(weekday);
  const start = today.getTime() - idx * 86_400_000;
  return { start, end: start + 7 * 86_400_000 };
}

function monthBounds(now: Date) {
  const [y, m] = manilaDay(now).split("-").map(Number);
  const start = new Date(`${y}-${String(m).padStart(2, "0")}-01T00:00:00${OFFSET}`).getTime();
  const ny = m === 12 ? y + 1 : y;
  const nm = m === 12 ? 1 : m + 1;
  const end = new Date(`${ny}-${String(nm).padStart(2, "0")}-01T00:00:00${OFFSET}`).getTime();
  return { start, end };
}

/** True if the pop-up overlaps the given window. */
function overlaps(popUp: PopUp, start: number, end: number) {
  return new Date(popUp.startDate).getTime() < end && new Date(popUp.endDate).getTime() >= start;
}

export const isThisWeek = (p: PopUp, now = new Date()) => {
  const b = weekBounds(now);
  return overlaps(p, b.start, b.end);
};

export const isThisMonth = (p: PopUp, now = new Date()) => {
  const b = monthBounds(now);
  return overlaps(p, b.start, b.end);
};

export function sortByStart(a: PopUp, b: PopUp) {
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
}
