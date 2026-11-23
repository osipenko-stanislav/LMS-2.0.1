import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "./Button";

/**
 * Pagination — page navigation. Low-level parts (compose your own), plus a
 * ready-made <Pagination> that renders a windowed page list.
 */
export function PaginationRoot({ className, ...props }: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({
  active,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: active ? "secondary" : "ghost", size: "md", iconOnly: true }),
        !active && "text-text-secondary",
        className,
      )}
      {...props}
    />
  );
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Sibling pages shown either side of the current one. */
  siblings?: number;
  className?: string;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  className,
}: PaginationProps) {
  const start = Math.max(2, page - siblings);
  const end = Math.min(pageCount - 1, page + siblings);
  const items: (number | "…")[] = [1];
  if (start > 2) items.push("…");
  items.push(...range(start, end));
  if (end < pageCount - 1) items.push("…");
  if (pageCount > 1) items.push(pageCount);

  return (
    <PaginationRoot className={className}>
      <PaginationItem
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
      </PaginationItem>
      {items.map((it, i) =>
        it === "…" ? (
          <span
            key={`gap-${i}`}
            className="grid size-7 place-items-center text-text-tertiary"
          >
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <PaginationItem
            key={it}
            active={it === page}
            onClick={() => onPageChange(it)}
          >
            {it}
          </PaginationItem>
        ),
      )}
      <PaginationItem
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight />
      </PaginationItem>
    </PaginationRoot>
  );
}
