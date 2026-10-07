import { ArrowDown } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Packages } from "@/components/sections/packages";
import { GalleryStrip } from "@/components/sections/gallery-strip";
import { BookingForm } from "@/components/sections/booking-form";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LineArt } from "@/components/ui/line-art";
import { Annotation } from "@/components/ui/annotation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { getEventFaqs, getEventGallery, getPackages, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { LineArtName } from "@/content/types";

export const metadata = pageMetadata({
  title: "Private events",
  description: "Book the Calm Grounds coffee cart for weddings, corporate events, birthdays, campus events, and launches around Cebu.",
  path: "/events",
});

const OCCASIONS: { title: string; body: string; art: LineArtName }[] = [
  { title: "Weddings", body: "A warm cup between the vows and the reception.", art: "cup" },
  { title: "Corporate", body: "Town halls, offsites, and client days that feel a little calmer.", art: "calendar" },
  { title: "Birthdays", body: "Debuts, milestones, and Sunday-afternoon parties.", art: "pastry" },
  { title: "Campus events", body: "Org fairs, finals week, and graduation days.", art: "iced" },
  { title: "Launches", body: "Store openings and product launches with a line worth having.", art: "cart" },
];

const NEXT_STEPS = [
  "Send the form — it takes two minutes.",
  "We reply within 1–2 days with availability and a quote.",
  "A 50% deposit locks in your date.",
  "We roll up an hour early to set up. You enjoy the day.",
];

export default function EventsPage() {
  const site = getSite();
  const packages = getPackages();
  return (
    <>
      <PageHero
        eyebrow="Private events"
        title={
          <>
            Bring the cart
            <br />
            to your event
          </>
        }
        intro="Specialty coffee, poured slowly, right where your guests are. We handle the cart, baristas, cups, and setup."
        art="cart"
      >
        <Button href="#book" size="lg" icon={<ArrowDown className="size-4" aria-hidden="true" />}>
          Check your date
        </Button>
      </PageHero>

      <section data-theme="milk" aria-labelledby="occasions-title" className="bg-milk py-20 md:py-28">
        <div className="container-page">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow text-accent">Made for</p>
            <h2 id="occasions-title" className="text-h2">
              Any gathering that deserves a good cup
            </h2>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {OCCASIONS.map((o) => (
              <StaggerItem as="li" key={o.title} className="card-lift flex flex-col gap-3 rounded-card border-2 border-latte bg-steam p-6">
                <LineArt name={o.art} className="size-12 text-calm-blue" strokeWidth={2.5} />
                <h3 className="text-h3 mt-3">{o.title}</h3>
                <p className="text-[0.9375rem] opacity-90">{o.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Packages packages={packages} />
      <GalleryStrip items={getEventGallery()} />

      <section data-theme="milk" id="book" aria-labelledby="book-title" className="scroll-mt-20 bg-milk py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <p className="text-eyebrow text-accent">Booking inquiry</p>
            <h2 id="book-title" className="text-h2">
              Let&apos;s plan your cup count
            </h2>
            <p className="text-body-lg opacity-90">Tell us a little about the day. No commitment — we&apos;ll come back with options.</p>
            <ol className="flex flex-col gap-4 border-t-2 border-latte pt-6">
              {NEXT_STEPS.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-calm-blue font-display text-xs font-bold text-foam-cream">{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
            <p className="text-sm opacity-90">
              Rather email? <a href={`mailto:${site.email}`} className="font-medium text-calm-blue underline underline-offset-4">{site.email}</a>
            </p>
            <Annotation className="hidden lg:block">we read every one ♡</Annotation>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingForm packages={packages} />
          </Reveal>
        </div>
      </section>

      <section data-theme="cream" aria-labelledby="faq-title" className="bg-foam-cream py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <p className="text-eyebrow text-accent">Good to know</p>
            <h2 id="faq-title" className="text-h2">
              Questions, answered
            </h2>
            <p className="text-body-lg opacity-90">Anything else? Message us — we&apos;re happy to help.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={getEventFaqs()} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
