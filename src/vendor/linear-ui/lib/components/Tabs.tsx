import { forwardRef } from "react";
import * as RTabs from "@radix-ui/react-tabs";
import { createSelectionRoot, useMotionSettings, useSelectionState, SelectionIndicator } from "../motion";
import { cn } from "@/lib/utils/cn";

/**
 * Tabs — Linear's settings-style tabs: a row with a bottom hairline, the
 * active tab marked by an accent underline that sits on that hairline.
 * Thin wrappers over Radix Tabs.
 */
export const Tabs = createSelectionRoot(RTabs.Root);

export const TabsList = forwardRef<
  React.ElementRef<typeof RTabs.List>,
  React.ComponentPropsWithoutRef<typeof RTabs.List>
>(({ className, ...props }, ref) => (
  <RTabs.List
    ref={ref}
    className={cn(
      "relative flex items-center gap-4 border-b border-border",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof RTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RTabs.Trigger>
>(({ className, children, ...props }, ref) => {
  const { enabled } = useMotionSettings("selection");
  const selected = useSelectionState();
  return (
  <RTabs.Trigger
    ref={ref}
    className={cn(
      "-mb-px flex h-9 items-center gap-1.5 border-b-2 border-transparent px-0.5 text-sm font-medium",
      "text-text-secondary transition-colors duration-[var(--ease-fast)]",
      "hover:text-text-primary",
      "data-[state=active]:border-accent data-[state=active]:text-text-primary",
      "focus-visible:outline-none focus-visible:text-text-primary",
      "[&_svg]:size-4",
      enabled && "lms-motion-selection data-[state=active]:border-transparent",
      className,
    )}
    {...props}
  >
    {enabled && selected?.value === props.value && <SelectionIndicator group={selected.group} kind="underline" />}
    {children}
  </RTabs.Trigger>
);
});
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  React.ElementRef<typeof RTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RTabs.Content>
>(({ className, ...props }, ref) => (
  <RTabs.Content
    ref={ref}
    className={cn(
      "pt-5 focus-visible:outline-none",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
