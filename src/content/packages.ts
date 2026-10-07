import type { Package } from "./types";

// PLACEHOLDER — replace with the client's real packages and rates.
export const packages: Package[] = [
  {
    id: "small-gathering",
    name: "Small Gathering",
    priceFrom: 12000,
    cups: 50,
    hours: 2,
    blurb: "Birthdays, intimate showers, team afternoons.",
    includes: ["50 cups, choice of 3 drinks", "1 barista", "Compact cart setup", "Cups, lids & napkins"],
  },
  {
    id: "celebration",
    name: "Celebration",
    priceFrom: 22000,
    cups: 100,
    hours: 3,
    blurb: "Weddings, debuts, and campus events.",
    includes: ["100 cups, choice of 5 drinks", "2 baristas", "Full blue cart setup", "Custom cup stickers"],
    featured: true,
  },
  {
    id: "full-day",
    name: "Full Day",
    priceFrom: 38000,
    cups: 200,
    hours: 6,
    blurb: "Brand launches, conferences, and festivals.",
    includes: ["200 cups, full menu", "3 baristas", "Cart + signage", "Custom cup sleeves & menu board"],
  },
  {
    id: "custom",
    name: "Custom",
    blurb: "Something bigger, smaller, or a little different? Let's plan it together.",
    includes: ["Tailored cup count & hours", "Menu built around your event", "Out-of-town quotes"],
    isCustom: true,
  },
];

export const eventTypes = [
  "Wedding",
  "Corporate event",
  "Birthday",
  "Campus event",
  "Product launch",
  "Other",
] as const;

export const budgetRanges = [
  "Under ₱15,000",
  "₱15,000 – ₱25,000",
  "₱25,000 – ₱40,000",
  "₱40,000+",
  "Not sure yet",
] as const;
