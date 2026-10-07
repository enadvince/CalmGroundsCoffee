/**
 * Single access point for site content. Swap these implementations for
 * Supabase / CMS fetches later (make them async) — components won't change.
 */
import { popUps } from "@/content/popups";
import { regulars } from "@/content/regulars";
import { menu, menuCategories } from "@/content/menu";
import { packages } from "@/content/packages";
import { eventFaqs } from "@/content/faq";
import { eventGallery, socialTiles } from "@/content/gallery";
import { site } from "@/content/site";
import type { PopUp } from "@/content/types";
import { getStatus, sortByStart } from "./dates";

export const getSite = () => site;

export const getPopUps = (): PopUp[] => [...popUps].sort(sortByStart);

/** Upcoming + happening now, soonest first. */
export const getActivePopUps = (now = new Date()) =>
  getPopUps().filter((p) => getStatus(p, now) !== "past");

/** The pop-up to spotlight: whatever is on now, else the next one. */
export const getNextPopUp = (now = new Date()): PopUp | undefined =>
  getActivePopUps(now)[0];

export const getRegulars = () => regulars;

export const getMenu = () => menu;
export const getMenuCategories = () => menuCategories;
export const getSignatureItems = () =>
  menu.filter((m) => m.category === "signatures").slice(0, 4);

export const getPackages = () => packages;
export const getEventFaqs = () => eventFaqs;
export const getSocialTiles = () => socialTiles;
export const getEventGallery = () => eventGallery;

/** Unique venue names for the home marquee. */
export const getVenues = () =>
  Array.from(
    new Set([
      ...getPopUps().map((p) => p.venue.split(" — ")[0]),
      ...regulars.map((r) => r.venue),
    ]),
  );

export const formatPrice = (php: number) =>
  `₱${php.toLocaleString("en-PH")}`;
