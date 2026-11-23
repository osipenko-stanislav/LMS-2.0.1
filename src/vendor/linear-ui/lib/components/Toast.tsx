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
  return (
    <SonnerToaster
      theme={theme}
      position="bottom-right"
      gap={8}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-md !border !border-border !bg-bg-elevated !text-text-primary !shadow-popover !text-sm !font-sans",
          description: "!text-text-secondary",
          actionButton:
            "!bg-accent !text-white !rounded-sm !text-xs !font-medium !h-6 !px-2",
          cancelButton:
            "!bg-fill-hover !text-text-secondary !rounded-sm !text-xs !h-6 !px-2",
          icon: "!size-4",
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
