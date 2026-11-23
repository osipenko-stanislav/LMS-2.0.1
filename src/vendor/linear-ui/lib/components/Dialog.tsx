import { forwardRef } from "react";
import * as RDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { createMotionRoot, OverlayPresence, useOverlayMotion } from "../motion";
import { useGradientBorder } from "../useGradientBorder";
import { useOverlayFocus } from "../useOverlayFocus";
import { cn } from "@/lib/utils/cn";

/**
 * Dialog — Linear's modal: a blurred dim overlay and a centered elevated card
 * (12px radius, hairline border, modal shadow) that scales in from 96%.
 * Wrappers over Radix Dialog.
 *
 *   <Dialog>
 *     <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Delete project</DialogTitle>
 *         <DialogDescription>This can't be undone.</DialogDescription>
 *       </DialogHeader>
 *       <DialogFooter>
 *         <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
 *         <Button variant="danger">Delete</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </Dialog>
 */
export const Dialog = createMotionRoot(RDialog.Root);
const MotionContent = motion.create(RDialog.Content);
const MotionOverlay = motion.create(RDialog.Overlay);
export const DialogTrigger = RDialog.Trigger;
export const DialogClose = RDialog.Close;

export const DialogContent = forwardRef<
  React.ElementRef<typeof RDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RDialog.Content> & {
    hideClose?: boolean;
  }
>(({ className, children, hideClose, ...props }, forwardedRef) => {
  const animation = useOverlayMotion(true);
  const focus = useOverlayFocus(forwardedRef, animation.enabled, animation.open);
  const gradientRef = useGradientBorder(focus.ref);
  const Content = (animation.enabled ? MotionContent : RDialog.Content) as typeof RDialog.Content;
  const Overlay = (animation.enabled ? MotionOverlay : RDialog.Overlay) as typeof RDialog.Overlay;
  return (
  <RDialog.Portal forceMount={animation.enabled || props.forceMount ? true : undefined}>
    <OverlayPresence enabled={animation.enabled} open={animation.open}>
    <Overlay
      key="backdrop"
      forceMount={animation.enabled ? true : undefined}
      {...(animation.enabled ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: animation.reduced ? 0 : 0.12 } } : {})}
      className={cn(
        "fixed inset-0 z-50 bg-bg-overlay backdrop-blur-[2px]",
        "transition-opacity duration-[var(--ease-base)]",
        "data-[state=closed]:opacity-0",
        animation.props.className,
      )}
    />
    <Content key="dialog"
      {...animation.props}
      forceMount={animation.enabled || props.forceMount ? true : undefined}
      ref={gradientRef}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
        "rounded-xl border border-border bg-bg-elevated p-5 shadow-modal",
        "transition-[opacity,transform] duration-[var(--ease-base)] ease-[var(--ease-out-curve)]",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        "focus-visible:outline-none",
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
    >
      {children}
      {!hideClose && (
        <RDialog.Close
          aria-label="Close"
          className={cn(
            "absolute right-3.5 top-3.5 grid size-6 place-items-center rounded-sm text-text-tertiary",
            "transition-colors hover:bg-fill-hover hover:text-text-primary",
            "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--ring-offset),0_0_0_4px_var(--ring)]",
          )}
        >
          <X className="size-4" />
        </RDialog.Close>
      )}
    </Content>
      </OverlayPresence>
  </RDialog.Portal>
);
});
DialogContent.displayName = "DialogContent";

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex flex-col gap-1 pr-6", className)} {...props} />;
}

export const DialogTitle = forwardRef<
  React.ElementRef<typeof RDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RDialog.Title>
>(({ className, ...props }, ref) => (
  <RDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold text-text-primary", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  React.ElementRef<typeof RDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RDialog.Description>
>(({ className, ...props }, ref) => (
  <RDialog.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex items-center justify-end gap-2", className)}
      {...props}
    />
  );
}
