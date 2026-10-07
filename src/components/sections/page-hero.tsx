import type { LineArtName } from "@/content/types";
import { LineArt } from "@/components/ui/line-art";
import { Parallax } from "@/components/motion/parallax";
import { SteamPaths } from "@/components/motion/steam-paths";

/** Compact blue hero for inner pages. Entrance uses the same CSS choreography as Home. */
export function PageHero({
  eyebrow,
  title,
  intro,
  art = "steam",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  art?: LineArtName;
  children?: React.ReactNode;
}) {
  return (
    <section data-theme="blue" className="relative isolate overflow-hidden bg-calm-blue pt-32 pb-16 text-foam-cream md:pt-40 md:pb-24">
      <div className="container-page grid items-end gap-10 md:grid-cols-[1fr_auto]">
        <div className="flex max-w-3xl flex-col gap-5">
          <p className="text-eyebrow hero-fade" style={{ "--d": "50ms" } as React.CSSProperties}>
            {eyebrow}
          </p>
          <h1 className="text-h1 hero-fade" style={{ "--d": "150ms" } as React.CSSProperties}>
            {title}
          </h1>
          {intro && (
            <div className="text-body-lg hero-fade max-w-2xl" style={{ "--d": "300ms" } as React.CSSProperties}>
              {intro}
            </div>
          )}
          {children && (
            <div className="hero-fade" style={{ "--d": "420ms" } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
        <Parallax speed={0.6} className="pointer-events-none hidden md:block">
          <div className="relative">
            {art === "cup" || art === "cart" ? (
              <SteamPaths className="absolute -top-16 left-1/2 h-16 w-14 -translate-x-1/2" delay={0.5} />
            ) : null}
            <LineArt name={art} className="size-40 lg:size-52" strokeWidth={1.75} />
          </div>
        </Parallax>
      </div>
    </section>
  );
}
