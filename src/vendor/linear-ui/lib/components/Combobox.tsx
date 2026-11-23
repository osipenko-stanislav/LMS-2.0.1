import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  width?: number | string;
  className?: string;
  "aria-label"?: string;
}

/**
 * Combobox — a Select whose menu has a text filter. Built on Popover + a
 * lightweight filtered list (keyboard: type to filter, ↑/↓ to move, Enter to
 * pick). Reach for `Command` when you need a full command palette.
 */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results.",
  disabled,
  width = 220,
  className,
  ...aria
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? options.filter((o) => o.label.toLowerCase().includes(q))
      : options;
  }, [options, query]);

  const selected = options.find((o) => o.value === value);

  const commit = (v: string) => {
    onValueChange?.(v);
    setOpen(false);
    setQuery("");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
        setActiveIndex(0);
      }}
    >
      <PopoverTrigger
        disabled={disabled}
        aria-label={aria["aria-label"]}
        style={{ width }}
        className={cn(
          "inline-flex items-center justify-between gap-2 rounded-md border border-border bg-control px-2.5 text-sm text-text-primary shadow-xs",
          "h-7 transition-colors hover:bg-control-hover",
          "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_var(--ring)] focus-visible:outline-none",
          "data-[state=open]:bg-control-hover disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
      >
        <span className={cn("truncate", !selected && "text-text-tertiary")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronsUpDown className="size-3.5 shrink-0 text-text-tertiary" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement)
            .querySelector<HTMLInputElement>("input")
            ?.focus();
        }}
      >
        <div className="flex items-center gap-1.5 border-b border-border-subtle px-2 focus-within:border-accent">
          <Search className="size-3.5 shrink-0 text-text-tertiary" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && filtered[activeIndex]) {
                e.preventDefault();
                commit(filtered[activeIndex].value);
              }
            }}
            placeholder={searchPlaceholder}
            className="h-8 w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:shadow-none"
          />
        </div>
        <div className="max-h-56 overflow-y-auto p-1">
          {filtered.length === 0 && (
            <p className="px-2 py-4 text-center text-sm text-text-tertiary">
              {emptyText}
            </p>
          )}
          {filtered.map((opt, i) => (
            <button
              key={opt.value}
              type="button"
              disabled={opt.disabled}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => commit(opt.value)}
              className={cn(
                "flex h-7 w-full items-center justify-between rounded-sm px-2 text-left text-sm text-text-primary",
                "disabled:pointer-events-none disabled:opacity-40",
                i === activeIndex && "bg-fill-hover",
              )}
            >
              <span className="truncate">{opt.label}</span>
              {opt.value === value && (
                <Check className="size-3.5 text-accent-subtle-text" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
