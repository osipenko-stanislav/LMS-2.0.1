import { cn } from "@/lib/utils/cn";

/** Skeleton — a pulsing placeholder block for loading states. */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-fill-active",
        className,
      )}
      {...props}
    />
  );
}
