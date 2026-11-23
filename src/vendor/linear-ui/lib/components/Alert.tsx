import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const alert = cva(
  "relative flex gap-3 rounded-lg border px-3.5 py-3 text-sm [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "border-border bg-bg-primary text-text-primary [&>svg]:text-text-tertiary",
        info: "border-transparent bg-accent-subtle text-text-primary [&>svg]:text-accent-subtle-text",
        success:
          "border-transparent bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-text-primary [&>svg]:text-success",
        warning:
          "border-transparent bg-[color-mix(in_srgb,var(--warning)_14%,transparent)] text-text-primary [&>svg]:text-warning",
        danger:
          "border-transparent bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-text-primary [&>svg]:text-danger",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alert> {}

/** Alert — a callout for a short, important message. Pass an icon as the first child. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alert({ variant }), className)} {...props} />
  ),
);
Alert.displayName = "Alert";

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-0.5 font-medium", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-text-secondary", className)} {...props} />;
}
