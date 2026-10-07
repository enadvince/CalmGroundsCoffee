import { cn } from "@/lib/cn";

/**
 * PLACEHOLDER wordmark — typeset in Unbounded to echo the client's wide,
 * rounded logotype. Swap for the real wordmark SVG (public/brand/wordmark.svg)
 * once the client sends it.
 */
export function Wordmark({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em]", className)}>
      {compact ? (
        <>Calm Grounds</>
      ) : (
        <>
          Calm
          <br />
          Grounds
        </>
      )}
    </span>
  );
}
