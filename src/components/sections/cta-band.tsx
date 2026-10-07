import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

export function CtaBand({
  title,
  body,
  primary,
  secondary,
  theme = "blue",
}: {
  title: string;
  body?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  theme?: "blue" | "cream";
}) {
  return (
    <section data-theme={theme} className={cn("py-20 md:py-24", theme === "blue" ? "bg-calm-blue text-foam-cream" : "bg-foam-cream text-deep-ink")}>
      <Reveal className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="text-h2">{title}</h2>
          {body && <p className="text-body-lg opacity-90">{body}</p>}
        </div>
        <div className="flex w-full flex-col gap-3 xs:w-auto xs:flex-row">
          <Button href={primary.href} size="lg" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} size="lg" variant="outline">
              {secondary.label}
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
