import type { PopUp } from "./types";
import { manilaDate } from "@/lib/dates";

/**
 * PLACEHOLDER dates — seeded relative to today (Asia/Manila) so the demo
 * always has something "Happening now", "Upcoming", and "Past".
 * Replace with real ISO dates, e.g. "2026-11-14T10:00:00+08:00".
 */
const d = manilaDate;

export const popUps: PopUp[] = [
  {
    id: "raketz-cebu-2026",
    title: "Raketz Cebu 2026",
    venue: "Ayala Center Cebu",
    city: "Cebu Business Park",
    startDate: d(-1, "10:00"), // PLACEHOLDER date
    endDate: d(1, "21:00"), // PLACEHOLDER date
    hours: "10 AM – 9 PM",
    mapUrl: "https://maps.google.com/?q=Ayala+Center+Cebu",
    partnerEvent:
      "Raketz Cebu 2026 — Cebu's Entrepreneurship & Culture Festival",
    note: "Find the blue cart near the Activity Center.",
  },
  {
    id: "astra-weekend",
    title: "Weekend at Astra",
    venue: "Astra Lifestyle Centre",
    city: "Cebu City",
    startDate: d(4, "11:00"), // PLACEHOLDER date
    endDate: d(5, "20:00"), // PLACEHOLDER date
    hours: "11 AM – 8 PM",
    mapUrl: "https://maps.google.com/?q=Astra+Lifestyle+Centre+Cebu",
    note: "Seasonal signature on the menu all weekend.",
  },
  {
    id: "usc-tc-org-fair",
    title: "Campus Org Fair",
    venue: "USC Talamban Campus",
    city: "Talamban, Cebu City",
    startDate: d(9, "08:00"), // PLACEHOLDER date
    endDate: d(10, "17:00"), // PLACEHOLDER date
    hours: "8 AM – 5 PM",
    mapUrl: "https://maps.google.com/?q=University+of+San+Carlos+Talamban",
    partnerEvent: "USC-TC Org Fair",
    note: "Look for the blue cart by the main lobby.",
  },
  {
    id: "it-park-night-market",
    title: "Night Market Pop-up",
    venue: "Cebu IT Park",
    city: "Lahug, Cebu City",
    startDate: d(18, "17:00"), // PLACEHOLDER date
    endDate: d(18, "23:00"), // PLACEHOLDER date
    hours: "5 PM – 11 PM",
    mapUrl: "https://maps.google.com/?q=Cebu+IT+Park",
  },
  {
    id: "sm-seaside-weekend",
    title: "Slow Sunday Pop-up",
    venue: "SM Seaside City Cebu",
    city: "South Road Properties",
    startDate: d(26, "10:00"), // PLACEHOLDER date
    endDate: d(27, "21:00"), // PLACEHOLDER date
    hours: "10 AM – 9 PM",
    mapUrl: "https://maps.google.com/?q=SM+Seaside+City+Cebu",
  },
  {
    id: "crossroads-makers",
    title: "Makers' Weekend",
    venue: "The Crossroads",
    city: "Banilad, Cebu City",
    startDate: d(-12, "10:00"), // PLACEHOLDER date
    endDate: d(-11, "20:00"), // PLACEHOLDER date
    hours: "10 AM – 8 PM",
    mapUrl: "https://maps.google.com/?q=The+Crossroads+Banilad+Cebu",
  },
  {
    id: "ayala-terraces-launch",
    title: "Cart Launch Day",
    venue: "Ayala Center Cebu — The Terraces",
    city: "Cebu Business Park",
    startDate: d(-30, "11:00"), // PLACEHOLDER date
    endDate: d(-30, "21:00"), // PLACEHOLDER date
    hours: "11 AM – 9 PM",
    mapUrl: "https://maps.google.com/?q=The+Terraces+Ayala+Center+Cebu",
  },
];
