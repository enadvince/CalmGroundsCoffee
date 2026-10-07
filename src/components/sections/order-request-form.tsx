"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { MenuItem } from "@/content/types";
import { formatPrice } from "@/lib/content";
import { orderSchema, type OrderInput, type OrderValues } from "@/lib/schema";
import { submitInquiry } from "@/lib/submit-inquiry";
import { manilaDay } from "@/lib/dates";
import { Field, Input, Select, Textarea, describedBy } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "./form-success";

const TIME_WINDOWS = ["8–10 AM", "10 AM – 12 NN", "1–3 PM", "3–5 PM"];

export function OrderRequestForm({ menu }: { menu: MenuItem[] }) {
  const [result, setResult] = useState<{ reference: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const inFlight = useRef(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderInput, unknown, OrderValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: { items: [{ itemId: "", qty: "1" }], address: "", preferredDate: "", preferredTime: "", name: "", phone: "", notes: "" },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = async (data: OrderValues) => {
    if (inFlight.current) return; // double-submit guard
    inFlight.current = true;
    setServerError(null);
    try {
      const res = await submitInquiry({ kind: "order", data });
      if (res.ok) setResult({ reference: res.reference });
      else setServerError(res.error);
    } catch {
      setServerError("Something went wrong sending your order. Please try again, or message us on Messenger.");
    } finally {
      inFlight.current = false;
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="rounded-card border-2 border-latte bg-milk p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {result ? (
          <FormSuccess
            key="ok"
            title="Order request received"
            body={<>We&apos;ll message you to confirm items, total, and delivery time. Payment details come with the confirmation.</>}
            reference={result.reference}
            onReset={() => {
              reset();
              setResult(null);
            }}
            resetLabel="Place another order"
          />
        ) : (
          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={(ev) => handleSubmit(onSubmit)(ev)} noValidate className="flex flex-col gap-6" aria-describedby="order-form-status">
            <div>
              <h3 className="text-h3">Request an order</h3>
              <p className="mt-2 opacity-90">Tell us what you&apos;d like. We confirm every order by message before anything is charged.</p>
            </div>

            <fieldset className="flex flex-col gap-4">
              <legend className="mb-3 text-sm font-medium">Items</legend>
              {fields.map((f, i) => {
                const itemErr = errors.items?.[i]?.itemId?.message;
                const qtyErr = errors.items?.[i]?.qty?.message;
                return (
                  <div key={f.id} className="grid grid-cols-[1fr_5.5rem_auto] items-start gap-3">
                    <Field id={`item-${i}`} label={`Item ${i + 1}`} error={itemErr} className="[&>label]:sr-only">
                      <Select {...register(`items.${i}.itemId`)} {...describedBy(`item-${i}`, { error: itemErr })}>
                        <option value="">Choose a drink or pastry</option>
                        {menu.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} — {formatPrice(m.price)}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field id={`qty-${i}`} label={`Quantity for item ${i + 1}`} error={qtyErr} className="[&>label]:sr-only">
                      <Input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Qty" {...register(`items.${i}.qty`)} {...describedBy(`qty-${i}`, { error: qtyErr })} />
                    </Field>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      disabled={fields.length === 1}
                      aria-label={`Remove item ${i + 1}`}
                      className="flex size-12 items-center justify-center rounded-full border-2 border-deep-ink/30 transition-colors hover:border-calm-blue hover:text-calm-blue disabled:opacity-40"
                    >
                      <Minus className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
              {errors.items?.root?.message && <p className="text-sm font-medium text-calm-blue">{errors.items.root.message}</p>}
              <button
                type="button"
                onClick={() => append({ itemId: "", qty: "1" })}
                disabled={fields.length >= 10}
                className="inline-flex items-center gap-2 self-start rounded-full px-1 py-2 font-medium text-calm-blue underline-offset-4 hover:underline"
              >
                <Plus className="size-4" aria-hidden="true" />
                Add another item
              </button>
            </fieldset>

            <Field id="address" label="Delivery address" error={errors.address?.message}>
              <Textarea rows={3} className="min-h-24" autoComplete="street-address" placeholder="Building, street, barangay, city" {...register("address")} {...describedBy("address", { error: errors.address?.message })} />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="preferredDate" label="Preferred date" error={errors.preferredDate?.message}>
                <Input type="date" min={manilaDay()} {...register("preferredDate")} {...describedBy("preferredDate", { error: errors.preferredDate?.message })} />
              </Field>
              <Field id="preferredTime" label="Time window" error={errors.preferredTime?.message}>
                <Select {...register("preferredTime")} {...describedBy("preferredTime", { error: errors.preferredTime?.message })}>
                  <option value="">Choose a window</option>
                  {TIME_WINDOWS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="order-name" label="Your name" error={errors.name?.message}>
                <Input autoComplete="name" {...register("name")} {...describedBy("order-name", { error: errors.name?.message })} />
              </Field>
              <Field id="order-phone" label="Mobile number" error={errors.phone?.message}>
                <Input type="tel" autoComplete="tel" placeholder="0917 123 4567" {...register("phone")} {...describedBy("order-phone", { error: errors.phone?.message })} />
              </Field>
            </div>

            <Field id="order-notes" label="Notes" optional error={errors.notes?.message} hint="Sugar level, oat milk, a gate code — anything that helps.">
              <Textarea rows={3} className="min-h-24" {...register("notes")} {...describedBy("order-notes", { error: errors.notes?.message, hint: "notes" })} />
            </Field>

            <div id="order-form-status" role="status" aria-live="polite" className="text-sm font-medium text-calm-blue empty:hidden">
              {serverError ?? (errorCount > 0 ? `Please check ${errorCount} field${errorCount === 1 ? "" : "s"} above.` : "")}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} loading={isSubmitting} icon={<Send className="size-4" aria-hidden="true" />} className="self-start">
              {isSubmitting ? "Sending…" : "Send order request"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
