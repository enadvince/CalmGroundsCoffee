import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/pop-ups", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/menu", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/events", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/delivery", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.5, changeFrequency: "yearly" as const },
  ];
  return routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified: new Date(), changeFrequency: r.changeFrequency, priority: r.priority }));
}
