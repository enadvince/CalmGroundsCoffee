import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "About Calm Grounds Coffee";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Quiet moments", "About Calm Grounds");
}
