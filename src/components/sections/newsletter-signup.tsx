"use client";

import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { submitInquiry } from "@/lib/submit-inquiry";
import { Button } from "@/components/ui/button";
import { SteamPaths } from "@/components/motion/steam-paths";
import { EASE_CALM } from "@/lib/motion";

// Same rule as zod's email check, kept inline so the footer (on every page)
// doesn't ship the form libraries the booking/order forms use.
const EMAIL = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

/** "Pop-up dates in your inbox" signup. Lives on blue (footer). */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const inFlight = useRef(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return; // double-submit guard
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError("That email doesn't look quite right.");
      return;
    }
    inFlight.current = true;
    setSubmitting(true);
    setError(undefined);
    try {
      const res = await submitInquiry({ kind: "newsletter", data: { email: value } });
      if (res.ok) setDone(true);
      else setError(res.error);
    } catch {
      setError("We couldn't sign you up just now. Please try again.");
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-card border-2 border-foam-cream/30 p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_CALM }}
            className="flex items-center gap-5"
            role="status"
          >
            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-foam-cream text-calm-blue">
              <Check className="size-6" aria-hidden="true" />
              <SteamPaths className="absolute -top-9 left-1/2 h-9 w-8 -translate-x-1/2 text-foam-cream" delay={0.2} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-h3">You&apos;re on the list</p>
              <p className="opacity-90">Next week&apos;s pop-up dates will land in your inbox. No spam, ever.</p>
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setDone(false);
                }}
                className="mt-1 self-start text-sm underline underline-offset-4 hover:decoration-2"
              >
                Add another email
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-h3">Pop-up dates, in your inbox</h2>
              <p className="opacity-90">One calm email a week with where the cart will be. Unsubscribe anytime.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(undefined);
                  }}
                  className="h-12 w-full rounded-full border-2 border-foam-cream bg-transparent px-5 text-base text-foam-cream placeholder:text-foam-cream/70 focus-visible:bg-foam-cream/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foam-cream/30 aria-[invalid=true]:border-dashed"
                />
                <p id="newsletter-error" role="alert" className="min-h-5 text-sm font-medium">
                  {error}
                </p>
              </div>
              <Button type="submit" disabled={isSubmitting} loading={isSubmitting} icon={<ArrowRight className="size-4" aria-hidden="true" />}>
                {isSubmitting ? "Signing up…" : "Sign me up"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
