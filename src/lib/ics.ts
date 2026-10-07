import type { PopUp } from "@/content/types";
import { site } from "@/content/site";

/** RFC 5545 escaping */
const esc = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\;");

const stamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Fold lines longer than 75 octets per RFC 5545. */
const fold = (line: string) => {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    out.push(rest.slice(0, 74));
    rest = " " + rest.slice(74);
  }
  out.push(rest);
  return out.join("\r\n");
};

export function buildIcs(popUp: PopUp): string {
  const description = [
    popUp.partnerEvent,
    popUp.hours ? `Hours: ${popUp.hours}` : undefined,
    popUp.note,
    popUp.mapUrl ? `Map: ${popUp.mapUrl}` : undefined,
    `${site.name} — ${site.tagline}`,
  ]
    .filter(Boolean)
    .join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calm Grounds Coffee//Pop-ups//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${popUp.id}@calmgroundscoffee`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(popUp.startDate)}`,
    `DTEND:${stamp(popUp.endDate)}`,
    `SUMMARY:${esc(`${site.name} at ${popUp.venue}`)}`,
    `LOCATION:${esc(`${popUp.venue}, ${popUp.city}`)}`,
    `DESCRIPTION:${esc(description)}`,
    popUp.mapUrl ? `URL:${popUp.mapUrl}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.map(fold).join("\r\n");
}

export function downloadIcs(popUp: PopUp) {
  const blob = new Blob([buildIcs(popUp)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `calm-grounds-${popUp.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
