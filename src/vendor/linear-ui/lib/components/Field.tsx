import { cn } from "@/lib/utils/cn";

/**
 * Field — the standard form-row wrapper: label, control, help text, and an
 * error slot that replaces the help text when present.
 *
 *   <Field>
 *     <FieldLabel htmlFor="name">Name</FieldLabel>
 *     <Input id="name" />
 *     <FieldDescription>Shown on your public profile.</FieldDescription>
 *   </Field>
 */
export function Field({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "flex gap-1.5",
        orientation === "vertical"
          ? "flex-col"
          : "flex-row items-center justify-between gap-6",
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-text-primary select-none", className)}
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-text-secondary", className)} {...props} />;
}

export function FieldError({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null;
  return (
    <p role="alert" className={cn("text-xs text-danger", className)} {...props}>
      {children}
    </p>
  );
}

export function FieldGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-5", className)} {...props} />;
}
