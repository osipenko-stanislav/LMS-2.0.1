import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Badge — the small status / label chip Linear uses in lists and tables.
 * Colored variants render as a low-opacity tint of the hue with matching
 * text; `dot` adds the leading status dot Linear puts on labels.
 */
const badge = cva(
  [
    "inline-flex items-center gap-1 rounded-sm font-medium whitespace-nowrap select-none",
    "border",
  ],
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-fill-active text-text-secondary",
        accent:
          "border-transparent bg-accent-subtle text-accent-subtle-text",
        success:
          "border-transparent bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-success",
        warning:
          "border-transparent bg-[color-mix(in_srgb,var(--warning)_16%,transparent)] text-warning",
        danger:
          "border-transparent bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-danger",
        outline: "border-border bg-transparent text-text-secondary",
      },
      size: {
        sm: "h-[18px] px-1.5 text-2xs",
        md: "h-5 px-2 text-xs",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {
  dot?: boolean;
}

const dotColor: Record<string, string> = {
  neutral: "bg-text-tertiary",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  outline: "bg-text-tertiary",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badge({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            dotColor[variant ?? "neutral"],
          )}
        />
      )}
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";
