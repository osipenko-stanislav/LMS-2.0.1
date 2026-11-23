import { forwardRef } from "react";
import * as RAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { ExpandRegion, useMotionSettings } from "../motion";
import { useDisclosureState } from "../useDisclosureMotion";
import { cn } from "@/lib/utils/cn";

/**
 * Accordion — stacked, collapsible sections divided by hairlines. The trigger
 * chevron rotates; content expands with Radix's height animation.
 */
export const Accordion = RAccordion.Root;

export const AccordionItem = forwardRef<
  React.ElementRef<typeof RAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RAccordion.Item>
>(({ className, ...props }, ref) => (
  <RAccordion.Item
    ref={ref}
    className={cn("border-b border-border-subtle", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof RAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RAccordion.Header className="flex">
    <RAccordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-3 py-3 text-left text-sm font-medium text-text-primary",
        "transition-colors hover:text-text-primary/80",
        "focus-visible:outline-none focus-visible:text-text-primary",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 text-text-tertiary transition-transform duration-[var(--ease-base)]" />
    </RAccordion.Trigger>
  </RAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  React.ElementRef<typeof RAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RAccordion.Content>
>(({ className, children, ...props }, forwardedRef) => {
  const { enabled } = useMotionSettings("expand");
  const { ref, open } = useDisclosureState(forwardedRef, enabled);
  return (
  <RAccordion.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-text-secondary",
      "data-[state=open]:animate-[accordion-down_var(--ease-base)_ease] data-[state=closed]:animate-[accordion-up_var(--ease-base)_ease]",
      enabled && "lms-motion-disclosure",
      className,
    )}
    {...props}
    forceMount={enabled || props.forceMount ? true : undefined}
    aria-hidden={enabled && !open ? true : props["aria-hidden"]}
  >
    {enabled ? <ExpandRegion open={open} keepMounted={!!props.forceMount}><div className="pb-3">{children}</div></ExpandRegion> : <div className="pb-3">{children}</div>}
  </RAccordion.Content>
);
});
AccordionContent.displayName = "AccordionContent";
