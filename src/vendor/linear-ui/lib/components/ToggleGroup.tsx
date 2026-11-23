import { createContext, forwardRef, useContext } from "react";
import * as RToggleGroup from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { toggleVariants } from "./Toggle";

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;
const ToggleGroupContext = createContext<ToggleGroupVariants>({});

/**
 * ToggleGroup — a set of Toggles behaving as one control (`type="single"` or
 * `"multiple"`). Rendered as a joined segmented row.
 */
export const ToggleGroup = forwardRef<
  React.ElementRef<typeof RToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RToggleGroup.Root> & ToggleGroupVariants
>(({ className, variant, size, children, ...props }, ref) => (
  <RToggleGroup.Root
    ref={ref}
    className={cn(
      "inline-flex items-center gap-0.5 rounded-md border border-border bg-bg-tertiary p-0.5",
      className,
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </RToggleGroup.Root>
));
ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof RToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RToggleGroup.Item> &
    Pick<ToggleGroupVariants, "size">
>(({ className, size, ...props }, ref) => {
  const ctx = useContext(ToggleGroupContext);
  return (
    <RToggleGroup.Item
      ref={ref}
      className={cn(
        toggleVariants({ variant: "ghost", size: size ?? ctx.size }),
        "data-[state=on]:bg-bg-primary data-[state=on]:shadow-xs",
        className,
      )}
      {...props}
    />
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";
