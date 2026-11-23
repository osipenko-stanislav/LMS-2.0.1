import { cn } from "@/lib/utils/cn";

export type ThemeChoice = "system" | "light" | "dark";

/**
 * ThemePicker — the "Interface theme" control from Linear's Preferences.
 * Three cards, each a miniature window mock, selected state marked with an
 * accent border + ring.
 */
export function ThemePicker({
  value,
  onValueChange,
  className,
}: {
  value: ThemeChoice;
  onValueChange: (value: ThemeChoice) => void;
  className?: string;
}) {
  const options: { value: ThemeChoice; label: string; scheme: "light" | "dark" | "split" }[] =
    [
      { value: "system", label: "System", scheme: "split" },
      { value: "light", label: "Light", scheme: "light" },
      { value: "dark", label: "Dark", scheme: "dark" },
    ];

  return (
    <div
      role="radiogroup"
      aria-label="Interface theme"
      className={cn("flex gap-3", className)}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onValueChange(opt.value)}
            className={cn(
              "group flex w-[104px] flex-col gap-2 rounded-lg border p-1.5 text-left",
              "transition-colors duration-[var(--ease-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--ring)]",
              active
                ? "border-accent bg-accent-subtle"
                : "border-border hover:bg-fill-hover",
            )}
          >
            <ThemeThumbnail scheme={opt.scheme} />
            <span className="flex items-center gap-1.5 px-1 pb-0.5">
              <span
                className={cn(
                  "size-3 rounded-full border transition-colors",
                  active
                    ? "border-accent bg-accent"
                    : "border-border-strong bg-transparent",
                )}
              >
                {active && (
                  <span className="block size-full scale-[0.4] rounded-full bg-white" />
                )}
              </span>
              <span className="text-xs font-medium text-text-primary">
                {opt.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ThemeThumbnail({ scheme }: { scheme: "light" | "dark" | "split" }) {
  const light = (
    <div className="flex h-full w-full bg-[#ffffff]">
      <div className="h-full w-1/3 bg-[#f4f5f7]" />
      <div className="flex flex-1 flex-col gap-1 p-1.5">
        <div className="h-1 w-3/4 rounded-full bg-[#d5d7dd]" />
        <div className="h-1 w-1/2 rounded-full bg-[#e3e4e9]" />
        <div className="h-1 w-2/3 rounded-full bg-[#e3e4e9]" />
      </div>
    </div>
  );
  const dark = (
    <div className="flex h-full w-full bg-[#08090a]">
      <div className="h-full w-1/3 bg-[#141517]" />
      <div className="flex flex-1 flex-col gap-1 p-1.5">
        <div className="h-1 w-3/4 rounded-full bg-[#33353a]" />
        <div className="h-1 w-1/2 rounded-full bg-[#212226]" />
        <div className="h-1 w-2/3 rounded-full bg-[#212226]" />
      </div>
    </div>
  );

  return (
    <div className="relative h-14 w-full overflow-hidden rounded-md border border-border">
      {scheme === "light" && light}
      {scheme === "dark" && dark}
      {scheme === "split" && (
        <div className="grid h-full w-full grid-cols-2">
          <div className="overflow-hidden">{light}</div>
          <div className="overflow-hidden border-l border-border">{dark}</div>
        </div>
      )}
    </div>
  );
}
