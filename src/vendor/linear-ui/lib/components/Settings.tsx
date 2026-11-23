import { cn } from "@/lib/utils/cn";

/**
 * Settings layout primitives — the scaffolding of Linear's Settings screens.
 *
 *   <SettingsPage title="Preferences" description="…">
 *     <SettingsSection title="General">
 *       <SettingRow title="Interface theme" description="…">
 *         <ThemePicker … />
 *       </SettingRow>
 *       <SettingRow title="Display language" description="…">
 *         <Select … />
 *       </SettingRow>
 *     </SettingsSection>
 *   </SettingsPage>
 */

export function SettingsPage({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--settings-content-width)] px-6 py-16",
        className,
      )}
    >
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-[-0.012em] text-text-primary">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </header>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}

export function SettingsSection({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col", className)}>
      {(title || description) && (
        <div className="mb-1 flex flex-col gap-0.5">
          {title && (
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-text-secondary">{description}</p>
          )}
        </div>
      )}
      <div className="flex flex-col [&>*+*]:border-t [&>*+*]:border-border-subtle">
        {children}
      </div>
    </section>
  );
}

export function SettingRow({
  title,
  description,
  children,
  htmlFor,
  layout = "inline",
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  htmlFor?: string;
  /** `inline` keeps the control on the right; `stacked` drops it below. */
  layout?: "inline" | "stacked";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-6 py-4 first:pt-0 last:pb-0",
        layout === "inline"
          ? "items-center justify-between"
          : "flex-col items-stretch gap-3",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-text-primary"
        >
          {title}
        </label>
        {description && (
          <p className="text-xs text-text-secondary">{description}</p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}
