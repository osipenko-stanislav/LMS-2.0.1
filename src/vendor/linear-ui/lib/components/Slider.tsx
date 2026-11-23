import { forwardRef } from "react";
import * as RSlider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils/cn";

/**
 * Slider — a draggable value track. Supports one or many thumbs (pass an array
 * of `value` / `defaultValue`). Accent-filled range, white thumb with a ring.
 */
export const Slider = forwardRef<
  React.ElementRef<typeof RSlider.Root>,
  React.ComponentPropsWithoutRef<typeof RSlider.Root>
>(({ className, ...props }, ref) => {
  const count =
    (Array.isArray(props.value)
      ? props.value.length
      : Array.isArray(props.defaultValue)
        ? props.defaultValue.length
        : 1) || 1;

  return (
    <RSlider.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <RSlider.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-fill-active">
        <RSlider.Range className="absolute h-full rounded-full bg-accent" />
      </RSlider.Track>
      {Array.from({ length: count }).map((_, i) => (
        <RSlider.Thumb
          key={i}
          className={cn(
            "block size-3.5 rounded-full border border-border-strong bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)]",
            "transition-[box-shadow] focus-visible:outline-none",
            "focus-visible:shadow-[0_0_0_4px_var(--ring)] hover:shadow-[0_0_0_4px_var(--ring)]",
          )}
        />
      ))}
    </RSlider.Root>
  );
});
Slider.displayName = "Slider";
