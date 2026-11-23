import { forwardRef } from "react";
import * as RDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Sheet — a Dialog that slides in from an edge (a "drawer" panel). Built on
 * Radix Dialog so it's fully modal and focus-trapped.
 */
export const Sheet = RDialog.Root;
export const SheetTrigger = RDialog.Trigger;
export const SheetClose = RDialog.Close;

const sheet = cva(
  [
    "fixed z-50 flex flex-col gap-4 border-border bg-bg-elevated p-5 shadow-modal",
    "transition-transform duration-[var(--ease-base)] ease-[var(--ease-out-curve)]",
  ],
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full w-80 max-w-[85vw] border-l data-[state=closed]:translate-x-full",
        left: "inset-y-0 left-0 h-full w-80 max-w-[85vw] border-r data-[state=closed]:-translate-x-full",
        top: "inset-x-0 top-0 w-full border-b data-[state=closed]:-translate-y-full",
        bottom:
          "inset-x-0 bottom-0 w-full border-t data-[state=closed]:translate-y-full",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof RDialog.Content>,
    VariantProps<typeof sheet> {}

export const SheetContent = forwardRef<
  React.ElementRef<typeof RDialog.Content>,
  SheetContentProps
>(({ className, side, children, ...props }, ref) => (
  <RDialog.Portal>
    <RDialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-bg-overlay backdrop-blur-[2px]",
        "transition-opacity duration-[var(--ease-base)] data-[state=closed]:opacity-0",
      )}
    />
    <RDialog.Content
      ref={ref}
      className={cn(sheet({ side }), "focus-visible:outline-none", className)}
      {...props}
    >
      {children}
      <RDialog.Close
        aria-label="Close"
        className="absolute right-3.5 top-3.5 grid size-6 place-items-center rounded-sm text-text-tertiary transition-colors hover:bg-fill-hover hover:text-text-primary focus-visible:outline-none"
      >
        <X className="size-4" />
      </RDialog.Close>
    </RDialog.Content>
  </RDialog.Portal>
));
SheetContent.displayName = "SheetContent";

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 pr-6", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-auto flex items-center justify-end gap-2", className)} {...props} />
  );
}

export const SheetTitle = forwardRef<
  React.ElementRef<typeof RDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RDialog.Title>
>(({ className, ...props }, ref) => (
  <RDialog.Title
    ref={ref}
    className={cn("text-base font-semibold text-text-primary", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = forwardRef<
  React.ElementRef<typeof RDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RDialog.Description>
>(({ className, ...props }, ref) => (
  <RDialog.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";
