import { forwardRef } from "react";
import * as RToggle from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { usePressFeedback } from "../motion";
import { cn } from "@/lib/utils/cn";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium select-none",
    "text-text-secondary transition-colors duration-[var(--ease-fast)]",
    "hover:bg-fill-hover hover:text-text-primary",
    "data-[state=on]:bg-fill-active data-[state=on]:text-text-primary",
    "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--ring-offset),0_0_0_4px_var(--ring)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        ghost: "",
        outline:
          "border border-border data-[state=on]:border-transparent",
      },
      size: {
        sm: "h-6 min-w-6 px-1.5",
        md: "h-7 min-w-7 px-2",
        lg: "h-8 min-w-8 px-2.5",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof RToggle.Root>,
    VariantProps<typeof toggleVariants> {}

/** Toggle — a single two-state (on/off) button. */
export const Toggle = forwardRef<
  React.ElementRef<typeof RToggle.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, forwardedRef) => {
  const feedback = usePressFeedback(forwardedRef);
  return (
  <RToggle.Root
    ref={feedback.ref}
    className={cn(toggleVariants({ variant, size }), feedback.enabled && "lms-motion-feedback", className)}
    {...props}
    onPointerDown={event => { props.onPointerDown?.(event); feedback.press(event); }}
    onPointerLeave={event => { props.onPointerLeave?.(event); feedback.release(); }}
  />
);
});
Toggle.displayName = "Toggle";
