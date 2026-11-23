import { forwardRef } from "react";
import * as RPopover from "@radix-ui/react-popover";
import { motion } from "motion/react";
import { createMotionRoot, OverlayPresence, useOverlayMotion } from "../motion";
import { useGradientBorder } from "../useGradientBorder";
import { useOverlayFocus } from "../useOverlayFocus";
import { cn } from "@/lib/utils/cn";

/** Popover — a floating panel anchored to a trigger. Elevated surface + popover shadow. */
export const Popover = createMotionRoot(RPopover.Root);
const MotionContent = motion.create(RPopover.Content);
export const PopoverTrigger = RPopover.Trigger;
export const PopoverAnchor = RPopover.Anchor;
export const PopoverClose = RPopover.Close;

export const PopoverContent = forwardRef<
  React.ElementRef<typeof RPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RPopover.Content>
>(({ className, align = "center", sideOffset = 6, ...props }, forwardedRef) => {
  const animation = useOverlayMotion();
  const focus = useOverlayFocus(forwardedRef, animation.enabled, animation.open);
  const gradientRef = useGradientBorder(focus.ref);
  const Content = (animation.enabled ? MotionContent : RPopover.Content) as typeof RPopover.Content;
  return (
  <RPopover.Portal forceMount={animation.enabled || props.forceMount ? true : undefined}>
    <OverlayPresence enabled={animation.enabled} open={animation.open}>
    <Content
      {...animation.props}
      forceMount={animation.enabled || props.forceMount ? true : undefined}
      ref={gradientRef}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border border-border bg-bg-elevated p-3 text-sm text-text-primary",
        "shadow-popover origin-[var(--radix-popover-content-transform-origin)]",
        "transition-[opacity,transform] duration-[var(--ease-fast)] ease-[var(--ease-out-curve)]",
        "data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        animation.props.className,
        className,
      )}
      {...props}
      {...(animation.enabled ? {
        onInteractOutside: (event: Parameters<NonNullable<typeof props.onInteractOutside>>[0]) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) focus.onOutside(event.detail.originalEvent.target);
        },
        onCloseAutoFocus: (event: Event) => { props.onCloseAutoFocus?.(event); focus.onClose(event); },
      } : {})}
    />
      </OverlayPresence>
  </RPopover.Portal>
);
});
PopoverContent.displayName = "PopoverContent";
