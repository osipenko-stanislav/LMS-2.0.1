import { useMemo, useState } from "react";
import {
  Add01Icon,
  AiMagicIcon,
  Alert02Icon,
  AnalyticsUpIcon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Attachment01Icon,
  Bookmark02Icon,
  Building03Icon,
  Calendar03Icon,
  Cancel01Icon,
  Chart01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  ColorsIcon,
  CommandIcon,
  ComputerIcon,
  Copy01Icon,
  CreditCardIcon,
  DashboardSquare02Icon,
  Delete02Icon,
  Download04Icon,
  FavouriteIcon,
  File02Icon,
  FilterIcon,
  Flag02Icon,
  Folder01Icon,
  Github01Icon,
  GridIcon,
  Home09Icon,
  Image02Icon,
  InformationCircleIcon,
  KeyboardIcon,
  LabelIcon,
  Layers01Icon,
  Link01Icon,
  ListViewIcon,
  Logout03Icon,
  Mail01Icon,
  Menu01Icon,
  MinusSignIcon,
  Moon02Icon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Notification03Icon,
  PaintBoardIcon,
  PencilEdit02Icon,
  PinIcon,
  RadioIcon,
  Rocket01Icon,
  Search01Icon,
  Settings01Icon,
  Share08Icon,
  SmartPhone01Icon,
  Sparkles,
  StarIcon,
  Sun03Icon,
  Tag01Icon,
  Task01Icon,
  TextFontIcon,
  Tick02Icon,
  Time04Icon,
  ToggleOnIcon,
  Upload04Icon,
  UserGroupIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { Icon, Input, SegmentedControl } from "@/lib";
import { Page, Row, Section } from "../ui";

const CATALOG: Record<string, IconSvgElement> = {
  Home09Icon, Search01Icon, Settings01Icon, UserIcon, UserGroupIcon,
  Notification03Icon, Mail01Icon, Calendar03Icon, Time04Icon, Clock01Icon,
  Tick02Icon, CheckmarkCircle02Icon, Cancel01Icon, Alert02Icon, InformationCircleIcon,
  Add01Icon, MinusSignIcon, PencilEdit02Icon, Delete02Icon, Copy01Icon,
  Share08Icon, Link01Icon, Download04Icon, Upload04Icon, Bookmark02Icon,
  StarIcon, FavouriteIcon, Flag02Icon, PinIcon, Folder01Icon,
  File02Icon, Attachment01Icon, Image02Icon, Task01Icon, ArrowUp01Icon,
  ArrowDown01Icon, ArrowLeft01Icon, ArrowRight01Icon, ArrowUpRight01Icon, MoreHorizontalIcon,
  MoreVerticalIcon, Menu01Icon, GridIcon, ListViewIcon, DashboardSquare02Icon,
  Chart01Icon, AnalyticsUpIcon, Layers01Icon, FilterIcon, Sun03Icon,
  Moon02Icon, ComputerIcon, SmartPhone01Icon, Rocket01Icon, Sparkles,
  AiMagicIcon, CommandIcon, KeyboardIcon, Github01Icon, Tag01Icon,
  LabelIcon, CreditCardIcon, Building03Icon, Logout03Icon, PaintBoardIcon,
  ColorsIcon, TextFontIcon, ToggleOnIcon, RadioIcon,
};

export function Icons() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState<"16" | "20" | "24">("20");
  const [copied, setCopied] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.keys(CATALOG).filter((n) => n.toLowerCase().includes(q));
  }, [query]);

  const copy = (name: string) => {
    navigator.clipboard?.writeText(name).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied((c) => (c === name ? null : c)), 1200);
  };

  return (
    <Page
      title="Icons"
      lead="The library's icon set is Hugeicons. Use the <Icon> primitive with any export from @hugeicons/core-free-icons — it applies the design-system defaults (18px, 1.8 stroke, currentColor)."
    >
      <Section title="Usage">
        <Row className="block">
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-text-secondary">
{`import { Icon } from "linear-ui";
import { Search01Icon } from "@hugeicons/core-free-icons";

<Icon icon={Search01Icon} className="text-text-tertiary" />
<Icon icon={Search01Icon} size={24} strokeWidth={2} />`}
          </pre>
        </Row>
      </Section>

      <Section
        title="Browse"
        description={`A curated ${Object.keys(CATALOG).length} of the ~2,600 free icons. The full set is a named import away.`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Input
            className="w-64"
            leadingIcon={<Icon icon={Search01Icon} />}
            placeholder="Filter…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SegmentedControl
            aria-label="Preview size"
            size="sm"
            value={size}
            onValueChange={setSize}
            items={[
              { value: "16", label: "16" },
              { value: "20", label: "20" },
              { value: "24", label: "24" },
            ]}
          />
        </div>

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-1.5">
          {list.map((name) => (
            <button
              key={name}
              onClick={() => copy(name)}
              title={`${name} — click to copy the name`}
              className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface-app/60 p-2 transition-colors hover:border-border hover:bg-fill-hover"
            >
              <span className="text-text-primary">
                {copied === name ? (
                  <Icon icon={Tick02Icon} size={Number(size)} className="text-success" />
                ) : (
                  <Icon icon={CATALOG[name]} size={Number(size)} />
                )}
              </span>
              <span className="w-full truncate text-center text-2xs text-text-tertiary group-hover:text-text-secondary">
                {copied === name ? "Copied!" : name.replace(/Icon$/, "")}
              </span>
            </button>
          ))}
          {list.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-text-tertiary">
              Nothing matches “{query}”.
            </p>
          )}
        </div>
      </Section>
    </Page>
  );
}
