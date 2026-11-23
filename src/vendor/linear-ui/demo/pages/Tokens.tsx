import { useEffect, useState } from "react";
import { useTheme } from "@/lib";
import { Page, Row, Section, Swatch } from "../ui";

/** Reads resolved values of CSS custom properties, re-reading on theme change. */
function useResolvedTokens(names: string[]) {
  const { theme } = useTheme();
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const n of names) next[n] = style.getPropertyValue(n).trim();
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, names.join(",")]);
  return values;
}

const SURFACES = [
  ["App shell (desktop)", "--surface-app"],
  ["Content panel", "--surface-panel"],
  ["Base / cards", "--bg-primary"],
  ["Chrome / sidebar", "--bg-secondary"],
  ["Sunken well", "--bg-tertiary"],
  ["Elevated (menus)", "--bg-elevated"],
] as const;

const TEXT = [
  ["Primary", "--text-primary"],
  ["Secondary", "--text-secondary"],
  ["Tertiary", "--text-tertiary"],
  ["Disabled", "--text-disabled"],
] as const;

const BORDERS = [
  ["Subtle", "--border-subtle"],
  ["Default", "--border"],
  ["Strong", "--border-strong"],
] as const;

const ACCENT = [
  ["Accent", "--accent"],
  ["Accent hover", "--accent-hover"],
  ["Accent active", "--accent-active"],
  ["Accent subtle", "--accent-subtle-bg"],
] as const;

const STATUS = [
  ["Success", "--success"],
  ["Warning", "--warning"],
  ["Danger", "--danger"],
  ["Info", "--info"],
] as const;

const RADII = [
  ["xs", "--radius-xs"],
  ["sm", "--radius-sm"],
  ["md", "--radius-md"],
  ["lg", "--radius-lg"],
  ["xl", "--radius-xl"],
  ["2xl", "--radius-2xl"],
] as const;

const TYPE = [
  ["2xl · page title", "text-2xl", "--text-2xl"],
  ["xl", "text-xl", "--text-xl"],
  ["lg · section heading", "text-lg", "--text-lg"],
  ["md", "text-md", "--text-md"],
  ["sm · base UI text", "text-sm", "--text-sm"],
  ["xs", "text-xs", "--text-xs"],
  ["2xs · hints", "text-2xs", "--text-2xs"],
] as const;

export function Tokens() {
  const allNames = [
    ...SURFACES,
    ...TEXT,
    ...BORDERS,
    ...ACCENT,
    ...STATUS,
    ...RADII,
    ...TYPE.map((t) => [t[0], t[2]] as const),
  ].map(([, v]) => v);
  const resolved = useResolvedTokens(allNames);

  return (
    <Page
      title="Design tokens"
      lead="Semantic tokens calibrated against Linear. Values shown are resolved for the current theme — switch it in the sidebar to see them flip."
    >
      <Section title="Surfaces">
        <Row className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {SURFACES.map(([name, v]) => (
            <Swatch key={v} name={name} varName={v} value={resolved[v]} border />
          ))}
        </Row>
      </Section>

      <Section title="Text">
        <Row className="grid grid-cols-2 gap-4">
          {TEXT.map(([name, v]) => (
            <Swatch key={v} name={name} varName={v} value={resolved[v]} />
          ))}
        </Row>
      </Section>

      <Section title="Borders">
        <Row className="grid grid-cols-3 gap-4">
          {BORDERS.map(([name, v]) => (
            <Swatch key={v} name={name} varName={v} value={resolved[v]} border />
          ))}
        </Row>
      </Section>

      <Section title="Accent & status">
        <Row label="Accent" className="grid grid-cols-2 gap-4">
          {ACCENT.map(([name, v]) => (
            <Swatch key={v} name={name} varName={v} value={resolved[v]} />
          ))}
        </Row>
        <Row label="Status" className="grid grid-cols-2 gap-4">
          {STATUS.map(([name, v]) => (
            <Swatch key={v} name={name} varName={v} value={resolved[v]} />
          ))}
        </Row>
      </Section>

      <Section title="Radius">
        <Row>
          {RADII.map(([name, v]) => (
            <div key={v} className="flex flex-col items-center gap-2">
              <div
                className="size-14 border border-border bg-bg-tertiary"
                style={{ borderRadius: `var(${v})` }}
              />
              <span className="font-mono text-2xs text-text-tertiary">
                {name} · {resolved[v]}
              </span>
            </div>
          ))}
        </Row>
      </Section>

      <Section title="Shadows">
        <Row className="bg-surface-panel">
          {(["shadow-xs", "shadow-sm", "shadow-md", "shadow-popover"] as const).map(
            (s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className={`size-16 rounded-lg bg-bg-elevated ${s}`} />
                <span className="font-mono text-2xs text-text-tertiary">{s}</span>
              </div>
            ),
          )}
        </Row>
      </Section>

      <Section title="Type scale" description="Inter, tight tracking, 13px base.">
        <Row className="flex-col items-start gap-4">
          {TYPE.map(([label, cls, v]) => (
            <div key={cls} className="flex items-baseline gap-4">
              <span className={`${cls} font-medium`}>The quick brown fox</span>
              <span className="font-mono text-2xs text-text-tertiary">
                {label} · {resolved[v]}
              </span>
            </div>
          ))}
        </Row>
      </Section>
    </Page>
  );
}
