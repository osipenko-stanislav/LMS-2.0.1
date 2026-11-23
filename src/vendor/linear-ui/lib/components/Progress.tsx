import { forwardRef } from "react";
import * as RProgress from "@radix-ui/react-progress";
import { cn } from "@/lib/utils/cn";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof RProgress.Root> {
  /** 0–100. Omit for an indeterminate bar. */
  value?: number | null;
}

/** Progress — a determinate (or indeterminate) accent-filled track. */
export const Progress = forwardRef<
  React.ElementRef<typeof RProgress.Root>,
  ProgressProps
>(({ className, value, ...props }, ref) => (
  <RProgress.Root
    ref={ref}
    value={value ?? undefined}
    className={cn(
      "relative h-1.5 w-full overflow-hidden rounded-full bg-fill-active",
      className,
    )}
    {...props}
  >
    <RProgress.Indicator
      className={cn(
        "h-full rounded-full bg-accent transition-[width] duration-[var(--ease-slow)] ease-[var(--ease-out-curve)]",
        value == null && "w-2/5 animate-pulse",
      )}
      style={value == null ? undefined : { width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </RProgress.Root>
));
Progress.displayName = "Progress";
