import { forwardRef } from "react";
import * as RMenubar from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils/cn";

/**
 * Menubar — a horizontal application menu bar (File / Edit / View …). Menus
 * share DropdownMenu's surface styling.
 */
export const Menubar = forwardRef<
  React.ElementRef<typeof RMenubar.Root>,
  React.ComponentPropsWithoutRef<typeof RMenubar.Root>
>(({ className, ...props }, ref) => (
  <RMenubar.Root
    ref={ref}
    className={cn(
      "flex items-center gap-0.5 rounded-md border border-border bg-bg-primary p-0.5",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = "Menubar";

export const MenubarMenu = RMenubar.Menu;
export const MenubarGroup = RMenubar.Group;

export const MenubarTrigger = forwardRef<
  React.ElementRef<typeof RMenubar.Trigger>,
  React.ComponentPropsWithoutRef<typeof RMenubar.Trigger>
>(({ className, ...props }, ref) => (
  <RMenubar.Trigger
    ref={ref}
    className={cn(
      "flex h-6 cursor-default items-center rounded-sm px-2 text-sm font-medium text-text-secondary select-none",
      "outline-none data-[highlighted]:bg-fill-hover data-[highlighted]:text-text-primary",
      "data-[state=open]:bg-fill-active data-[state=open]:text-text-primary",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = "MenubarTrigger";

export const MenubarContent = forwardRef<
  React.ElementRef<typeof RMenubar.Content>,
  React.ComponentPropsWithoutRef<typeof RMenubar.Content>
>(({ className, align = "start", sideOffset = 6, ...props }, ref) => (
  <RMenubar.Portal>
    <RMenubar.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[180px] overflow-hidden rounded-md border border-border bg-bg-elevated p-1 shadow-popover",
        className,
      )}
      {...props}
    />
  </RMenubar.Portal>
));
MenubarContent.displayName = "MenubarContent";

export interface MenubarItemProps
  extends React.ComponentPropsWithoutRef<typeof RMenubar.Item> {
  shortcut?: string;
}

export const MenubarItem = forwardRef<
  React.ElementRef<typeof RMenubar.Item>,
  MenubarItemProps
>(({ className, shortcut, children, ...props }, ref) => (
  <RMenubar.Item
    ref={ref}
    className={cn(
      "flex h-7 cursor-pointer items-center gap-2 rounded-sm px-2 text-sm text-text-primary outline-none select-none",
      "data-[highlighted]:bg-fill-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
      className,
    )}
    {...props}
  >
    <span className="flex-1 truncate">{children}</span>
    {shortcut && (
      <span className="font-mono text-2xs text-text-tertiary">{shortcut}</span>
    )}
  </RMenubar.Item>
));
MenubarItem.displayName = "MenubarItem";

export const MenubarSeparator = forwardRef<
  React.ElementRef<typeof RMenubar.Separator>,
  React.ComponentPropsWithoutRef<typeof RMenubar.Separator>
>(({ className, ...props }, ref) => (
  <RMenubar.Separator
    ref={ref}
    className={cn("my-1 h-px bg-border-subtle", className)}
    {...props}
  />
));
MenubarSeparator.displayName = "MenubarSeparator";
