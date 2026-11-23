import { forwardRef } from "react";
import * as RNav from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * NavigationMenu — a top-level nav with dropdown panels. Triggers read as
 * `ghost` buttons; the panel is an elevated surface anchored under the list.
 */
export const NavigationMenu = forwardRef<
  React.ElementRef<typeof RNav.Root>,
  React.ComponentPropsWithoutRef<typeof RNav.Root>
>(({ className, children, ...props }, ref) => (
  <RNav.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max justify-center", className)}
    {...props}
  >
    {children}
    <div className="absolute top-full left-0 flex justify-center">
      <RNav.Viewport
        className={cn(
          "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-left overflow-hidden",
          "rounded-md border border-border bg-bg-elevated shadow-popover",
          "transition-[width,height] duration-[var(--ease-base)]",
          "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
        )}
      />
    </div>
  </RNav.Root>
));
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = forwardRef<
  React.ElementRef<typeof RNav.List>,
  React.ComponentPropsWithoutRef<typeof RNav.List>
>(({ className, ...props }, ref) => (
  <RNav.List
    ref={ref}
    className={cn("flex items-center gap-0.5", className)}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = RNav.Item;
export const NavigationMenuLink = RNav.Link;

export const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof RNav.Trigger>,
  React.ComponentPropsWithoutRef<typeof RNav.Trigger>
>(({ className, children, ...props }, ref) => (
  <RNav.Trigger
    ref={ref}
    className={cn(
      "group inline-flex h-7 items-center gap-1 rounded-md px-2.5 text-sm font-medium text-text-secondary select-none",
      "transition-colors hover:bg-fill-hover hover:text-text-primary",
      "data-[state=open]:bg-fill-active data-[state=open]:text-text-primary",
      "focus-visible:outline-none",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className="size-3.5 text-text-tertiary transition-transform duration-[var(--ease-fast)] group-data-[state=open]:rotate-180"
      aria-hidden
    />
  </RNav.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof RNav.Content>,
  React.ComponentPropsWithoutRef<typeof RNav.Content>
>(({ className, ...props }, ref) => (
  <RNav.Content
    ref={ref}
    className={cn("w-full p-2", className)}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";
