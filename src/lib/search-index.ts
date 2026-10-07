import { menu, menuCategories } from "@/content/menu";
import { popUps } from "@/content/popups";
import { regulars } from "@/content/regulars";
import { packages } from "@/content/packages";
import { eventFaqs } from "@/content/faq";
import { site } from "@/content/site";
import { formatDateRange } from "./dates";

export type SearchKind = "Page" | "Menu" | "Pop-up" | "Regular spot" | "Package" | "FAQ";

export type SearchEntry = {
  id: string;
  kind: SearchKind;
  title: string;
  snippet: string;
  href: string;
  /** Lower-cased text the query is matched against. */
  haystack: string;
};

const PAGES = [
  { href: "/", title: "Home", snippet: `${site.name} — ${site.tagline}. Find this week's pop-up.`, extra: "home start coffee cart cebu" },
  { href: "/pop-ups", title: "Pop-ups", snippet: "Where the cart is this week, plus our regular spots.", extra: "schedule location where when calendar find us" },
  { href: "/menu", title: "Menu", snippet: "Signatures, espresso, cold drinks, non-coffee, pastries.", extra: "drinks prices food coffee latte" },
  { href: "/delivery", title: "Delivery", snippet: "Pre-order a batch for home or the office.", extra: "order deliver messenger lalamove grab foodpanda" },
  { href: "/events", title: "Private events", snippet: "Book the cart for weddings, launches, birthdays.", extra: "book booking wedding corporate party catering packages inquiry" },
  { href: "/about", title: "About & contact", snippet: "Our story, and how to reach us.", extra: "story contact email instagram facebook" },
];

function entry(e: Omit<SearchEntry, "haystack">, extra = ""): SearchEntry {
  return { ...e, haystack: `${e.title} ${e.snippet} ${e.kind} ${extra}`.toLowerCase() };
}

export function buildSearchIndex(): SearchEntry[] {
  const catLabel = Object.fromEntries(menuCategories.map((c) => [c.id, c.label]));
  return [
    ...PAGES.map((p) => entry({ id: `page-${p.href}`, kind: "Page", title: p.title, snippet: p.snippet, href: p.href }, p.extra)),
    ...menu.map((m) =>
      entry(
        { id: `menu-${m.id}`, kind: "Menu", title: m.name, snippet: `${catLabel[m.category]} · ₱${m.price} — ${m.description}`, href: `/menu#cat-${m.category}` },
        (m.tags ?? []).join(" "),
      ),
    ),
    ...popUps.map((p) =>
      entry(
        { id: `popup-${p.id}`, kind: "Pop-up", title: p.venue, snippet: `${formatDateRange(p.startDate, p.endDate)} · ${p.title}`, href: "/pop-ups" },
        `${p.city} ${p.partnerEvent ?? ""} ${p.note ?? ""}`,
      ),
    ),
    ...regulars.map((r) =>
      entry({ id: `regular-${r.id}`, kind: "Regular spot", title: r.venue, snippet: `${r.schedule}${r.hours ? ` · ${r.hours}` : ""}`, href: "/pop-ups" }, r.city ?? ""),
    ),
    ...packages.map((p) => entry({ id: `pkg-${p.id}`, kind: "Package", title: p.name, snippet: p.blurb, href: "/events" }, p.includes.join(" "))),
    ...eventFaqs.map((f) => entry({ id: `faq-${f.id}`, kind: "FAQ", title: f.question, snippet: f.answer, href: "/events#faq-title" })),
  ];
}

/** Every query word must appear; titles that start with the query rank first. */
export function searchIndex(index: SearchEntry[], query: string, limit = 12): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return index
    .filter((e) => words.every((w) => e.haystack.includes(w)))
    .map((e) => {
      const t = e.title.toLowerCase();
      const score = (t.startsWith(q) ? 0 : t.includes(q) ? 1 : 2) * 10 + (e.kind === "Page" ? 0 : 1);
      return { e, score };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((r) => r.e);
}
