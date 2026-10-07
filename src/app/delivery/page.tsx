import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { OrderRequestForm } from "@/components/sections/order-request-form";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { LineArt } from "@/components/ui/line-art";
import { SocialIcon } from "@/components/ui/social-icon";
import { Annotation } from "@/components/ui/annotation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { deliverySteps } from "@/content/delivery-copy";
import { formatPrice, getMenu, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Delivery",
  description: "Order Calm Grounds coffee for delivery around Metro Cebu — pre-order a batch for home or the office.",
  path: "/delivery",
});

export default function DeliveryPage() {
  const site = getSite();
  const { delivery } = site;
  const steps = deliverySteps[delivery.mode];
  const links = site.deliveryLinks.filter((l) => l.enabled);

  const facts = [
    { label: "Coverage", value: delivery.coverage },
    { label: "Lead time", value: delivery.leadTime },
    { label: "Minimum order", value: formatPrice(delivery.minimumOrder) },
    { label: "Order cut-off", value: delivery.cutoff },
    ...(delivery.mode === "preorder-batch" && delivery.batchDays
      ? [{ label: "Batch days", value: delivery.batchDays.join(" & ") }]
      : []),
    ...(delivery.mode === "self-delivery" && delivery.courier ? [{ label: "Courier", value: delivery.courier }] : []),
  ];

  return (
    <>
      <PageHero
        updated={site.updated.delivery}
       
        eyebrow="Delivery"
        title="Calm, delivered"
        intro={
          delivery.mode === "preorder-batch"
            ? "We brew in small batches and bring them to you on set days. Order ahead for home, the office, or a slow afternoon in."
            : "Your usual cup, brought to your door around Metro Cebu."
        }
        art="bag"
      />

      <section data-theme="milk" aria-labelledby="how-title" className="bg-milk py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <p className="text-eyebrow mb-4 text-accent">How it works</p>
            <h2 id="how-title" className="text-h2 max-w-xl">
              From our cart to your door
            </h2>
          </Reveal>
          <Stagger as="ol" className={`mt-12 grid gap-5 sm:grid-cols-2 ${steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {steps.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="flex flex-col gap-4 rounded-card border-2 border-latte bg-steam p-7">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-calm-blue">{String(i + 1).padStart(2, "0")}</span>
                  <LineArt name={s.art} className="size-12 text-calm-blue" strokeWidth={2.5} />
                </div>
                <h3 className="text-h3 mt-4">{s.title}</h3>
                <p className="opacity-90">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-16">
            <h2 className="sr-only">Delivery details</h2>
            <dl className="grid divide-y-2 divide-latte border-y-2 border-latte sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1 py-5 sm:px-5 sm:first:pl-0">
                  <dt className="text-eyebrow opacity-80">{f.label}</dt>
                  <dd className="font-display text-lg font-bold uppercase tracking-[-0.01em]">{f.value}</dd>
                </div>
              ))}
            </dl>
            {/* PLACEHOLDER — coverage, lead time, minimum, and cut-off need the client's real policy. */}
          </Reveal>
        </div>
      </section>

      <section data-theme="cream" id="order" aria-labelledby="order-title" className="bg-foam-cream py-20 md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <Reveal className="flex flex-col gap-6">
            <p className="text-eyebrow text-accent">Order</p>
            <h2 id="order-title" className="text-h2">
              The quickest way? Message us.
            </h2>
            <p className="text-body-lg opacity-90">
              Send your order on Messenger and we&apos;ll reply with your total and a delivery slot. Prefer a form? Fill in the request and we&apos;ll get back to you.
            </p>
            <div data-theme="blue" className="flex flex-col gap-5 rounded-card bg-calm-blue p-7 text-foam-cream">
              <SocialIcon network="messenger" className="size-10" />
              <p className="text-h3">Order on Messenger</p>
              <p className="opacity-90">Replies usually within the hour, 8 AM – 8 PM.</p>
              <Button href={site.messenger} size="lg" icon={<ArrowUpRight className="size-4" aria-hidden="true" />} className="self-start">
                Message us
              </Button>
            </div>
            <Annotation className="hidden lg:block">or use the form →</Annotation>

            {links.length > 0 && (
              <div className="flex flex-col gap-3 pt-2">
                <p className="text-eyebrow opacity-80">Order via</p>
                <ul className="flex flex-wrap gap-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Button href={l.url} variant="outline" icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>
                        {l.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <OrderRequestForm menu={getMenu()} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Ordering for 50 or more?"
        body="That sounds like an event. Bring the whole cart instead."
        primary={{ href: "/events", label: "See event packages" }}
      />
    </>
  );
}
