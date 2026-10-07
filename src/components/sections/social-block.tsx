import type { GalleryItem } from "@/content/types";
import { site } from "@/content/site";
import { withUtm } from "@/lib/utm";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { Annotation } from "@/components/ui/annotation";
import { ArtTile } from "@/components/ui/art-tile";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function SocialBlock({ tiles }: { tiles: GalleryItem[] }) {
  return (
    <section data-theme="cream" aria-labelledby="social-title" className="bg-foam-cream py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal className="flex flex-col gap-5">
          <p className="text-eyebrow text-accent">{site.instagramHandle}</p>
          <h2 id="social-title" className="text-h2">
            Follow the cart
          </h2>
          <p className="text-body-lg max-w-md opacity-90">
            New pop-up dates, seasonal cups, and the occasional quiet moment — they all land on our feed first.
          </p>
          <div className="mt-2 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button href={site.instagram} icon={<SocialIcon network="instagram" className="size-4" />}>
              Follow on Instagram
            </Button>
            <Button href={site.facebook} variant="outline" icon={<SocialIcon network="facebook" className="size-4" />}>
              Like on Facebook
            </Button>
          </div>
          <Annotation className="mt-4">tag us — we love seeing your cups!</Annotation>
        </Reveal>

        <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4" aria-label="Recent posts (placeholders)">
          {tiles.map((t, i) => (
            <StaggerItem as="li" key={t.id}>
              <a
                href={withUtm(site.instagram, "social-grid")}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group block overflow-hidden rounded-sm"
                aria-label={`${t.alt} — view on Instagram (opens in a new tab)`}
              >
                <ArtTile item={t} tone={i % 3 === 1 ? "blue" : "milk"} className="aspect-square" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
