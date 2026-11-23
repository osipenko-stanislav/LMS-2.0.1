import { forwardRef } from "react";
import * as RLabel from "@radix-ui/react-label";
import { cn } from "@/lib/utils/cn";

/** Label — form control label; dims with its disabled peer. */
export const Label = forwardRef<
  React.ElementRef<typeof RLabel.Root>,
  React.ComponentPropsWithoutRef<typeof RLabel.Root>
>(({ className, ...props }, ref) => (
  <RLabel.Root
    ref={ref}
    className={cn(
      "text-sm font-medium text-text-primary select-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";
