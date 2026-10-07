// Field anatomy adapted from Watermelon UI: components/form-3
// (Field / FieldLabel / FieldDescription / FieldError). Native inputs replace the
// popover calendar (better on phones, no date-fns); sonner toasts are not used.

import { CircleAlert } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const fieldControl =
  "w-full rounded-sm border-2 border-(--field-border) bg-steam px-4 text-base text-deep-ink placeholder:text-deep-ink/55 transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-calm-blue/25 focus-visible:border-calm-blue aria-[invalid=true]:border-calm-blue aria-[invalid=true]:border-dashed";

/** aria wiring for a control inside <Field>. */
export function describedBy(id: string, opts: { error?: string; hint?: string }) {
  const ids = [opts.hint ? `${id}-hint` : null, opts.error ? `${id}-error` : null].filter(Boolean);
  return {
    id,
    "aria-invalid": opts.error ? true : undefined,
    "aria-describedby": ids.length ? ids.join(" ") : undefined,
  } as const;
}

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="ml-1.5 font-normal opacity-75">(optional)</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm opacity-75">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-medium text-calm-blue">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(fieldControl, "h-12", className)} {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(fieldControl, "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230b1a5c%22 stroke-width=%222%22 stroke-linecap=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.25rem] bg-[position:right_0.875rem_center] bg-no-repeat pr-11", className)} {...props}>
      {children}
    </select>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(fieldControl, "min-h-32 py-3", className)} {...props} />;
});
