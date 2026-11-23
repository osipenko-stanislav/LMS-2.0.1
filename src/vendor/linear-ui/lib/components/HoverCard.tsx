import { forwardRef } from "react";
import * as RHoverCard from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils/cn";

/** HoverCard — a rich preview that opens on hover/focus of its trigger. */
export const HoverCard = RHoverCard.Root;
export const HoverCardTrigger = RHoverCard.Trigger;

export const HoverCardContent = forwardRef<
  React.ElementRef<typeof RHoverCard.Content>,
  React.ComponentPropsWithoutRef<typeof RHoverCard.Content>
>(({ className, align = "center", sideOffset = 6, ...props }, ref) => (
  <RHoverCard.Portal>
    <RHoverCard.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-md border border-border bg-bg-elevated p-3 text-sm text-text-primary",
        "shadow-popover origin-[var(--radix-hover-card-content-transform-origin)]",
        "transition-[opacity,transform] duration-[var(--ease-fast)] ease-[var(--ease-out-curve)]",
        "data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        className,
      )}
      {...props}
    />
  </RHoverCard.Portal>
));
HoverCardContent.displayName = "HoverCardContent";
