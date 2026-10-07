import type { GalleryItem } from "./types";

// PLACEHOLDER — line-art tiles stand in for real photos.
// Add `src: "/gallery/<file>.jpg"` to any item to swap in a photo.
export const socialTiles: GalleryItem[] = [
  { id: "ig-1", art: "cup", alt: "A Quiet Hour Latte on the cart counter", caption: "Quiet Hour Latte" },
  { id: "ig-2", art: "cart", alt: "The blue cart set up at Ayala Center Cebu", caption: "Ayala pop-up" },
  { id: "ig-3", art: "beans", alt: "Freshly roasted beans in a scoop", caption: "This week's beans" },
  { id: "ig-4", art: "iced", alt: "Iced Sea Salt Cloud with cream foam", caption: "Sea Salt Cloud" },
  { id: "ig-5", art: "pastry", alt: "A banana loaf slice beside a cup", caption: "Banana loaf" },
  { id: "ig-6", art: "pin", alt: "Crowd at a campus pop-up", caption: "See you at USC-TC" },
];

export const eventGallery: GalleryItem[] = [
  { id: "ev-1", art: "cart", alt: "Coffee cart at a garden wedding", caption: "Garden wedding" },
  { id: "ev-2", art: "cup", alt: "Custom-stickered cups lined up", caption: "Custom cups" },
  { id: "ev-3", art: "calendar", alt: "Brand launch with the cart", caption: "Brand launch" },
  { id: "ev-4", art: "iced", alt: "Iced drinks for a campus event", caption: "Campus week" },
  { id: "ev-5", art: "steam", alt: "Barista pouring a latte", caption: "Pour, slowly" },
];
