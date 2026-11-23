import { forwardRef } from "react";
import * as RContextMenu from "@radix-ui/react-context-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * ContextMenu — the right-click menu. Same surface and rows as DropdownMenu.
 *
 *   <ContextMenu>
 *     <ContextMenuTrigger>…</ContextMenuTrigger>
 *     <ContextMenuContent>
 *       <ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
 *     </ContextMenuContent>
 *   </ContextMenu>
 */
export const ContextMenu = RContextMenu.Root;
export const ContextMenuTrigger = RContextMenu.Trigger;
export const ContextMenuGroup = RContextMenu.Group;

export const ContextMenuContent = forwardRef<
  React.ElementRef<typeof RContextMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RContextMenu.Content>
>(({ className, ...props }, ref) => (
  <RContextMenu.Portal>
    <RContextMenu.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[180px] overflow-hidden rounded-md border border-border bg-bg-elevated p-1 shadow-popover",
        "origin-[var(--radix-context-menu-content-transform-origin)]",
        "transition-[opacity,transform] duration-[var(--ease-fast)] ease-[var(--ease-out-curve)]",
        "data-[state=closed]:pointer-events-none data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        className,
      )}
      {...props}
    />
  </RContextMenu.Portal>
));
ContextMenuContent.displayName = "ContextMenuContent";

export interface ContextMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof RContextMenu.Item> {
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
}

export const ContextMenuItem = forwardRef<
  React.ElementRef<typeof RContextMenu.Item>,
  ContextMenuItemProps
>(({ className, icon, shortcut, destructive, children, ...props }, ref) => (
  <RContextMenu.Item
    ref={ref}
    className={cn(
      "flex h-7 cursor-pointer items-center gap-2 rounded-sm px-2 text-sm outline-none select-none",
      "data-[highlighted]:bg-fill-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
      destructive
        ? "text-danger data-[highlighted]:bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] [&_svg]:text-danger"
        : "text-text-primary [&_svg]:text-text-tertiary",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  >
    {icon}
    <span className="flex-1 truncate">{children}</span>
    {shortcut && (
      <span className="font-mono text-2xs text-text-tertiary">{shortcut}</span>
    )}
  </RContextMenu.Item>
));
ContextMenuItem.displayName = "ContextMenuItem";

export const ContextMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof RContextMenu.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof RContextMenu.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <RContextMenu.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex h-7 cursor-pointer items-center gap-2 rounded-sm pr-2 pl-7 text-sm text-text-primary outline-none select-none",
      "data-[highlighted]:bg-fill-hover",
      className,
    )}
    {...props}
  >
    <RContextMenu.ItemIndicator className="absolute left-2 flex">
      <Check className="size-3.5 text-accent-subtle-text" />
    </RContextMenu.ItemIndicator>
    {children}
  </RContextMenu.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

export const ContextMenuLabel = forwardRef<
  React.ElementRef<typeof RContextMenu.Label>,
  React.ComponentPropsWithoutRef<typeof RContextMenu.Label>
>(({ className, ...props }, ref) => (
  <RContextMenu.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-2xs font-semibold tracking-wide text-text-tertiary uppercase", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = "ContextMenuLabel";

export const ContextMenuSeparator = forwardRef<
  React.ElementRef<typeof RContextMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof RContextMenu.Separator>
>(({ className, ...props }, ref) => (
  <RContextMenu.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border-subtle", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";
