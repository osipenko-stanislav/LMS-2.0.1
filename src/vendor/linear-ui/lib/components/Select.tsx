import { forwardRef } from "react";
import * as RSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Select — Linear's dropdown control.
 *
 * Trigger reads like a `secondary` button (28px, translucent border, chevron);
 * the menu is an elevated surface with the popover shadow, 6px radius, rows
 * that highlight with the translucent hover fill and show a trailing check.
 * Built on Radix so keyboard nav, typeahead and positioning are handled.
 */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
  /** Trigger min-width; menu matches the trigger by default. */
  width?: number | string;
  "aria-label"?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      options,
      placeholder = "Select…",
      disabled,
      size = "md",
      className,
      width,
      ...aria
    },
    ref,
  ) => (
    <RSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <RSelect.Trigger
        ref={ref}
        aria-label={aria["aria-label"]}
        style={width ? { width } : undefined}
        className={cn(
          "inline-flex items-center justify-between gap-2 rounded-md border border-border bg-control",
          "text-sm text-text-primary shadow-xs select-none",
          "transition-colors duration-[var(--ease-fast)]",
          "hover:bg-control-hover data-[state=open]:bg-control-hover",
          "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--ring)]",
          "disabled:pointer-events-none disabled:opacity-50",
          size === "sm" ? "h-6 px-2" : "h-7 px-2.5",
          className,
        )}
      >
        <RSelect.Value placeholder={<span className="text-text-tertiary">{placeholder}</span>} />
        <RSelect.Icon>
          <ChevronDown className="size-3.5 text-text-tertiary" />
        </RSelect.Icon>
      </RSelect.Trigger>

      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "z-50 overflow-hidden rounded-md border border-border bg-bg-elevated p-1",
            "shadow-popover origin-[var(--radix-select-content-transform-origin)]",
            "min-w-[var(--radix-select-trigger-width)]",
            "transition-[opacity,transform] duration-[var(--ease-fast)] ease-[var(--ease-out-curve)]",
            "data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
          )}
        >
          <RSelect.Viewport className="max-h-72">
            {options.map((opt) => (
              <RSelect.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  "relative flex h-7 cursor-pointer items-center rounded-sm pr-7 pl-2 text-sm text-text-primary",
                  "outline-none select-none",
                  "data-[highlighted]:bg-fill-hover",
                  "data-[state=checked]:text-text-primary",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
                )}
              >
                <RSelect.ItemText>{opt.label}</RSelect.ItemText>
                <RSelect.ItemIndicator className="absolute right-2 flex">
                  <Check className="size-3.5 text-accent-subtle-text" />
                </RSelect.ItemIndicator>
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  ),
);
Select.displayName = "Select";
