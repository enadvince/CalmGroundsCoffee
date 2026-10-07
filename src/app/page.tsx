import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { NextPopUpSpotlight } from "@/components/sections/next-pop-up-spotlight";
import { LocationMarquee } from "@/components/sections/location-marquee";
import { MenuTeaser } from "@/components/sections/menu-teaser";
import { ThreeWays } from "@/components/sections/three-ways";
import { SocialBlock } from "@/components/sections/social-block";
import { JsonLd } from "@/components/ui/json-ld";
import { getNextPopUp, getSignatureItems, getSocialTiles, getVenues } from "@/lib/content";
import { coffeeShopJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";

// Re-prerender hourly so the derived "next pop-up" never goes stale.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.tagline}` },
  description:
    "Specialty coffee pop-ups around Cebu. See where the blue cart is this week, order a batch for delivery, or book us for your event.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: "Specialty coffee pop-ups around Cebu — find us this week or book us for your event.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={coffeeShopJsonLd()} />
      <HomeHero />
      <NextPopUpSpotlight popUp={getNextPopUp()} />
      <LocationMarquee venues={getVenues()} />
      <MenuTeaser items={getSignatureItems()} />
      <ThreeWays />
      <SocialBlock tiles={getSocialTiles()} />
    </>
  );
}
