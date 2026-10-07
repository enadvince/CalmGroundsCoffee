import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Calm Grounds pop-up schedule";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Find the cart", "Pop-ups this week");
}
