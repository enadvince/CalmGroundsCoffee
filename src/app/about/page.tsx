import { Mail } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Mascot } from "@/components/ui/mascot";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/ui/social-icon";
import { LineArt } from "@/components/ui/line-art";
import { Annotation } from "@/components/ui/annotation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SteamPaths } from "@/components/motion/steam-paths";
import { getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { LineArtName } from "@/content/types";

export const metadata = pageMetadata({
  title: "About",
  description: "Calm Grounds Coffee is a Cebu-based specialty coffee pop-up — crafted for quiet moments. Our story, and how to reach us.",
  path: "/about",
});

// PLACEHOLDER — brand story and values to be replaced with the client's words.
const VALUES: { title: string; body: string; art: LineArtName }[] = [
  { title: "Slow on purpose", body: "We don't rush a shot or a pour. A few extra seconds make a calmer cup.", art: "steam" },
  { title: "Good beans, close to home", body: "We work with roasters we know and keep the menu short so every cup gets attention.", art: "beans" },
  { title: "Wherever you are", body: "A cart, not a café — so we can meet you at the mall, on campus, or at your celebration.", art: "cart" },
];

export default function AboutPage() {
  const site = getSite();
  return (
    <>
      <PageHero eyebrow="About us" title={site.tagline} intro="A little blue cart with one simple idea: good coffee tastes better when you slow down for it." art="leaf" />

      <section data-theme="milk" aria-labelledby="story-title" className="bg-milk py-20 md:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm pt-16">
            <SteamPaths className="absolute top-0 left-1/2 h-20 w-16 -translate-x-1/2 text-calm-blue" />
            <Parallax speed={0.3}>
              <Mascot className="w-full border-2 border-latte" />
            </Parallax>
            <Annotation className="absolute -right-2 bottom-4 sm:-right-10">that&apos;s us, mid-sip</Annotation>
          </div>
          <Reveal className="flex flex-col gap-5">
            <p className="text-eyebrow text-accent">Our story</p>
            <h2 id="story-title" className="text-h2">
              It started with one cart and a quiet idea
            </h2>
            <div className="text-body-lg flex flex-col gap-4 opacity-90">
              <p>
                Calm Grounds began in Cebu as a weekend pop-up — a single cart, a good grinder, and a hope that people would stop for a minute.
              </p>
              <p>
                They did. Now we roll into malls, campuses, and markets around the city, and bring the cart to weddings, offices, and celebrations.
              </p>
              <p>Every cup is still made the same way: slowly, carefully, and for you.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section data-theme="cream" aria-labelledby="values-title" className="bg-foam-cream py-20 md:py-28">
        <div className="container-page">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <p className="text-eyebrow text-accent">What we believe</p>
            <h2 id="values-title" className="text-h2">
              Crafted for quiet moments
            </h2>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => (
              <StaggerItem as="li" key={v.title} className="flex flex-col gap-4 rounded-card border-2 border-latte bg-milk p-7">
                <LineArt name={v.art} className="size-14 text-calm-blue" strokeWidth={2.25} />
                <h3 className="text-h3 mt-2">{v.title}</h3>
                <p className="opacity-90">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section data-theme="blue" aria-labelledby="contact-title" className="bg-calm-blue py-20 text-foam-cream md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-end">
          <Reveal className="flex flex-col gap-4">
            <p className="text-eyebrow">Contact</p>
            <h2 id="contact-title" className="text-h2">
              Say hello
            </h2>
            <p className="text-body-lg max-w-md opacity-90">Questions, collabs, or just want to know where we&apos;ll be? We&apos;d love to hear from you.</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3">
            <Button href={`mailto:${site.email}`} size="lg" icon={<Mail className="size-4" aria-hidden="true" />} className="justify-between">
              {site.email}
            </Button>
            <div className="grid gap-3 sm:grid-cols-3">
              <Button href={site.instagram} variant="outline" icon={<SocialIcon network="instagram" className="size-4" />}>
                Instagram
              </Button>
              <Button href={site.facebook} variant="outline" icon={<SocialIcon network="facebook" className="size-4" />}>
                Facebook
              </Button>
              <Button href={site.messenger} variant="outline" icon={<SocialIcon network="messenger" className="size-4" />}>
                Messenger
              </Button>
            </div>
            <p className="pt-2 text-sm opacity-90">
              {site.instagramHandle} · {site.city}, Philippines
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
