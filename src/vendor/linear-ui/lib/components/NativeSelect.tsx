import { forwardRef } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: "sm" | "md";
  invalid?: boolean;
}

/**
 * NativeSelect — a styled native `<select>`. Use when the OS picker is
 * preferable (long lists, mobile); reach for `Select` when you need a custom
 * menu. Pass `<option>`s as children.
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, size = "md", invalid, children, ...props }, ref) => (
    <div className="relative inline-flex">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-md border border-border bg-control pr-7 pl-2.5 text-sm text-text-primary",
          "transition-colors duration-[var(--ease-fast)] hover:bg-control-hover",
          "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--ring)] focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" ? "h-6" : "h-7",
          invalid && "border-danger",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" />
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";
