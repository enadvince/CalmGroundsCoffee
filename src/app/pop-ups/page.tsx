import { PageHero } from "@/components/sections/page-hero";
import { PopUpExplorer } from "@/components/sections/pop-up-explorer";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { StatusBadge } from "@/components/ui/status-badge";
import { getActivePopUps, getPopUps, getRegulars, getSite } from "@/lib/content";
import { getStatus } from "@/lib/dates";
import { eventJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Pop-ups",
  description: "Where the Calm Grounds cart is this week — upcoming pop-ups at Cebu malls, campuses, and markets, plus our regular spots.",
  path: "/pop-ups",
});

export default function PopUpsPage() {
  const now = new Date();
  const popUps = getPopUps();
  const initialStatus = Object.fromEntries(popUps.map((p) => [p.id, getStatus(p, now)]));
  const live = popUps.find((p) => initialStatus[p.id] === "now");

  return (
    <>
      <JsonLd data={getActivePopUps(now).map(eventJsonLd)} />
      <PageHero
        updated={getSite().updated.popUps}
       
        eyebrow="Pop-ups"
        title="Find the cart"
        intro="Malls, campuses, markets — we move around Cebu all week. Here's where to find a quiet cup next."
        art="pin"
      >
        {live && (
          <a href="#upcoming-title" className="group inline-flex items-center gap-3">
            <StatusBadge status="now" />
            <span className="underline underline-offset-4 group-hover:decoration-2">at {live.venue}</span>
          </a>
        )}
      </PageHero>
      <PopUpExplorer popUps={popUps} regulars={getRegulars()} initialStatus={initialStatus} renderedAt={now.getTime()} />
      <CtaBand
        title="Want the cart at your event?"
        body="Weddings, launches, birthdays, campus weeks — we'll bring the calm."
        primary={{ href: "/events", label: "Book us" }}
        secondary={{ href: "/delivery", label: "Order delivery" }}
      />
    </>
  );
}
