"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { Package } from "@/content/types";
import { budgetRanges, eventTypes } from "@/content/packages";
import { bookingSchema, type BookingInput, type BookingValues } from "@/lib/schema";
import { submitInquiry } from "@/lib/submit-inquiry";
import { CHOOSE_PACKAGE_EVENT } from "@/lib/events";
import { manilaDay } from "@/lib/dates";
import { Field, Input, Select, Textarea, describedBy } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "./form-success";

export function BookingForm({ packages }: { packages: Package[] }) {
  const [result, setResult] = useState<{ reference: string; name: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const inFlight = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<BookingInput, unknown, BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "" as BookingInput["eventType"],
      date: "",
      venue: "",
      guests: "",
      packageId: "",
      budget: "",
      message: "",
    },
  });

  // Package cards preselect the package here.
  useEffect(() => {
    const onChoose = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setValue("packageId", id, { shouldValidate: submitCount > 0 });
    };
    window.addEventListener(CHOOSE_PACKAGE_EVENT, onChoose);
    return () => window.removeEventListener(CHOOSE_PACKAGE_EVENT, onChoose);
  }, [setValue, submitCount]);

  const onSubmit = async (data: BookingValues) => {
    if (inFlight.current) return; // double-submit guard (button is also disabled)
    inFlight.current = true;
    setServerError(null);
    try {
      const res = await submitInquiry({ kind: "booking", data });
      if (res.ok) setResult({ reference: res.reference, name: data.name.split(" ")[0] });
      else setServerError(res.error);
    } catch {
      setServerError("Something went wrong sending your inquiry. Please try again, or email us directly.");
    } finally {
      inFlight.current = false;
    }
  };

  const e = errors;
  const errorCount = Object.keys(errors).length;

  return (
    <div className="rounded-card border-2 border-latte bg-steam p-6 sm:p-8 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {result ? (
          <FormSuccess
            key="ok"
            title={`Thank you, ${result.name}!`}
            body={<>Your inquiry is in. We&apos;ll reply within 1–2 days with availability and a quote. Talk soon.</>}
            reference={result.reference}
            onReset={() => {
              reset();
              setResult(null);
            }}
            resetLabel="Send another inquiry"
          />
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={(ev) => handleSubmit(onSubmit)(ev)} noValidate className="flex flex-col gap-6" aria-labelledby="book-title">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="b-name" label="Your name" error={e.name?.message}>
                <Input autoComplete="name" {...register("name")} {...describedBy("b-name", { error: e.name?.message })} />
              </Field>
              <Field id="b-email" label="Email" error={e.email?.message}>
                <Input type="email" autoComplete="email" {...register("email")} {...describedBy("b-email", { error: e.email?.message })} />
              </Field>
              <Field id="b-phone" label="Mobile number" error={e.phone?.message}>
                <Input type="tel" autoComplete="tel" placeholder="0917 123 4567" {...register("phone")} {...describedBy("b-phone", { error: e.phone?.message })} />
              </Field>
              <Field id="b-type" label="Type of event" error={e.eventType?.message}>
                <Select {...register("eventType")} {...describedBy("b-type", { error: e.eventType?.message })}>
                  <option value="">Choose one</option>
                  {eventTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </Field>
              <Field id="b-date" label="Event date" error={e.date?.message}>
                <Input type="date" min={manilaDay()} {...register("date")} {...describedBy("b-date", { error: e.date?.message })} />
              </Field>
              <Field id="b-guests" label="Expected guests" error={e.guests?.message}>
                <Input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="e.g. 120" {...register("guests")} {...describedBy("b-guests", { error: e.guests?.message })} />
              </Field>
              <Field id="b-venue" label="Venue or city" error={e.venue?.message} className="sm:col-span-2">
                <Input autoComplete="address-level2" placeholder="e.g. Casino Español, Cebu City" {...register("venue")} {...describedBy("b-venue", { error: e.venue?.message })} />
              </Field>
              <Field id="b-package" label="Preferred package" error={e.packageId?.message}>
                <Select {...register("packageId")} {...describedBy("b-package", { error: e.packageId?.message })}>
                  <option value="">Choose a package</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field id="b-budget" label="Budget range" optional error={e.budget?.message}>
                <Select {...register("budget")} {...describedBy("b-budget", { error: e.budget?.message })}>
                  <option value="">Prefer not to say</option>
                  {budgetRanges.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </Select>
              </Field>
              <Field id="b-message" label="Anything else?" optional error={e.message?.message} hint="Theme, timing, dietary needs, or questions." className="sm:col-span-2">
                <Textarea rows={4} {...register("message")} {...describedBy("b-message", { error: e.message?.message, hint: "yes" })} />
              </Field>
            </div>

            <div role="status" aria-live="polite" className="text-sm font-medium text-calm-blue empty:hidden">
              {serverError ?? (errorCount > 0 ? `Please check ${errorCount} field${errorCount === 1 ? "" : "s"} above.` : "")}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm opacity-80">We reply within 1–2 days. No payment needed to ask.</p>
              <Button type="submit" size="lg" disabled={isSubmitting} loading={isSubmitting} icon={<Send className="size-4" aria-hidden="true" />}>
                {isSubmitting ? "Sending…" : "Send inquiry"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
