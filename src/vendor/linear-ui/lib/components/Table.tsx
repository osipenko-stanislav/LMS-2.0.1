import { forwardRef } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Table — Linear's dense data table. A bordered, rounded container; a muted
 * uppercase header row; body rows separated by hairlines that light up with
 * the translucent hover fill. `TableHead` can be `sortable` and show a
 * direction caret.
 */
export const Table = forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto rounded-lg border border-border">
    <table
      ref={ref}
      className={cn("w-full border-collapse text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-bg-secondary/60", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
));
TableBody.displayName = "TableBody";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <tr
    ref={ref}
    data-selected={selected || undefined}
    className={cn(
      "border-t border-border-subtle transition-colors first:border-t-0",
      "hover:bg-fill-hover data-[selected]:bg-fill-selected",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | false;
  onSort?: () => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-9 px-3 text-left align-middle text-xs font-medium text-text-tertiary",
        "first:pl-4 last:pr-4",
        className,
      )}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : undefined
      }
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className="-mx-1 flex items-center gap-1 rounded-xs px-1 py-0.5 hover:text-text-secondary focus-visible:outline-none focus-visible:text-text-secondary"
        >
          {children}
          {sortDirection === "asc" ? (
            <ChevronUp className="size-3" />
          ) : sortDirection === "desc" ? (
            <ChevronDown className="size-3" />
          ) : (
            <ChevronsUpDown className="size-3 opacity-50" />
          )}
        </button>
      ) : (
        children
      )}
    </th>
  ),
);
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "h-11 px-3 align-middle text-text-primary first:pl-4 last:pr-4",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";
