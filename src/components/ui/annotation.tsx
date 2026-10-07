import { cn } from "@/lib/cn";

/** Handwritten Caveat aside — decorative only; never the sole carrier of info. */
export function Annotation({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-note -rotate-3 text-accent", className)}>{children}</p>;
}
