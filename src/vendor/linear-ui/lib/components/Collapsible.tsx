import { forwardRef } from "react";
import * as RCollapsible from "@radix-ui/react-collapsible";
import { ExpandRegion, useMotionSettings } from "../motion";
import { useDisclosureState } from "../useDisclosureMotion";
import { cn } from "@/lib/utils/cn";

/** Collapsible — show/hide a region with an animated height transition. */
export const Collapsible = RCollapsible.Root;
export const CollapsibleTrigger = RCollapsible.Trigger;

export const CollapsibleContent = forwardRef<
  React.ElementRef<typeof RCollapsible.Content>,
  React.ComponentPropsWithoutRef<typeof RCollapsible.Content>
>(({ className, children, ...props }, forwardedRef) => {
  const { enabled } = useMotionSettings("expand");
  const { ref, open } = useDisclosureState(forwardedRef, enabled);
  return (
  <RCollapsible.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      !enabled && "data-[state=open]:animate-[collapsible-down_var(--ease-base)_ease] data-[state=closed]:animate-[collapsible-up_var(--ease-base)_ease]",
      enabled && "lms-motion-disclosure",
      className,
    )}
    {...props}
    forceMount={enabled || props.forceMount ? true : undefined}
    aria-hidden={enabled && !open ? true : props["aria-hidden"]}
  >{enabled ? <ExpandRegion open={open} keepMounted={!!props.forceMount}>{children}</ExpandRegion> : children}</RCollapsible.Content>
);
});
CollapsibleContent.displayName = "CollapsibleContent";
