import { forwardRef } from "react";
import * as RScrollArea from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils/cn";

/** ScrollArea — a scroll container with a thin, Linear-style overlay scrollbar. */
export const ScrollArea = forwardRef<
  React.ElementRef<typeof RScrollArea.Root>,
  React.ComponentPropsWithoutRef<typeof RScrollArea.Root> & {
    viewportClassName?: string;
  }
>(({ className, viewportClassName, children, ...props }, ref) => (
  <RScrollArea.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <RScrollArea.Viewport
      className={cn("h-full w-full rounded-[inherit]", viewportClassName)}
    >
      {children}
    </RScrollArea.Viewport>
    <ScrollBar />
    <ScrollBar orientation="horizontal" />
    <RScrollArea.Corner />
  </RScrollArea.Root>
));
ScrollArea.displayName = "ScrollArea";

function ScrollBar({
  orientation = "vertical",
}: {
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <RScrollArea.Scrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 transition-colors select-none",
        orientation === "vertical" ? "h-full w-2.5" : "h-2.5 flex-col",
      )}
    >
      <RScrollArea.Thumb className="relative flex-1 rounded-full bg-border-strong hover:bg-text-tertiary" />
    </RScrollArea.Scrollbar>
  );
}
