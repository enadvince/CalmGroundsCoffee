import { z } from "zod";
import { budgetRanges, eventTypes } from "@/content/packages";
import { manilaDay } from "./dates";

const phone = z
  .string()
  .trim()
  .min(1, "Please add a mobile number.")
  .regex(/^(\+?63|0)9\d{2}[\s-]?\d{3}[\s-]?\d{4}$/, "Use a PH mobile number, e.g. 0917 123 4567.");

/** Text input → whole number, so the form's input type stays `string`. */
const wholeNumber = (requiredMsg: string) =>
  z
    .string()
    .trim()
    .min(1, requiredMsg)
    .regex(/^\d+$/, "Use a whole number.")
    .transform(Number);

const todayIso = () => manilaDay();

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  email: z.email("That email doesn't look quite right."),
  phone,
  eventType: z.enum(eventTypes, "Pick the kind of event."),
  date: z
    .string()
    .min(1, "Choose your event date.")
    .refine((v) => v >= todayIso(), "Pick a date from today onward."),
  venue: z.string().trim().min(2, "Where's the event? A venue or city is fine."),
  guests: wholeNumber("Roughly how many guests?").pipe(
    z
      .number()
      .min(10, "We start at about 10 guests.")
      .max(5000, "For events over 5,000, message us directly."),
  ),
  packageId: z.string().min(1, "Pick a package, or Custom."),
  budget: z.union([z.enum(budgetRanges), z.literal("")]).optional(),
  message: z.string().trim().max(1000, "Keep it under 1,000 characters.").optional(),
});
export type BookingInput = z.input<typeof bookingSchema>;
export type BookingValues = z.output<typeof bookingSchema>;

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        itemId: z.string().min(1, "Choose a drink or pastry."),
        qty: wholeNumber("Add a quantity.").pipe(
          z.number().min(1, "At least 1.").max(100, "For 100+, try our event packages."),
        ),
      }),
    )
    .min(1, "Add at least one item."),
  address: z.string().trim().min(8, "Add a full delivery address."),
  preferredDate: z
    .string()
    .min(1, "Choose a delivery date.")
    .refine((v) => v >= todayIso(), "Pick a date from today onward."),
  preferredTime: z.string().min(1, "Choose a time window."),
  name: z.string().trim().min(2, "Please tell us your name."),
  phone,
  notes: z.string().trim().max(500, "Keep it under 500 characters.").optional(),
});
export type OrderInput = z.input<typeof orderSchema>;
export type OrderValues = z.output<typeof orderSchema>;

export type NewsletterValues = { email: string };
