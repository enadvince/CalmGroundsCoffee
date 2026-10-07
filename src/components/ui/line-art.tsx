import type { LineArtName } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Original single-stroke accents in the mascot's line style.
 * (The mascot itself is never redrawn — see <Mascot>.)
 */
const PATHS: Record<LineArtName, React.ReactNode> = {
  cup: (
    <>
      <path d="M14 26h32v14a14 14 0 0 1-14 14h-4a14 14 0 0 1-14-14V26z" />
      <path d="M46 30h3a6 6 0 0 1 0 12h-4" />
      <path d="M10 58h44" />
      <path d="M24 20c-2-3 2-5 0-9M32 20c-2-3 2-5 0-9M40 20c-2-3 2-5 0-9" />
      <path d="M25 40c2 2 5 3 7 3s5-1 7-3" />
    </>
  ),
  iced: (
    <>
      <path d="M18 18h28l-4 38a3 3 0 0 1-3 2H25a3 3 0 0 1-3-2l-4-38z" />
      <path d="M16 18h32" />
      <path d="M36 18l6-12h6" />
      <rect x="25" y="28" width="7" height="7" rx="1.5" />
      <rect x="33" y="34" width="7" height="7" rx="1.5" />
      <path d="M21 46h22" />
    </>
  ),
  beans: (
    <>
      <ellipse cx="22" cy="30" rx="10" ry="14" transform="rotate(-25 22 30)" />
      <path d="M17 19c6 6 4 16 10 22" />
      <ellipse cx="42" cy="38" rx="10" ry="14" transform="rotate(20 42 38)" />
      <path d="M45 26c-6 6-2 16-8 24" />
    </>
  ),
  cart: (
    <>
      <path d="M10 22h40v18H10z" />
      <path d="M8 22l6-10h32l6 10" />
      <path d="M14 12V6M46 12V6" />
      <path d="M50 30h6" />
      <circle cx="18" cy="48" r="6" />
      <circle cx="42" cy="48" r="6" />
      <path d="M24 48h12" />
      <path d="M20 31h8M32 31h8" />
    </>
  ),
  pin: (
    <>
      <path d="M32 58S14 38 14 26a18 18 0 0 1 36 0c0 12-18 32-18 32z" />
      <circle cx="32" cy="26" r="7" />
    </>
  ),
  bag: (
    <>
      <path d="M14 22h36l-3 34H17l-3-34z" />
      <path d="M24 22v-4a8 8 0 0 1 16 0v4" />
      <path d="M26 38c2 2 4 3 6 3s4-1 6-3" />
    </>
  ),
  calendar: (
    <>
      <rect x="10" y="14" width="44" height="40" rx="6" />
      <path d="M10 26h44M22 8v10M42 8v10" />
      <path d="M24 40l6 6 11-12" />
    </>
  ),
  pastry: (
    <>
      <path d="M8 40c4-14 14-22 24-22s20 8 24 22c-6 4-14 6-24 6S14 44 8 40z" />
      <path d="M20 24c2 6 2 14 0 20M32 18v28M44 24c-2 6-2 14 0 20" />
    </>
  ),
  leaf: (
    <>
      <path d="M12 52C12 28 28 12 54 10c0 26-16 42-42 42z" />
      <path d="M12 52L40 24" />
    </>
  ),
  steam: (
    <>
      <path d="M20 56c-6-8 6-12 0-22s6-14 0-24" />
      <path d="M32 58c-6-8 6-12 0-22s6-14 0-24" />
      <path d="M44 56c-6-8 6-12 0-22s6-14 0-24" />
    </>
  ),
};

export function LineArt({
  name,
  className,
  strokeWidth = 3,
  title,
}: {
  name: LineArtName;
  className?: string;
  strokeWidth?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-12", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {PATHS[name]}
    </svg>
  );
}
