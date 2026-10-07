import { Marquee } from "@/components/motion/marquee";
import { LineArt } from "@/components/ui/line-art";

export function LocationMarquee({ venues }: { venues: string[] }) {
  return (
    <section data-theme="blue" aria-label="Where you'll find us" className="overflow-hidden border-y-2 border-foam-cream/20 bg-calm-blue py-10 text-foam-cream md:py-14">
      <Marquee label="Venues we pop up at">
        {venues.map((v) => (
          <span key={v} className="flex items-center">
            <span className="text-marquee text-outline px-6 whitespace-nowrap md:px-10">{v}</span>
            <LineArt name="pin" className="size-8 shrink-0 md:size-12" strokeWidth={3.5} />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
