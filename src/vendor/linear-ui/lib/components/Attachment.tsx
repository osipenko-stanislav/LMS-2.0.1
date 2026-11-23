import { forwardRef } from "react";
import { FileText, ImageIcon, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

function formatBytes(bytes?: number) {
  if (bytes == null) return null;
  const units = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let u = 0;
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024;
    u++;
  }
  return `${n.toFixed(n >= 10 || u === 0 ? 0 : 1)} ${units[u]}`;
}

export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: number;
  type?: "file" | "image";
  /** Show a remove button; called on click. */
  onRemove?: () => void;
}

/**
 * Attachment — a compact chip for an attached file: type glyph, name, size and
 * an optional remove button.
 */
export const Attachment = forwardRef<HTMLDivElement, AttachmentProps>(
  ({ className, name, size, type = "file", onRemove, ...props }, ref) => {
    const Glyph = type === "image" ? ImageIcon : name ? FileText : Paperclip;
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex max-w-full items-center gap-2 rounded-md border border-border bg-bg-primary py-1 pr-1 pl-2 text-sm",
          className,
        )}
        {...props}
      >
        <Glyph className="size-4 shrink-0 text-text-tertiary" />
        <span className="truncate text-text-primary">{name}</span>
        {formatBytes(size) && (
          <span className="shrink-0 text-xs text-text-tertiary">
            {formatBytes(size)}
          </span>
        )}
        {onRemove && (
          <button
            type="button"
            aria-label={`Remove ${name}`}
            onClick={onRemove}
            className="grid size-5 shrink-0 place-items-center rounded-xs text-text-tertiary transition-colors hover:bg-fill-hover hover:text-text-primary"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    );
  },
);
Attachment.displayName = "Attachment";
