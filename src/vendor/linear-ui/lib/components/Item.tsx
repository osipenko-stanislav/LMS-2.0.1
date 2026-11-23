import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { useMotionSettings } from "../motion";
import { cn } from "@/lib/utils/cn";

/**
 * Item — a horizontal list row: media (icon/avatar), a title + description
 * stack, then trailing actions. Use for settings lists, results, pickers.
 *
 *   <Item>
 *     <ItemMedia><Avatar name="Ada" /></ItemMedia>
 *     <ItemContent>
 *       <ItemTitle>Ada Lovelace</ItemTitle>
 *       <ItemDescription>ada@example.com</ItemDescription>
 *     </ItemContent>
 *     <ItemActions><Button size="sm" variant="ghost">Remove</Button></ItemActions>
 *   </Item>
 */
const item = cva(
  "flex items-center gap-3 rounded-lg text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-border",
        muted: "bg-fill-hover",
      },
      size: { sm: "p-2", md: "p-3" },
      interactive: {
        true: "cursor-pointer hover:bg-fill-hover",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof item> {}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, interactive, ...props }, ref) => {
    const { enabled, reduced, transition } = useMotionSettings("layout");
    const Root = (enabled ? motion.div : "div") as "div";
    return (
    <Root
      {...(enabled ? { layout: !reduced, initial: false, transition } : {})}
      ref={ref}
      className={cn(item({ variant, size, interactive }), className)}
      {...props}
    />
  );
  },
);
Item.displayName = "Item";

export function ItemMedia({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center text-text-tertiary [&_svg]:size-4", className)}
      {...props}
    />
  );
}

export function ItemContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props} />;
}

export function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("truncate font-medium text-text-primary", className)} {...props} />;
}

export function ItemDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("truncate text-xs text-text-secondary", className)} {...props} />;
}

export function ItemActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex shrink-0 items-center gap-1.5", className)} {...props} />;
}
