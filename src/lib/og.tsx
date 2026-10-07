import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared Open Graph card: calm-blue field, Unbounded title, mascot on its cream circle. */
export async function renderOg(title: string, kicker: string) {
  const [font, mascot] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/unbounded-800.ttf")),
    readFile(join(process.cwd(), "public/brand/mascot.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0e36f0", color: "#fbefe3", padding: 72, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 640 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", opacity: 0.85 }}>{kicker}</div>
          <div style={{ display: "flex", fontFamily: "Unbounded", fontSize: title.length > 18 ? 68 : 84, lineHeight: 1, letterSpacing: -2, textTransform: "uppercase" }}>
            {title.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 30, opacity: 0.9 }}>{`${site.name} · ${site.tagline}`}</div>
        </div>
        <div style={{ display: "flex", width: 380, height: 380, borderRadius: 9999, overflow: "hidden", background: "#fbefe3" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${mascot}`} width={380} height={380} alt="" />
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Unbounded", data: font, weight: 800, style: "normal" }] },
  );
}
