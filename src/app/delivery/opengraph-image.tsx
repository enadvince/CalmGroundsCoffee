import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Calm Grounds delivery";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Calm, delivered", "Delivery around Metro Cebu");
}
