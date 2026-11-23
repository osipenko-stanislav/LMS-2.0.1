import { createContext, forwardRef, useContext, useId } from "react";
import { cn } from "@/lib/utils/cn";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  name?: string;
  onValueChange?: (value: string) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, name, onValueChange, children, ...props }, ref) => {
    const generatedName = useId();
    return (
      <RadioGroupContext.Provider
        value={{ name: name ?? generatedName, value, onValueChange }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn("flex flex-col gap-2", className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * Radio — Linear uses a 16px ring that fills to the accent color with an
 * inset white dot when selected. Compose inside <RadioGroup>.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, value, label, description, id, ...props }, ref) => {
    const ctx = useContext(RadioGroupContext);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const checked = ctx?.value !== undefined ? ctx.value === value : undefined;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer items-start gap-2.5 select-none",
          props.disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="relative flex">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            value={value}
            name={ctx?.name}
            checked={checked}
            onChange={(e) => ctx?.onValueChange?.(e.target.value)}
            className="peer size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-border-strong bg-bg-primary transition-colors duration-[var(--ease-fast)] checked:border-accent checked:bg-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--ring-offset),0_0_0_4px_var(--ring)] disabled:cursor-not-allowed"
            {...props}
          />
          <span className="pointer-events-none absolute inset-0 m-auto size-1.5 scale-0 rounded-full bg-white transition-transform duration-[var(--ease-fast)] peer-checked:scale-100" />
        </span>
        {(label || description) && (
          <span className="flex flex-col gap-0.5 leading-tight">
            {label && <span className="text-sm text-text-primary">{label}</span>}
            {description && (
              <span className="text-xs text-text-secondary">{description}</span>
            )}
          </span>
        )}
      </label>
    );
  },
);
Radio.displayName = "Radio";
