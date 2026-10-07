import type { SiteConfig } from "./types";
import { manilaDay } from "@/lib/dates";

export const site: SiteConfig = {
  name: "Calm Grounds Coffee",
  tagline: "crafted for quiet moments",
  // PLACEHOLDER — replace with the production domain once it's on Vercel
  url: "https://calmgroundscoffee.vercel.app",
  email: "calmgroundscoffee@gmail.com",
  instagram: "https://www.instagram.com/calmgroundscoffee",
  instagramHandle: "@calmgroundscoffee",
  // PLACEHOLDER — confirm the exact Facebook page URL with the client
  facebook: "https://www.facebook.com/calmgroundscoffee",
  // PLACEHOLDER — confirm the Messenger username (m.me/<page-username>)
  messenger: "https://m.me/calmgroundscoffee",
  city: "Cebu City",
  timezone: "Asia/Manila",

  // Only `enabled: true` links render on /delivery.
  // PLACEHOLDER — add the client's real store links.
  deliveryLinks: [
    { label: "GrabFood", url: "https://food.grab.com/ph/en/", enabled: false },
    { label: "foodpanda", url: "https://www.foodpanda.ph/", enabled: false },
    { label: "Lalamove", url: "https://www.lalamove.com/en-ph/", enabled: true },
  ],

  // Switch `mode` to "self-delivery" or "platform" to change the /delivery page.
  // PLACEHOLDER — every value below needs the client's real policy.
  delivery: {
    mode: "preorder-batch",
    coverage: "Cebu City, Mandaue, and parts of Talisay",
    leadTime: "Order a day ahead",
    minimumOrder: 600,
    cutoff: "8:00 PM the night before",
    batchDays: ["Wednesday", "Saturday"],
    courier: "Lalamove",
  },

  // PLACEHOLDER dates — bump these whenever the matching content file changes.
  // Pop-ups uses today's date because the demo schedule is regenerated daily.
  updated: {
    popUps: manilaDay(),
    menu: "2026-10-01",
    delivery: "2026-09-28",
    events: "2026-09-28",
    about: "2026-09-15",
  },
};
