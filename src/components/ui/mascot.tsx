import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The client's mascot, unaltered (public/brand/mascot.png), always shown on
 * its cream circle. Pass `decorative` when adjacent text already names the brand.
 */
export function Mascot({
  className,
  priority,
  decorative,
  sizes = "(min-width: 1024px) 40vw, 70vw",
}: {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative aspect-square overflow-hidden rounded-full bg-foam-cream", className)}>
      <Image
        src="/brand/mascot.png"
        alt={decorative ? "" : "Calm Grounds mascot — a smiling coffee cup meditating, with steam rising"}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
