import { Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { MenuBoard } from "@/components/sections/menu-board";
import { CtaBand } from "@/components/sections/cta-band";
import { getMenu, getMenuCategories, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu",
  description: "Signature lattes, espresso, cold brew, non-coffee drinks, and pastries from the Calm Grounds cart in Cebu.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <PageHero
        updated={getSite().updated.menu}
       
        eyebrow="The menu"
        title="Slow cups, simply made"
        intro="Espresso classics, a few signatures we're proud of, and something for the non-coffee crowd."
        art="cup"
      >
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-foam-cream/40 px-4 py-2 text-sm">
          <Info className="size-4 shrink-0" aria-hidden="true" />
          The menu may vary per pop-up.
        </p>
      </PageHero>
      <MenuBoard categories={getMenuCategories()} items={getMenu()} />
      <CtaBand
        theme="cream"
        title="Can't make it to a pop-up?"
        body="Order a batch for the office, or find the cart near you this week."
        primary={{ href: "/delivery", label: "Order delivery" }}
        secondary={{ href: "/pop-ups", label: "Find a pop-up" }}
      />
    </>
  );
}
