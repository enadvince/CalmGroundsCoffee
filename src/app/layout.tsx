import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Unbounded } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { FloatingBookPill } from "@/components/sections/floating-book-pill";
import { site } from "@/content/site";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Specialty coffee pop-ups around Cebu — malls, campuses, and markets. Find this week's cart, order ahead, or book us for your event.",
  applicationName: site.name,
  keywords: ["Cebu coffee", "coffee pop-up Cebu", "coffee cart for events Cebu", "specialty coffee Cebu", "Calm Grounds"],
  openGraph: { siteName: site.name, locale: "en_PH", type: "website" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/mascot.png", apple: "/brand/mascot.png" },
};

export const viewport: Viewport = {
  themeColor: "#0e36f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" className={`${unbounded.variable} ${dmSans.variable} ${caveat.variable}`}>
      <body className="min-h-svh">
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <FloatingBookPill />
        </Providers>
      </body>
    </html>
  );
}
