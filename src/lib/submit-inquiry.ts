import type { BookingValues, OrderValues } from "./schema";

export type Inquiry =
  | { kind: "booking"; data: BookingValues }
  | { kind: "order"; data: OrderValues };

export type InquiryResult = { ok: true; reference: string } | { ok: false; error: string };

/**
 * Single submit path for every form on the site.
 *
 * TODO: wire to n8n webhook / Supabase
 *   e.g. await fetch(process.env.NEXT_PUBLIC_INQUIRY_WEBHOOK!, { method: "POST", body: JSON.stringify(inquiry) })
 *   and/or insert into a Supabase `inquiries` table. Return { ok: false } on failure so
 *   the form shows its error state.
 */
export async function submitInquiry(inquiry: Inquiry): Promise<InquiryResult> {
  console.info("[submitInquiry] demo submission", inquiry);
  // Simulate network latency so the pending state is visible in the demo.
  await new Promise((r) => setTimeout(r, 900));
  const reference = `CG-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return { ok: true, reference };
}
