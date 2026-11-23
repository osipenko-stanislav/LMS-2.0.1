import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * InputGroup — wraps a bare `<input>` with leading/trailing addons (icons,
 * text, buttons) inside a single bordered, focus-ring container.
 *
 *   <InputGroup>
 *     <InputGroupAddon><Icon icon={Search01Icon} /></InputGroupAddon>
 *     <InputGroupInput placeholder="Search…" />
 *     <InputGroupAddon><Kbd>⌘K</Kbd></InputGroupAddon>
 *   </InputGroup>
 */
export const InputGroup = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-8 items-center gap-1.5 rounded-sm border border-border bg-bg-primary px-2",
      "transition-colors duration-[var(--ease-base)]",
      "focus-within:border-accent focus-within:shadow-[0_0_0_3px_var(--ring)]",
      className,
    )}
    {...props}
  />
));
InputGroup.displayName = "InputGroup";

export function InputGroupAddon({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1 text-text-tertiary [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export const InputGroupInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-full w-full min-w-0 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:shadow-none",
      className,
    )}
    {...props}
  />
));
InputGroupInput.displayName = "InputGroupInput";
