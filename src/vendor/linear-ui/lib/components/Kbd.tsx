import { cn } from "@/lib/utils/cn";

/**
 * Kbd — the keyboard-hint chip Linear scatters through menus and settings.
 * Pass keys as children; multiple <Kbd> in a row read as a chord.
 */
export function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-xs border border-border-subtle",
        "bg-bg-tertiary px-1 font-sans text-2xs font-medium text-text-secondary",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
