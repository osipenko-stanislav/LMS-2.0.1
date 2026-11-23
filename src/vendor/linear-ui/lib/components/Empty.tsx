import { cn } from "@/lib/utils/cn";

/**
 * Empty — an empty-state block: an icon in a soft tile, a title, a line of
 * help text, then optional actions.
 *
 *   <Empty>
 *     <EmptyIcon><Icon icon={Inbox01Icon} /></EmptyIcon>
 *     <EmptyTitle>No issues</EmptyTitle>
 *     <EmptyDescription>Create one to get started.</EmptyDescription>
 *     <EmptyActions><Button>New issue</Button></EmptyActions>
 *   </Empty>
 */
export function Empty({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-1 grid size-10 place-items-center rounded-lg bg-fill-active text-text-tertiary [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <p className={cn("text-sm font-medium text-text-primary", className)} {...props} />;
}

export function EmptyDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("max-w-xs text-xs text-text-secondary", className)} {...props} />
  );
}

export function EmptyActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-3 flex items-center gap-2", className)} {...props} />;
}
