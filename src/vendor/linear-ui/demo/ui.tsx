import { cn } from "@/lib/utils/cn";

/** Playground-local presentation helpers (not part of the library). */

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface PageMeta {
  title: string;
  /** One or two sentences: what it is and when to use it. */
  lead?: string;
  /** Import statement shown as a code pill in the header. */
  importLine?: string;
  /** e.g. "@radix-ui/react-dialog" — renders a "Built on Radix" note. */
  radix?: string;
  /** Key props, rendered as a reference table after the examples. */
  props?: PropRow[];
  /** Usage guidance, rendered as do / don't lists at the foot of the page. */
  guidelines?: { do?: string[]; dont?: string[] };
  /** Content column width. "wide" and "full" suit tables and app screens. */
  width?: "default" | "wide" | "full";
  children: React.ReactNode;
}

const WIDTHS = {
  default: "max-w-3xl",
  wide: "max-w-5xl",
  full: "max-w-none",
} as const;

export function Page({
  title,
  lead,
  importLine,
  radix,
  props,
  guidelines,
  width = "default",
  children,
}: PageMeta) {
  return (
    <div className={cn("mx-auto w-full px-8 py-14", WIDTHS[width])}>
      <header className="mb-9 flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-[-0.012em]">{title}</h1>
        {lead && (
          <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
            {lead}
          </p>
        )}
        {(importLine || radix) && (
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {importLine && (
              <code className="rounded-sm border border-border-subtle bg-surface-app/70 px-2 py-1 font-mono text-xs text-text-secondary">
                {importLine}
              </code>
            )}
            {radix && (
              <span className="inline-flex items-center gap-1 rounded-sm border border-border-subtle px-2 py-1 text-2xs text-text-tertiary">
                Built on <span className="text-text-secondary">{radix}</span>
              </span>
            )}
          </div>
        )}
      </header>

      <div className="flex flex-col">{children}</div>

      {props && props.length > 0 && (
        <Section title="Props" description="The props this component adds on top of its native / Radix element.">
          <PropsTable rows={props} />
        </Section>
      )}

      {guidelines && (guidelines.do?.length || guidelines.dont?.length) ? (
        <Section title="Guidelines">
          <div className="grid gap-4 sm:grid-cols-2">
            {guidelines.do && (
              <GuidelineList tone="do" items={guidelines.do} />
            )}
            {guidelines.dont && (
              <GuidelineList tone="dont" items={guidelines.dont} />
            )}
          </div>
        </Section>
      ) : null}
    </div>
  );
}

export function Section({
  title,
  description,
  variants,
  children,
}: {
  title: string;
  description?: string;
  variants?: { name: string; description: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-border-subtle py-8 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && (
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
      {variants && variants.length > 0 && (
        <dl className="mt-4 flex flex-col gap-2 rounded-lg border border-border-subtle bg-surface-app/50 p-4 text-sm">
          {variants.map((v) => (
            <div key={v.name} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="w-32 shrink-0 font-mono text-xs text-text-primary">
                {v.name}
              </dt>
              <dd className="text-text-secondary">{v.description}</dd>
            </div>
          ))}
        </dl>
      )}
      {children && <div className="mt-5 flex flex-col gap-6">{children}</div>}
    </section>
  );
}

export function Row({
  label,
  hint,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {(label || hint) && (
        <div className="flex items-baseline gap-2">
          {label && (
            <span className="text-xs font-medium text-text-tertiary">{label}</span>
          )}
          {hint && <span className="text-2xs text-text-tertiary/80">{hint}</span>}
        </div>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center gap-3 rounded-lg border border-border-subtle bg-surface-app/60 p-4",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-border-subtle bg-surface-app/60 p-4 font-mono text-xs leading-relaxed text-text-secondary",
        className,
      )}
    >
      {children}
    </pre>
  );
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-surface-app/60 text-xs text-text-tertiary">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Prop</th>
            <th className="px-3 py-2 text-left font-medium">Type</th>
            <th className="px-3 py-2 text-left font-medium">Default</th>
            <th className="px-3 py-2 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-border-subtle align-top">
              <td className="px-3 py-2 font-mono text-xs text-text-primary">
                {r.name}
              </td>
              <td className="px-3 py-2 font-mono text-2xs text-accent-subtle-text">
                {r.type}
              </td>
              <td className="px-3 py-2 font-mono text-2xs text-text-tertiary">
                {r.default ?? "—"}
              </td>
              <td className="px-3 py-2 text-text-secondary">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GuidelineList({
  tone,
  items,
}: {
  tone: "do" | "dont";
  items: string[];
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        tone === "do"
          ? "border-[color-mix(in_srgb,var(--success)_30%,transparent)] bg-[color-mix(in_srgb,var(--success)_7%,transparent)]"
          : "border-[color-mix(in_srgb,var(--danger)_30%,transparent)] bg-[color-mix(in_srgb,var(--danger)_7%,transparent)]",
      )}
    >
      <p
        className={cn(
          "mb-2 text-xs font-semibold tracking-wide uppercase",
          tone === "do" ? "text-success" : "text-danger",
        )}
      >
        {tone === "do" ? "Do" : "Don't"}
      </p>
      <ul className="flex flex-col gap-1.5 text-sm text-text-secondary">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span
              className={cn(
                "mt-1.5 size-1 shrink-0 rounded-full",
                tone === "do" ? "bg-success" : "bg-danger",
              )}
            />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Swatch({
  name,
  varName,
  value,
  border,
}: {
  name: string;
  varName: string;
  value?: string;
  border?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "size-9 shrink-0 rounded-md",
          border ? "border border-border" : "shadow-xs",
        )}
        style={{ background: `var(${varName})` }}
      />
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-medium">{name}</span>
        <span className="truncate font-mono text-2xs text-text-tertiary">
          {varName}
          {value ? ` · ${value}` : ""}
        </span>
      </div>
    </div>
  );
}
