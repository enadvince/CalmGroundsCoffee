"use client";

// Adapted from Watermelon UI: blocks/footer-16 (oversized brand wordmark,
// compact nav columns, staggered viewport rise).
// Changes: calm-blue surface instead of a dark photo + gradient, no backdrop
// blur or blur filters, cream SVG wordmark in Unbounded, brand socials,
// ease-calm timings, Waddle Labs credit.

import { ArrowUpRight } from "lucide-react";
import { navLinks } from "@/content/nav";
import { site } from "@/content/site";
import { TransitionLink } from "@/components/motion/page-transition";
import { SocialIcon } from "@/components/ui/social-icon";
import { Mascot } from "@/components/ui/mascot";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-theme="blue" className="relative overflow-hidden border-t-2 border-foam-cream/20 bg-calm-blue text-foam-cream">
      <Stagger
        className="container-page flex flex-col gap-14 pt-20 pb-8 md:pt-28"
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <StaggerItem className="flex flex-col items-start gap-6">
            <Mascot className="size-24" decorative sizes="96px" />
            <p className="text-h2 max-w-md">Come find us. Stay a while.</p>
            <p className="text-note">{site.tagline}</p>
          </StaggerItem>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <StaggerItem as="nav" aria-label="Footer">
              <h2 className="text-eyebrow mb-4 font-sans opacity-80">Explore</h2>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <TransitionLink href={l.href} className="underline-offset-4 hover:underline">
                      {l.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-eyebrow mb-4 font-sans opacity-80">Say hi</h2>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href={`mailto:${site.email}`} className="break-all underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    Message us
                  </a>
                </li>
                <li>{site.city}, Philippines</li>
              </ul>
            </StaggerItem>
            <StaggerItem className="col-span-2 sm:col-span-1">
              <h2 className="text-eyebrow mb-4 font-sans opacity-80">Follow</h2>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
                    <SocialIcon network="instagram" className="size-4" />
                    {site.instagramHandle}
                  </a>
                </li>
                <li>
                  <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
                    <SocialIcon network="facebook" className="size-4" />
                    Facebook
                  </a>
                </li>
              </ul>
            </StaggerItem>
          </div>
        </div>

        <StaggerItem aria-hidden="true" className="pointer-events-none -mx-2 select-none">
          <svg viewBox="0 0 1000 150" className="h-auto w-full" preserveAspectRatio="xMidYMid meet">
            <text
              x="50%"
              y="122"
              textAnchor="middle"
              textLength="990"
              lengthAdjust="spacingAndGlyphs"
              className="font-display"
              fontWeight={800}
              fontSize="150"
              fill="currentColor"
            >
              CALM GROUNDS
            </text>
          </svg>
        </StaggerItem>

        <StaggerItem
          className="flex flex-col gap-3 border-t-2 border-foam-cream/25 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {year} {site.name}. Made in Cebu.
          </p>
          <p className="opacity-90">
            Sample site by{" "}
            <a href="https://waddlelabs.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline underline-offset-4">
              Waddle Labs
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </p>
        </StaggerItem>
      </Stagger>
    </footer>
  );
}
