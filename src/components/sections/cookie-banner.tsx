"use client";

import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";
import { setConsent, useConsent } from "@/lib/consent";
import { Button } from "@/components/ui/button";
import { EASE_CALM } from "@/lib/motion";

/**
 * Simple consent notice. Choices are stored on-device; no analytics runs today,
 * and any added later must check `hasAnalyticsConsent()` first.
 */
export function CookieBanner() {
  const consent = useConsent();
  return (
    <AnimatePresence>
      {consent === null && (
        <motion.section
          aria-label="Cookie preferences"
          data-theme="cream"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_CALM, delay: 0.6 } }}
          exit={{ opacity: 0, y: 24, transition: { duration: 0.3, ease: EASE_CALM } }}
          className="print:hidden fixed inset-x-3 bottom-3 z-40 rounded-card border-2 border-calm-blue bg-foam-cream p-5 text-deep-ink shadow-lift sm:inset-x-auto sm:left-4 sm:max-w-sm sm:p-6"
        >
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 size-5 shrink-0 text-calm-blue" aria-hidden="true" />
            <div className="flex flex-col gap-4">
              <p className="text-[0.9375rem]">
                We use a little on-device storage to remember things like your theme. With your OK, we&apos;d also use
                privacy-friendly analytics to see which pop-ups people look up.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setConsent("all")} className="min-h-11 px-5">
                  Sounds good
                </Button>
                <Button variant="outline" onClick={() => setConsent("essential")} className="min-h-11 px-5">
                  Essentials only
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
