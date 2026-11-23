import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Card — a bordered content container. Compose with the sub-parts:
 *
 *   <Card>
 *     <CardHeader>
 *       <CardTitle>…</CardTitle>
 *       <CardDescription>…</CardDescription>
 *     </CardHeader>
 *     <CardContent>…</CardContent>
 *     <CardFooter>…</CardFooter>
 *   </Card>
 */
export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col rounded-xl border border-border bg-bg-primary text-text-primary",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h3
      className={cn("text-sm font-semibold tracking-[-0.006em]", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <p className={cn("text-xs text-text-secondary", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0 text-sm", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-2 border-t border-border-subtle p-4", className)}
      {...props}
    />
  );
}
