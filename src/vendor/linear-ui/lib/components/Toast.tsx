import { useEffect, useState } from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { useTheme } from "@/lib/hooks/useTheme";

/**
 * Toast — transient notifications, powered by
 * [sonner](https://sonner.emilkowal.ski). Mount <Toaster /> once near the root,
 * then call `toast(...)` / `toast.success(...)` / `toast.error(...)` anywhere.
 */
export { toast };

export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  const { theme } = useTheme();
  const [topOffset, setTopOffset] = useState(16);
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-shell-header]");
    if (!header) return;
    const measure = () => setTopOffset(Math.max(16, header.getBoundingClientRect().bottom + 12));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  return (
    <SonnerToaster
      theme={theme}
      position="top-right"
      offset={{ top: topOffset, right: 16 }}
      mobileOffset={{ top: topOffset, right: 16, left: 16 }}
      gap={8}
      toastOptions={{
        classNames: {
          toast:
            "!box-border !flex !h-16 !items-center !gap-3 !rounded-lg !border !px-3.5 !py-3 !text-sm !font-sans !text-text-primary !shadow-popover [&:has([data-description])]:!items-start [&:has([data-description])_[data-icon]]:!translate-y-0.5",
          description: "!mt-0.5 !line-clamp-2 !text-text-secondary",
          success:
            "!border-transparent !bg-[color-mix(in_srgb,var(--success)_12%,var(--bg-elevated))] [&_[data-icon]]:!text-success",
          error:
            "!border-transparent !bg-[color-mix(in_srgb,var(--danger)_12%,var(--bg-elevated))] [&_[data-icon]]:!text-danger",
          info:
            "!border-transparent !bg-accent-subtle [&_[data-icon]]:!text-accent-subtle-text",
          warning:
            "!border-transparent !bg-[color-mix(in_srgb,var(--warning)_14%,var(--bg-elevated))] [&_[data-icon]]:!text-warning",
          actionButton:
            "!bg-accent !text-white !rounded-sm !text-xs !font-medium !h-6 !px-2",
          cancelButton:
            "!bg-fill-hover !text-text-secondary !rounded-sm !text-xs !h-6 !px-2",
          closeButton:
            "!right-2 !top-2 !border-0 !bg-transparent !text-text-tertiary hover:!bg-fill-hover hover:!text-text-primary",
          icon: "!size-4 !shrink-0 !translate-y-0",
        },
      }}
      style={
        {
          "--normal-bg": "var(--bg-elevated)",
          "--normal-text": "var(--text-primary)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
