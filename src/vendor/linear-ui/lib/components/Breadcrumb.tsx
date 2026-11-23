import { forwardRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Breadcrumb — a path trail.
 *
 *   <Breadcrumb>
 *     <BreadcrumbList>
 *       <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
 *       <BreadcrumbSeparator />
 *       <BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem>
 *     </BreadcrumbList>
 *   </Breadcrumb>
 */
export const Breadcrumb = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav">
>((props, ref) => <nav ref={ref} aria-label="Breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

export function BreadcrumbList({ className, ...props }: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn("flex flex-wrap items-center gap-1.5 text-sm text-text-tertiary", className)}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: React.ComponentPropsWithoutRef<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "text-text-secondary transition-colors hover:text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbPage({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("font-medium text-text-primary", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li role="presentation" aria-hidden className={cn("[&>svg]:size-3.5", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}
