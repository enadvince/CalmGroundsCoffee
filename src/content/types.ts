/**
 * Content types. Components only consume these through the getters in
 * `src/lib/content.ts`, so this data can move to Supabase or a CMS later
 * without touching UI code.
 */

export type PopUp = {
  id: string;
  title: string;
  venue: string;
  city: string;
  /** ISO 8601 with offset, e.g. 2026-10-10T10:00:00+08:00 */
  startDate: string;
  endDate: string;
  hours?: string;
  mapUrl?: string;
  partnerEvent?: string;
  note?: string;
  isRecurring?: false;
};

export type Regular = {
  id: string;
  venue: string;
  city?: string;
  /** Human schedule pattern, e.g. "Every Saturday" */
  schedule: string;
  hours?: string;
  mapUrl?: string;
};

/** Derived from dates — never stored. */
export type PopUpStatus = "now" | "upcoming" | "past";

export type MenuCategory =
  | "espresso"
  | "non-coffee"
  | "signatures"
  | "cold"
  | "food";

export type MenuTag = "bestseller" | "new" | "iced" | "hot" | "oat-friendly";

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  /** PHP, whole pesos */
  price: number;
  tags?: MenuTag[];
};

export type Package = {
  id: string;
  name: string;
  /** PHP; omitted for Custom */
  priceFrom?: number;
  cups?: number;
  hours?: number;
  blurb: string;
  includes: string[];
  featured?: boolean;
  isCustom?: boolean;
};

export type FaqItem = { id: string; question: string; answer: string };

export type DeliveryMode = "self-delivery" | "platform" | "preorder-batch";

export type DeliveryConfig = {
  /** Switch the whole /delivery page between models. */
  mode: DeliveryMode;
  coverage: string;
  leadTime: string;
  minimumOrder: number;
  cutoff: string;
  /** Used when mode === "preorder-batch" */
  batchDays?: string[];
  /** Used when mode === "self-delivery" */
  courier?: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  url: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  messenger: string;
  city: string;
  timezone: string;
  deliveryLinks: { label: string; url: string; enabled: boolean }[];
  delivery: DeliveryConfig;
};

export type LineArtName =
  | "cup"
  | "iced"
  | "beans"
  | "cart"
  | "pin"
  | "bag"
  | "calendar"
  | "pastry"
  | "leaf"
  | "steam";

export type GalleryItem = {
  id: string;
  /** Describes the real photo that should replace this tile. */
  alt: string;
  /** Drop a real photo path here (e.g. /gallery/01.jpg) to replace the line-art tile. */
  src?: string;
  art: LineArtName;
  caption?: string;
};
