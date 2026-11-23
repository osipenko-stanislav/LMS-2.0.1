import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Textarea — multi-line text field, matching Input's focus treatment. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-16 w-full rounded-sm border border-border bg-bg-primary px-2.5 py-2 text-sm text-text-primary",
        "placeholder:text-text-tertiary transition-colors duration-[var(--ease-base)]",
        "focus:border-accent focus:shadow-[0_0_0_3px_var(--ring)] focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "field-sizing-content",
        invalid && "border-danger focus:border-danger focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--danger)_30%,transparent)]",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
