import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  label: string;
};

/**
 * Infinite 40s CSS marquee (custom — no Watermelon equivalent).
 * Content is duplicated once for a seamless loop; the copy is aria-hidden.
 * Pauses on hover/focus; stops entirely under prefers-reduced-motion
 * (where the track wraps instead so every item stays readable).
 */
export function Marquee({ children, className, label }: MarqueeProps) {
  return (
    <div className={cn("marquee group relative overflow-hidden", className)} role="region" aria-label={label}>
      <div className="marquee-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">{children}</div>
        <div className="flex shrink-0 items-center motion-reduce:hidden" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
