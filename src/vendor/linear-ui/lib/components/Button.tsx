import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { usePressFeedback } from "../motion";
import { cn } from "@/lib/utils/cn";

/**
 * Button — modeled on Linear's control set.
 *
 * Compact heights (24 / 28 / 32px), 8px radius, `font-medium` at 13px,
 * a fast scale-press, and a soft focus ring. `primary` uses the Linear
 * indigo; `secondary` is the workhorse translucent-bordered button.
 */
const button = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-1.5",
    "rounded-md font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,box-shadow,transform]",
    "duration-[var(--ease-fast)] ease-[var(--ease-curve)]",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-text-on-accent shadow-xs hover:bg-accent-hover active:bg-accent-active",
        secondary:
          "bg-control text-text-primary border border-border shadow-xs hover:bg-control-hover active:bg-control-hover",
        ghost:
          "bg-transparent text-text-secondary hover:bg-fill-hover hover:text-text-primary active:bg-fill-active",
        subtle:
          "bg-fill-hover text-text-primary hover:bg-fill-active active:bg-fill-active",
        danger:
          "bg-danger text-white shadow-xs hover:bg-danger-hover active:brightness-95",
        link: "text-text-link underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-6 px-2 text-xs [&_svg]:size-3.5",
        md: "h-7 px-2.5 text-sm [&_svg]:size-4",
        lg: "h-8 px-3 text-sm [&_svg]:size-4",
        xl: "h-10 px-4 text-md [&_svg]:size-[18px]",
      },
      iconOnly: {
        true: "px-0 aspect-square",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "size-6" },
      { iconOnly: true, size: "md", class: "size-7" },
      { iconOnly: true, size: "lg", class: "size-8" },
      { iconOnly: true, size: "xl", class: "size-10" },
    ],
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, type = "button", ...props }, forwardedRef) => {
    const feedback = usePressFeedback(forwardedRef);
    return (
    <button
      ref={feedback.ref}
      type={type}
      className={cn(button({ variant, size, iconOnly }), feedback.enabled && "lms-motion-feedback active:scale-100 transition-[background-color,border-color,color,box-shadow]", className)}
      {...props}
      onPointerDown={event => { props.onPointerDown?.(event); feedback.press(event); }}
      onPointerLeave={event => { props.onPointerLeave?.(event); feedback.release(); }}
    />
  );
  },
);
Button.displayName = "Button";

export { button as buttonVariants };
