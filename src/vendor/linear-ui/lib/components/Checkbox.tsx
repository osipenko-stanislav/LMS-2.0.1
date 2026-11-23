import { forwardRef, useId } from "react";
import * as RCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RCheckbox.Root>,
    "asChild"
  > {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * Checkbox — 16px rounded square, fills to the accent color with a white
 * check (or a dash when indeterminate). Radix-backed. Pass `label` /
 * `description` for the common form-row layout, or use it bare in a table.
 */
export const Checkbox = forwardRef<
  React.ElementRef<typeof RCheckbox.Root>,
  CheckboxProps
>(({ className, label, description, id, checked, ...props }, ref) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const box = (
    <RCheckbox.Root
      ref={ref}
      id={inputId}
      checked={checked}
      className={cn(
        "peer grid size-4 shrink-0 place-items-center rounded-xs border border-border-strong bg-control",
        "transition-colors duration-[var(--ease-fast)]",
        "data-[state=checked]:border-accent data-[state=checked]:bg-accent",
        "data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent",
        "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--ring-offset),0_0_0_4px_var(--ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RCheckbox.Indicator>
        {checked === "indeterminate" ? (
          <Minus className="size-3 text-white" strokeWidth={3} />
        ) : (
          <Check className="size-3 text-white" strokeWidth={3} />
        )}
      </RCheckbox.Indicator>
    </RCheckbox.Root>
  );

  if (!label && !description) return box;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-start gap-2.5 select-none",
        props.disabled && "cursor-not-allowed opacity-50",
      )}
    >
      {box}
      <span className="flex flex-col gap-0.5 leading-tight">
        {label && <span className="text-sm text-text-primary">{label}</span>}
        {description && (
          <span className="text-xs text-text-secondary">{description}</span>
        )}
      </span>
    </label>
  );
});
Checkbox.displayName = "Checkbox";
