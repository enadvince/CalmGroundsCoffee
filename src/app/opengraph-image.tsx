import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Calm Grounds Coffee — crafted for quiet moments";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Calm Grounds", "Specialty coffee pop-ups · Cebu");
}
