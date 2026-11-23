import { Button, Kbd } from "@/lib";
import { Page } from "../ui";

const CARDS = [
  {
    id: "tokens",
    title: "Design tokens",
    body: "Surfaces, text, borders, the #1664FF accent ramp, radius, shadows and the type scale — semantic vars that flip between light and dark.",
  },
  {
    id: "icons",
    title: "Icons",
    body: "Hugeicons, wrapped in an <Icon> primitive tuned to Linear's UI. Browse and copy names.",
  },
  {
    id: "button",
    title: "Primitives",
    body: "Button, Input, Checkbox, Radio, Switch, Select, Segmented control, Badge, Avatar, Kbd, Tooltip — each on its own page.",
  },
  {
    id: "table",
    title: "Complex components",
    body: "Dropdown menu, Tabs, Dialog and a full data Table with selection and sorting.",
  },
  {
    id: "preferences",
    title: "Preferences screen",
    body: "A full recreation of Linear's account preferences screen, assembled from the library.",
  },
];

export function Overview({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <Page
      title="Linear UI"
      lead="A React + TypeScript + Tailwind v4 component library whose visual language is modeled as closely as possible on Linear — calibrated against the app shell and the Settings › Preferences screen."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id)}
            className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface-app/60 p-5 text-left transition-colors hover:bg-fill-hover"
          >
            <span className="text-sm font-semibold">{card.title}</span>
            <span className="text-xs text-text-secondary">{card.body}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border-subtle bg-surface-app/60 p-5">
        <p className="text-xs font-medium text-text-tertiary">Run locally</p>
        <pre className="mt-2 overflow-x-auto font-mono text-xs text-text-secondary">
          npm install{"\n"}npm run dev
        </pre>
        <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
          Force a scheme with <Kbd>?theme=light</Kbd> or <Kbd>?theme=dark</Kbd>,
          or use the switch below the sidebar.
        </p>
        <div className="mt-4">
          <Button variant="primary" onClick={() => onNavigate("button")}>
            Browse components
          </Button>
        </div>
      </div>
    </Page>
  );
}
