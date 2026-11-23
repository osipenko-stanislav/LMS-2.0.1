import { SelectionIndicator, useMotionGroup, useMotionSettings } from "../motion";
import { cn } from "@/lib/utils/cn";

export interface SegmentedControlItem<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  value: T;
  onValueChange: (value: T) => void;
  items: SegmentedControlItem<T>[];
  size?: "sm" | "md";
  className?: string;
  "aria-label"?: string;
}

/**
 * SegmentedControl — the inline multi-choice toggle Linear uses for things
 * like font size or view density. A sunken track with a raised, shadowed
 * pill marking the active segment.
 */
export function SegmentedControl<T extends string = string>({
  value,
  onValueChange,
  items,
  size = "md",
  className,
  ...aria
}: SegmentedControlProps<T>) {
  const { enabled } = useMotionSettings("selection");
  const group = useMotionGroup();
  return (
    <div
      role="radiogroup"
      aria-label={aria["aria-label"]}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border bg-bg-tertiary p-0.5",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-[5px] font-medium",
              "transition-colors duration-[var(--ease-fast)] select-none",
              "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--ring-offset),0_0_0_4px_var(--ring)]",
              "[&_svg]:size-3.5",
              enabled && "lms-motion-selection",
              size === "sm" ? "h-6 px-2 text-xs" : "h-7 px-2.5 text-sm",
              active
                ? enabled ? "text-text-primary" : "bg-bg-primary text-text-primary shadow-xs ring-1 ring-border-strong/60"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            {enabled && active && <SelectionIndicator group={group} />}
            {enabled ? <span className="relative z-10 inline-flex items-center gap-1.5">{item.icon}{item.label}</span> : <>{item.icon}{item.label}</>}
          </button>
        );
      })}
    </div>
  );
}
