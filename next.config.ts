import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Classic static + ISR model: pages are prerendered and revalidated hourly so
  // derived pop-up statuses ("Happening now") never go stale for long.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
