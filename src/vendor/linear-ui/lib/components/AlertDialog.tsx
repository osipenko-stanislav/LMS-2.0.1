import { forwardRef } from "react";
import * as RAlertDialog from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "./Button";

/**
 * AlertDialog — a modal that interrupts to confirm a consequential action.
 * Same surface as Dialog but focus lands on Cancel and there's no dismiss-X.
 */
export const AlertDialog = RAlertDialog.Root;
export const AlertDialogTrigger = RAlertDialog.Trigger;

export const AlertDialogContent = forwardRef<
  React.ElementRef<typeof RAlertDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RAlertDialog.Content>
>(({ className, ...props }, ref) => (
  <RAlertDialog.Portal>
    <RAlertDialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-bg-overlay backdrop-blur-[2px]",
        "transition-opacity duration-[var(--ease-base)] data-[state=closed]:opacity-0",
      )}
    />
    <RAlertDialog.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2",
        "rounded-xl border border-border bg-bg-elevated p-5 shadow-modal",
        "transition-[opacity,transform] duration-[var(--ease-base)] ease-[var(--ease-out-curve)]",
        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0 focus-visible:outline-none",
        className,
      )}
      {...props}
    />
  </RAlertDialog.Portal>
));
AlertDialogContent.displayName = "AlertDialogContent";

export function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-2 flex flex-col gap-1", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-5 flex items-center justify-end gap-2", className)} {...props} />
  );
}

export const AlertDialogTitle = forwardRef<
  React.ElementRef<typeof RAlertDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RAlertDialog.Title>
>(({ className, ...props }, ref) => (
  <RAlertDialog.Title
    ref={ref}
    className={cn("text-base font-semibold text-text-primary", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = forwardRef<
  React.ElementRef<typeof RAlertDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RAlertDialog.Description>
>(({ className, ...props }, ref) => (
  <RAlertDialog.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogAction = forwardRef<
  React.ElementRef<typeof RAlertDialog.Action>,
  React.ComponentPropsWithoutRef<typeof RAlertDialog.Action> & {
    variant?: "primary" | "danger";
  }
>(({ className, variant = "primary", ...props }, ref) => (
  <RAlertDialog.Action
    ref={ref}
    className={cn(buttonVariants({ variant, size: "md" }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = forwardRef<
  React.ElementRef<typeof RAlertDialog.Cancel>,
  React.ComponentPropsWithoutRef<typeof RAlertDialog.Cancel>
>(({ className, ...props }, ref) => (
  <RAlertDialog.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "ghost", size: "md" }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";
