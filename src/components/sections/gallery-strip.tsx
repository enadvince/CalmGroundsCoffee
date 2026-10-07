import type { GalleryItem } from "@/content/types";
import { ArtTile } from "@/components/ui/art-tile";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";

export function GalleryStrip({ items }: { items: GalleryItem[] }) {
  return (
    <section data-theme="blue" aria-labelledby="gallery-title" className="overflow-hidden bg-calm-blue py-20 text-foam-cream md:py-28">
      <div className="container-page">
        <Reveal className="mb-12 flex max-w-2xl flex-col gap-4">
          <p className="text-eyebrow">From past events</p>
          <h2 id="gallery-title" className="text-h2">
            The cart, at its best
          </h2>
        </Reveal>
      </div>
      <ul className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 md:scroll-px-8 md:gap-6 md:px-8 xl:scroll-px-14 xl:px-14" aria-label="Event gallery (placeholder tiles)">
        {items.map((item, i) => (
          <li key={item.id} className="w-[70vw] shrink-0 snap-start sm:w-[22rem]">
            <Parallax speed={i % 2 ? 0.35 : -0.35}>
              <figure className="group card-lift overflow-hidden rounded-card">
                <ArtTile item={item} tone={i % 2 ? "milk" : "cream"} className="aspect-[4/5]" sizes="(min-width: 640px) 22rem, 70vw" />
                <figcaption className="sr-only">{item.alt}</figcaption>
              </figure>
            </Parallax>
          </li>
        ))}
      </ul>
    </section>
  );
}
