import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  /** Rendered inside the field, left of the text (e.g. a search glyph). */
  leadingIcon?: React.ReactNode;
  invalid?: boolean;
}

const heights = { sm: "h-7", md: "h-8", lg: "h-9" } as const;

/**
 * Input — Linear's text field: 1px translucent border, 6px radius, a focus
 * state that swaps the border to the accent color and adds the soft ring.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "md", leadingIcon, invalid, disabled, ...props }, ref) => (
    <div
      className={cn(
        "group relative flex items-center rounded-sm border bg-bg-primary",
        "border-border transition-colors duration-[var(--ease-base)]",
        "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--ring)]",
        invalid &&
          "border-danger focus-within:border-danger focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--danger)_30%,transparent)]",
        disabled && "opacity-50",
        heights[size],
        className,
      )}
    >
      {leadingIcon && (
        <span className="pointer-events-none flex pl-2 text-text-tertiary [&_svg]:size-4">
          {leadingIcon}
        </span>
      )}
      <input
        ref={ref}
        disabled={disabled}
        className={cn(
          "peer h-full w-full bg-transparent px-2.5 text-sm text-text-primary",
          "placeholder:text-text-tertiary focus:outline-none focus-visible:shadow-none",
          "disabled:cursor-not-allowed",
          leadingIcon && "pl-1.5",
        )}
        {...props}
      />
    </div>
  ),
);
Input.displayName = "Input";
