import { forwardRef, useId, useState } from "react";
import { motion } from "motion/react";
import { useMotionSettings } from "../motion";
import { cn } from "@/lib/utils/cn";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Optional inline label rendered to the right of the track. */
  label?: string;
  size?: "sm" | "md";
}

/**
 * Switch — the toggle used throughout Linear's settings.
 *
 * A pill track that fills with the accent color when on, a white thumb that
 * slides with an ease-out curve. Built on a visually-hidden checkbox so it
 * stays fully accessible and form-associable.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, size = "md", id, disabled, checked, defaultChecked, onChange, ...props }, ref) => {
    const { enabled, transition } = useMotionSettings("selection");
    const [internal, setInternal] = useState(defaultChecked ?? false);
    const isChecked = checked ?? internal;
    const Thumb = (enabled ? motion.span : "span") as "span";
    const generatedId = useId();
    const inputId = id ?? generatedId;

    // The thumb is nested inside the track, so it isn't a `peer` sibling of the
    // input — the checked transform has to be addressed through the track with
    // a child selector (`peer-checked:[&>span]:…`).
    const dims =
      size === "sm"
        ? { track: "h-4 w-[27px] peer-checked:[&>span]:translate-x-[11px]", thumb: "size-3" }
        : { track: "h-5 w-[34px] peer-checked:[&>span]:translate-x-[14px]", thumb: "size-4" };

    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        <span className="relative inline-flex shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            className="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={event => { setInternal(event.target.checked); onChange?.(event); }}
            {...props}
          />
          <span
            aria-hidden
            className={cn(
              "flex items-center rounded-full p-[2px]",
              "bg-border-strong transition-colors duration-[var(--ease-base)] ease-[var(--ease-curve)]",
              "peer-checked:bg-accent",
              "peer-focus-visible:shadow-[0_0_0_2px_var(--ring-offset),0_0_0_4px_var(--ring)]",
              "peer-disabled:opacity-50",
              enabled ? dims.track.split(" peer-checked:")[0] : dims.track,
            )}
          >
            <Thumb
              {...(enabled ? { initial: false, animate: { x: isChecked ? (size === "sm" ? 11 : 14) : 0 }, transition } : {})}
              className={cn(
                "rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)]",
                !enabled && "transition-transform duration-[var(--ease-base)] ease-[var(--ease-out-curve)]",
                dims.thumb,
              )}
            />
          </span>
        </span>
        {label && (
          <label
            htmlFor={inputId}
            className="cursor-pointer text-sm text-text-primary select-none peer-disabled:opacity-50"
          >
            {label}
          </label>
        )}
      </span>
    );
  },
);
Switch.displayName = "Switch";
