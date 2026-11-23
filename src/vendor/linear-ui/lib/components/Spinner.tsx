import { cn } from "@/lib/utils/cn";

const sizes = { sm: "size-3.5", md: "size-4", lg: "size-5", xl: "size-8" } as const;

/** Spinner — an indeterminate loading indicator. Inherits `currentColor`. */
export function Spinner({
  className,
  size = "md",
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: keyof typeof sizes }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn("shrink-0 animate-spin text-current", sizes[size], className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-20"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
