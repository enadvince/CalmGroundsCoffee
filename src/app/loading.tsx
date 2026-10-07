import { Mascot } from "@/components/ui/mascot";
import { SteamPaths } from "@/components/motion/steam-paths";

/** Shown while a route segment streams in (rare — pages are prerendered). */
export default function Loading() {
  return (
    <div data-theme="blue" role="status" aria-live="polite" className="flex min-h-svh flex-col items-center justify-center gap-6 bg-calm-blue text-foam-cream">
      <div className="relative w-28 pt-12">
        <SteamPaths className="absolute top-0 left-1/2 h-12 w-10 -translate-x-1/2" delay={0} />
        <div className="bob">
          <Mascot className="w-28" decorative sizes="112px" />
        </div>
      </div>
      <p className="text-note">brewing…</p>
      <span className="sr-only">Loading page</span>
    </div>
  );
}
