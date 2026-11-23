import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Tooltip } from "./Tooltip";

/* -------------------------------------------------------------------------- *
 *  Sidebar — a collapsible app-shell navigation.
 *
 *  <SidebarProvider>
 *    <Sidebar>
 *      <SidebarHeader>…</SidebarHeader>
 *      <SidebarContent>
 *        <SidebarGroup>
 *          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
 *          <SidebarMenu>
 *            <SidebarMenuItem>
 *              <SidebarMenuButton isActive tooltip="Inbox">
 *                <InboxIcon /> <span>Inbox</span>
 *              </SidebarMenuButton>
 *            </SidebarMenuItem>
 *          </SidebarMenu>
 *        </SidebarGroup>
 *      </SidebarContent>
 *      <SidebarFooter>…</SidebarFooter>
 *    </Sidebar>
 *    <SidebarInset>{children}</SidebarInset>
 *  </SidebarProvider>
 *
 *  `collapsible="icon"` shrinks to an icon rail; `"offcanvas"` slides away.
 *  Toggle with <SidebarTrigger />, the `useSidebar()` hook, or ⌘/Ctrl-B.
 * -------------------------------------------------------------------------- */

const SIDEBAR_WIDTH = "15rem";
const SIDEBAR_WIDTH_ICON = "3.25rem";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  state: "expanded" | "collapsed";
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>");
  return ctx;
}

export interface SidebarProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SidebarProvider = forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    { defaultOpen = true, open: openProp, onOpenChange, className, style, children, ...props },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultOpen);
    const open = openProp ?? uncontrolled;

    const setOpen = useCallback(
      (value: boolean) => {
        onOpenChange?.(value);
        if (openProp === undefined) setUncontrolled(value);
      },
      [onOpenChange, openProp],
    );

    const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          toggle();
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [toggle]);

    const value = useMemo<SidebarContextValue>(
      () => ({ open, setOpen, toggle, state: open ? "expanded" : "collapsed" }),
      [open, setOpen, toggle],
    );

    return (
      <SidebarContext.Provider value={value}>
        <div
          ref={ref}
          data-state={value.state}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("flex h-full w-full bg-surface-app text-text-primary", className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: "icon" | "offcanvas" | "none";
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsible = "icon", className, children, ...props }, ref) => {
    const { state } = useSidebar();
    const collapsed = state === "collapsed" && collapsible !== "none";

    return (
      <div
        ref={ref}
        data-state={state}
        data-collapsible={collapsible}
        className={cn(
          "group/sidebar relative flex shrink-0 flex-col gap-2 p-2 transition-[width] duration-[var(--ease-base)] ease-[var(--ease-curve)]",
          collapsed && collapsible === "icon" && "w-[var(--sidebar-width-icon)]",
          collapsed && collapsible === "offcanvas" && "w-0 overflow-hidden p-0",
          !collapsed && "w-[var(--sidebar-width)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

export const SidebarHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 px-1", className)} {...props} />
  ),
);
SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto", className)}
      {...props}
    />
  ),
);
SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1 px-1", className)} {...props} />
  ),
);
SidebarFooter.displayName = "SidebarFooter";

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-0.5", className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2 pb-1 text-2xs font-semibold tracking-wide text-text-tertiary uppercase",
        "transition-opacity group-data-[state=collapsed]/sidebar:pointer-events-none group-data-[state=collapsed]/sidebar:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-0.5", className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-col gap-0.5", className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("relative", className)} {...props} />;
}

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isActive?: boolean;
  /** Shown as a tooltip when the sidebar is collapsed to the icon rail. */
  tooltip?: string;
}

export const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ asChild, isActive, tooltip, className, children, ...props }, ref) => {
    const { state } = useSidebar();
    const Comp = asChild ? Slot : "button";

    const button = (
      <Comp
        ref={ref}
        data-active={isActive || undefined}
        className={cn(
          "flex h-7 w-full items-center gap-2 overflow-visible rounded-sm px-2 text-left text-sm transition-colors duration-[var(--ease-fast)]",
          "[&>svg]:size-4 [&>svg]:shrink-0 [&>span]:truncate",
          "group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0",
          "focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          isActive
            ? "bg-fill-active font-medium text-text-primary [&>svg]:text-text-secondary"
            : "text-text-secondary hover:bg-fill-hover hover:text-text-primary [&>svg]:text-text-tertiary",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );

    if (tooltip && state === "collapsed") {
      return (
        <Tooltip content={tooltip} side="right">
          {button}
        </Tooltip>
      );
    }
    return button;
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export function SidebarMenuBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 text-2xs font-medium text-text-tertiary",
        "group-data-[state=collapsed]/sidebar:hidden",
        className,
      )}
      {...props}
    />
  );
}

export const SidebarTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggle } = useSidebar();
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Toggle sidebar"
      onClick={(e) => {
        onClick?.(e);
        toggle();
      }}
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-sm text-text-tertiary transition-colors hover:bg-fill-hover hover:text-text-primary",
        className,
      )}
      {...props}
    >
      <PanelLeft className="size-4" />
    </button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export const SidebarInset = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 flex-1 py-2 pr-2 pl-1", className)}>
      <main
        className={cn(
          "h-full overflow-hidden rounded-xl border border-border bg-surface-panel shadow-sm",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
SidebarInset.displayName = "SidebarInset";

export function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-1 h-px bg-border-subtle", className)} {...props} />;
}
