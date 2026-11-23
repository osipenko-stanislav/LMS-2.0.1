import { forwardRef } from "react";
import * as RMenu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { createMotionRoot, OverlayPresence, useOverlayMotion } from "../motion";
import { useGradientBorder } from "../useGradientBorder";
import { useOverlayFocus } from "../useOverlayFocus";
import { cn } from "@/lib/utils/cn";

/**
 * DropdownMenu — Linear's context/overflow menu. Elevated surface, popover
 * shadow, 6px radius, rows that highlight with the translucent hover fill and
 * carry an optional leading icon + trailing shortcut. Thin wrappers over Radix.
 *
 *   <DropdownMenu>
 *     <DropdownMenuTrigger asChild><Button …/></DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuItem icon={<Pencil/>} shortcut="E">Rename</DropdownMenuItem>
 *       <DropdownMenuSeparator/>
 *       <DropdownMenuItem destructive icon={<Trash/>}>Delete</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 */
export const DropdownMenu = createMotionRoot(RMenu.Root);
const MotionContent = motion.create(RMenu.Content);
export const DropdownMenuTrigger = RMenu.Trigger;
export const DropdownMenuGroup = RMenu.Group;

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof RMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RMenu.Content>
>(({ className, sideOffset = 6, ...props }, forwardedRef) => {
  const animation = useOverlayMotion();
  const focus = useOverlayFocus(forwardedRef, animation.enabled, animation.open);
  const gradientRef = useGradientBorder(focus.ref);
  const Content = (animation.enabled ? MotionContent : RMenu.Content) as typeof RMenu.Content;
  return (
  <RMenu.Portal forceMount={animation.enabled || props.forceMount ? true : undefined}>
    <OverlayPresence enabled={animation.enabled} open={animation.open}>
    <Content
      {...animation.props}
      forceMount={animation.enabled || props.forceMount ? true : undefined}
      ref={gradientRef}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[200px] overflow-hidden rounded-md border border-border bg-bg-elevated p-1",
        "shadow-popover",
        "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
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
  </RMenu.Portal>
);
});
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof RMenu.Item> {
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
}

export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof RMenu.Item>,
  DropdownMenuItemProps
>(({ className, icon, shortcut, destructive, children, ...props }, ref) => (
  <RMenu.Item
    ref={ref}
    className={cn(
      "flex h-7 cursor-pointer items-center gap-2 rounded-sm px-2 text-sm outline-none select-none",
      "data-[highlighted]:bg-fill-hover",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
      destructive
        ? "text-danger data-[highlighted]:bg-[color-mix(in_srgb,var(--danger)_14%,transparent)]"
        : "text-text-primary",
      "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-text-tertiary",
      destructive && "[&_svg]:text-danger",
      className,
    )}
    {...props}
  >
    {icon}
    <span className="flex-1 truncate">{children}</span>
    {shortcut && (
      <span className="font-mono text-2xs text-text-tertiary">{shortcut}</span>
    )}
  </RMenu.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof RMenu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof RMenu.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <RMenu.CheckboxItem
    ref={ref}
    className={cn(
      "flex h-7 cursor-pointer items-center gap-2 rounded-sm pr-2 pl-7 text-sm text-text-primary outline-none select-none",
      "data-[highlighted]:bg-fill-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
      "relative",
      className,
    )}
    {...props}
  >
    <RMenu.ItemIndicator className="absolute left-2 flex">
      <Check className="size-3.5 text-accent-subtle-text" />
    </RMenu.ItemIndicator>
    {children}
  </RMenu.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof RMenu.Label>,
  React.ComponentPropsWithoutRef<typeof RMenu.Label>
>(({ className, ...props }, ref) => (
  <RMenu.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-2xs font-semibold tracking-wide text-text-tertiary uppercase",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof RMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof RMenu.Separator>
>(({ className, ...props }, ref) => (
  <RMenu.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border-subtle", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
