import { cn } from "@/lib/utils/cn";

const sizes = { xs: "size-4 text-[9px]", sm: "size-5 text-2xs", md: "size-6 text-xs", lg: "size-8 text-sm" } as const;

/**
 * Avatar — small rounded-square identity chip. Falls back to initials on a
 * deterministic tinted background, matching Linear's member avatars.
 */
export function Avatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md font-semibold text-white select-none",
        sizes[size],
        className,
      )}
      style={
        src ? undefined : { backgroundColor: `oklch(0.62 0.15 ${hue})` }
      }
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}
