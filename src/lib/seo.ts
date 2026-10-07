import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata with matching Open Graph / Twitter fields. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_PH",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description },
  };
}
