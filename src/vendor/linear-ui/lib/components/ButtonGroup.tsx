import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * ButtonGroup — joins a row of Buttons into one control: shared borders, only
 * the outer corners rounded. Works with any mix of `Button` variants.
 */
export const ButtonGroup = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    className={cn(
      "isolate inline-flex items-center",
      "[&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md",
      "[&>*:not(:first-child)]:-ml-px [&>*:hover]:z-10 [&>*:focus-visible]:z-10",
      className,
    )}
    {...props}
  />
));
ButtonGroup.displayName = "ButtonGroup";
