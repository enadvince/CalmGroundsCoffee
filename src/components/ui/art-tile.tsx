import Image from "next/image";
import type { GalleryItem } from "@/content/types";
import { LineArt } from "./line-art";
import { cn } from "@/lib/cn";

/**
 * Masked image frame. Shows the real photo when `item.src` is set; until then a
 * line-art placeholder in brand colors (no stock photography).
 * Hover zooms the contents to 1.05 inside the mask.
 */
export function ArtTile({
  item,
  tone = "milk",
  className,
  sizes = "(min-width: 1024px) 20vw, 45vw",
}: {
  item: GalleryItem;
  tone?: "milk" | "blue" | "cream";
  className?: string;
  sizes?: string;
}) {
  const toneClass =
    tone === "blue" ? "bg-calm-blue text-foam-cream" : tone === "cream" ? "bg-foam-cream text-calm-blue" : "bg-milk text-calm-blue";
  return (
    <div className={cn("relative overflow-hidden", toneClass, className)}>
      <div className="absolute inset-0 transition-transform duration-500 ease-(--ease-calm) group-hover:scale-105">
        {item.src ? (
          <Image src={item.src} alt="" fill sizes={sizes} className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center">
            <LineArt name={item.art} className="size-1/2" strokeWidth={2} />
          </div>
        )}
      </div>
      {item.caption && (
        <span className="absolute bottom-3 left-3 text-note text-[1.125rem] leading-none" aria-hidden="true">
          {item.caption}
        </span>
      )}
    </div>
  );
}
