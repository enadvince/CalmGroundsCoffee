import type { PopUp } from "@/content/types";
import { site } from "@/content/site";

export function coffeeShopJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    email: site.email,
    image: `${site.url}/brand/mascot.png`,
    logo: `${site.url}/brand/mascot.png`,
    servesCuisine: "Coffee",
    priceRange: "₱₱",
    areaServed: "Metro Cebu",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "Cebu",
      addressCountry: "PH",
    },
    sameAs: [site.instagram, site.facebook],
  };
}

export function eventJsonLd(popUp: PopUp) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${site.name} at ${popUp.venue}${popUp.partnerEvent ? ` — ${popUp.title}` : ""}`,
    startDate: popUp.startDate,
    endDate: popUp.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: popUp.note ?? `${site.name} pop-up — ${site.tagline}.`,
    image: [`${site.url}/brand/mascot.png`],
    location: {
      "@type": "Place",
      name: popUp.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: popUp.city,
        addressRegion: "Cebu",
        addressCountry: "PH",
      },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    isAccessibleForFree: true,
  };
}
