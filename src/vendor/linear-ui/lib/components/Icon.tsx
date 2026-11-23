import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";

/**
 * Icon — the library's icon primitive, wrapping Hugeicons with defaults tuned
 * to Linear's UI: 18px, 1.8 stroke, `currentColor`. Pass any icon from
 * `@hugeicons/core-free-icons`.
 *
 *   import { Icon } from "linear-ui";
 *   import { Search01Icon } from "@hugeicons/core-free-icons";
 *   <Icon icon={Search01Icon} className="text-text-tertiary" />
 */
export function Icon({
  size = 18,
  strokeWidth = 1.8,
  ...props
}: HugeiconsIconProps) {
  return <HugeiconsIcon size={size} strokeWidth={strokeWidth} {...props} />;
}
