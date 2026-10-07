import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Calm Grounds menu";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("The menu", "Slow cups, simply made");
}
