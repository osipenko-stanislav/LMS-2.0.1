import { useMemo, useState } from "react";
import {
  AiChat01Icon,
  AiMagicIcon,
  Alert01Icon,
  Alert02Icon,
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowDataTransferHorizontalIcon,
  ArrowUpRight01Icon,
  Attachment02Icon,
  BorderAll01Icon,
  CheckmarkSquare03Icon,
  CircleArrowRight01Icon,
  CommandIcon,
  Copy01Icon,
  CursorInfo01Icon,
  CursorPointer01Icon,
  DashboardSquare02Icon,
  Delete02Icon,
  FrameworksIcon,
  GridIcon,
  Home09Icon,
  IdIcon,
  LabelIcon,
  LabelImportantIcon,
  Layers01Icon,
  LayersIcon,
  LayoutRightIcon,
  LeftToRightListNumberIcon,
  LinkForwardIcon,
  LoginSquare01Icon,
  ListViewIcon,
  Loading03Icon,
  Menu09Icon,
  MenuCollapseIcon,
  MenuSquareIcon,
  MoreHorizontalCircle01Icon,
  MoreHorizontalIcon,
  Navigation03Icon,
  Note01Icon,
  PaintBoardIcon,
  ParagraphIcon,
  PencilEdit02Icon,
  RadioIcon,
  Search01Icon,
  Settings01Icon,
  SidebarLeft01Icon,
  SidebarRight01Icon,
  SlidersHorizontalIcon,
  SquareArrowDataTransferHorizontalIcon,
  SquareArrowExpand01Icon,
  Table01Icon,
  TextAlignLeft01Icon,
  TextFontIcon,
  TextIcon,
  Tick01Icon,
  Tick02Icon,
  ToggleOnIcon,
  UserCircleIcon,
  UserGroupIcon,
  WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons";
import type { NavGroup } from "./nav-types";
import {
  AccordionPage,
  AlertDialogPage,
  AlertPage,
  AspectRatioPage,
  AttachmentPage,
  BreadcrumbPage_,
  ButtonGroupPage,
  CardPage,
  CollapsiblePage,
  ComboboxPage,
  ContextMenuPage,
  DirectionPage,
  EmptyPage,
  FieldPage,
  HoverCardPage,
  InputGroupPage,
  ItemPage,
  LabelPage,
  MenubarPage,
  NativeSelectPage,
  NavigationMenuPage,
  PaginationPage,
  PopoverPage,
  ProgressPage,
  ScrollAreaPage,
  SeparatorPage,
  SheetPage,
  SkeletonPage,
  SliderPage,
  SpinnerPage,
  TextareaPage,
  ToastPage,
  TogglePage,
  ToggleGroupPage,
} from "./catalog-more";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Input,
  Kbd,
  Radio,
  RadioGroup,
  SegmentedControl,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ThemePicker,
  Tooltip,
  type ThemeChoice,
} from "@/lib";
import { Page, Row, Section } from "./ui";
import { Icons } from "./pages/Icons";
import { Overview } from "./pages/Overview";
import { Tokens } from "./pages/Tokens";
import { PreferencesExample } from "./pages/PreferencesExample";
import { DialogShowcase } from "./pages/DialogShowcase";
import { SidebarShowcase } from "./pages/SidebarShowcase";
import { UsersTableExample } from "./pages/UsersTableExample";
import { LoginExample } from "./pages/LoginExample";

const LANGS = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
];

/* -------------------------------------------------------------------------- */
/*  Primitive demos                                                            */
/* -------------------------------------------------------------------------- */

function ButtonPage() {
  return (
    <Page
      title="Button"
      lead="Triggers an action or navigates. Every screen should have at most one primary button in view — everything else is secondary, subtle or ghost."
      importLine='import { Button } from "linear-ui"'
      props={[
        { name: "variant", type: '"primary" | "secondary" | "subtle" | "ghost" | "danger" | "link"', default: '"secondary"', description: "Visual weight — see the variant list below." },
        { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Heights 24 / 28 / 32 / 40px." },
        { name: "iconOnly", type: "boolean", default: "false", description: "Square button for a lone icon — requires aria-label." },
      ]}
      guidelines={{
        do: [
          "Use one primary button per view; make it the most likely next action.",
          "Give icon-only buttons an aria-label and usually a Tooltip.",
          "Lead with a verb — “Create issue”, not “Issue”.",
        ],
        dont: [
          "Don't put two primary buttons side by side — demote one to secondary.",
          "Don't use danger for anything reversible; it's for destructive actions.",
          "Don't disable a button without a way for the user to learn why.",
        ],
      }}
    >
      <Section
        title="Variants"
        variants={[
          { name: "primary", description: "The one main action. Filled with the accent color." },
          { name: "secondary", description: "The default. Neutral fill with a 1px stroke — most buttons." },
          { name: "subtle", description: "Low-emphasis fill, no border. Toolbars and dense rows." },
          { name: "ghost", description: "Transparent until hover. Icon buttons, table row actions." },
          { name: "danger", description: "Destructive, irreversible actions only." },
          { name: "link", description: "Inline text action; no padding, underlines on hover." },
        ]}
      >
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="link">Link</Button>
        </Row>
      </Section>
      <Section title="Sizes" description="md is the default. sm for dense UI (table rows, toolbars); xl for marketing / empty-state CTAs.">
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra large</Button>
        </Row>
      </Section>
      <Section title="With icons, icon-only, disabled" description="Icons sit 16px and inherit the label color. Icon-only buttons take an aria-label.">
        <Row>
          <Button variant="primary">
            <Icon icon={Tick02Icon} /> Mark done
          </Button>
          <Button variant="secondary">
            Open <Icon icon={ArrowUpRight01Icon} />
          </Button>
          <Button variant="ghost" iconOnly aria-label="More">
            <Icon icon={MoreHorizontalIcon} />
          </Button>
          <Button variant="secondary" iconOnly aria-label="Edit">
            <Icon icon={PencilEdit02Icon} />
          </Button>
          <Button disabled>Disabled</Button>
        </Row>
      </Section>
    </Page>
  );
}

function InputPage() {
  return (
    <Page
      title="Input"
      lead="A single-line text field. Pairs with Label and Field for a full form row; use InputGroup when you need addons, and Textarea for multi-line."
      importLine='import { Input } from "linear-ui"'
      props={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Heights 28 / 32 / 36px." },
        { name: "leadingIcon", type: "ReactNode", description: "Rendered inside the field on the left — typically a search glyph." },
        { name: "invalid", type: "boolean", default: "false", description: "Red border + red focus ring. Pair with a Field error message." },
      ]}
      guidelines={{
        do: [
          "Always attach a Label (visible or aria-label) — placeholders are not labels.",
          "Set the right type / inputMode (email, url, tel) for better keyboards.",
          "Show validation errors below the field, not only via the red border.",
        ],
        dont: [
          "Don't use a placeholder to explain the field — that text vanishes on focus.",
          "Don't make the field narrower than its expected content.",
        ],
      }}
    >
      <Section title="Sizes">
        <Row>
          <Input size="sm" placeholder="Small" />
          <Input size="md" placeholder="Medium" />
          <Input size="lg" placeholder="Large" />
        </Row>
      </Section>
      <Section title="States" description="Focus turns the stroke accent-blue and adds a soft ring. invalid swaps both to red.">
        <Row>
          <Input leadingIcon={<Icon icon={Search01Icon} />} placeholder="Search issues…" />
          <Input invalid defaultValue="not-an-email" />
          <Input disabled placeholder="Disabled" />
        </Row>
      </Section>
    </Page>
  );
}

function CheckboxPage() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(
    "indeterminate",
  );
  return (
    <Page
      title="Checkbox"
      lead="A binary (or tri-state) choice that isn't mutually exclusive. Use a Radio group when exactly one option must be chosen, and a Switch when the change takes effect immediately."
      importLine='import { Checkbox } from "linear-ui"'
      radix="@radix-ui/react-checkbox"
      props={[
        { name: "checked / defaultChecked", type: 'boolean | "indeterminate"', description: "Controlled / uncontrolled state. “indeterminate” shows a dash." },
        { name: "onCheckedChange", type: "(checked) => void", description: "Fires with the next state." },
        { name: "label / description", type: "ReactNode", description: "Renders the standard label + helper-text row; omit both for a bare box (tables)." },
      ]}
      guidelines={{
        do: [
          "Use “indeterminate” for a parent that governs a partially-selected set.",
          "Keep labels short and positive — “Send weekly digest”, not “Don't hide digest”.",
        ],
        dont: [
          "Don't use a checkbox for an instant setting — that's a Switch.",
          "Don't rely on the label alone to toggle in a table; give the row its own affordance.",
        ],
      }}
    >
      <Section title="States">
        <Row>
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" checked="indeterminate" />
          <Checkbox label="Disabled" disabled />
        </Row>
      </Section>
      <Section title="With description">
        <Row className="flex-col items-start">
          <Checkbox
            label="Enable weekly digest"
            description="A Monday summary of everything assigned to you."
            defaultChecked
          />
        </Row>
      </Section>
      <Section title="Controlled / tri-state" description="A “select all” checkbox reads indeterminate when only some children are checked.">
        <Row>
          <Checkbox
            label="Select all"
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
          />
          <Button
            size="sm"
            variant="subtle"
            onClick={() => setChecked("indeterminate")}
          >
            Reset to indeterminate
          </Button>
        </Row>
      </Section>
    </Page>
  );
}

function RadioPage() {
  const [value, setValue] = useState("full");
  return (
    <Page
      title="Radio group"
      lead="Pick exactly one option from a short, visible list. For more than ~6 options use a Select; for an immediate binary choice use a Switch."
      importLine='import { RadioGroup, Radio } from "linear-ui"'
      props={[
        { name: "RadioGroup · value / onValueChange", type: "string / fn", description: "The selected option's value." },
        { name: "Radio · value", type: "string", description: "Required. Identifies the option." },
        { name: "Radio · label / description", type: "ReactNode", description: "Option label and optional helper line." },
      ]}
      guidelines={{
        do: [
          "Always have one option selected by default — never render an empty group.",
          "Order options logically (frequency, or low→high), not alphabetically.",
        ],
        dont: [
          "Don't use a radio group for two on/off states — use a Switch or Checkbox.",
          "Don't hide options behind “Show more” — if the list is that long, use a Select.",
        ],
      }}
    >
      <Section title="Vertical group">
        <Row>
          <RadioGroup value={value} onValueChange={setValue}>
            <Radio value="full" label="Full names" description="Show first and last name." />
            <Radio value="username" label="Usernames" description="Show the shorter @handle." />
            <Radio value="hidden" label="Hidden" description="Don't show names at all." disabled />
          </RadioGroup>
        </Row>
      </Section>
    </Page>
  );
}

function SwitchPage() {
  const [on, setOn] = useState(true);
  return (
    <Page
      title="Switch"
      lead="Toggles a setting that takes effect immediately, with no Save button. If the change needs confirming or submitting, use a Checkbox instead."
      importLine='import { Switch } from "linear-ui"'
      props={[
        { name: "checked / defaultChecked", type: "boolean", description: "Controlled / uncontrolled. It's a real checkbox input under the hood." },
        { name: "size", type: '"sm" | "md"', default: '"md"', description: "20px or 16px tall track." },
        { name: "label", type: "string", description: "Optional inline label to the right of the track." },
      ]}
      guidelines={{
        do: [
          "Apply the change the instant it's toggled; show a toast if it's not obviously reflected.",
          "Phrase the label as the enabled state — “Reduce motion”, not “Motion”.",
        ],
        dont: [
          "Don't pair a switch with a Save button — that's what checkboxes are for.",
          "Don't use switches for more than two states.",
        ],
      }}
    >
      <Section title="States">
        <Row>
          <Switch label="Off" />
          <Switch label="On" defaultChecked />
          <Switch label="Disabled" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
        </Row>
      </Section>
      <Section title="Sizes">
        <Row>
          <Switch size="sm" label="Small" defaultChecked />
          <Switch size="md" label="Medium" defaultChecked />
        </Row>
      </Section>
      <Section title="Controlled">
        <Row>
          <Switch
            label={on ? "Notifications on" : "Notifications off"}
            checked={on}
            onChange={(e) => setOn(e.target.checked)}
          />
        </Row>
      </Section>
    </Page>
  );
}

function SelectPage() {
  return (
    <Page
      title="Select"
      lead="Choose one option from a list that's too long or space-consuming for a Radio group. The trigger reads like a secondary button; the menu is an elevated surface with a trailing check. Add a filter with Combobox; use NativeSelect on mobile-heavy forms."
      importLine='import { Select } from "linear-ui"'
      radix="@radix-ui/react-select"
      props={[
        { name: "options", type: "{ value, label, disabled? }[]", description: "The menu items." },
        { name: "value / defaultValue / onValueChange", type: "string / fn", description: "Controlled or uncontrolled selection." },
        { name: "size", type: '"sm" | "md"', default: '"md"', description: "Trigger height." },
        { name: "width", type: "number | string", description: "Trigger width; the menu matches it." },
        { name: "placeholder", type: "ReactNode", description: "Shown until something is selected." },
      ]}
      guidelines={{
        do: [
          "Give it an aria-label or a visible Label.",
          "Keep option labels to a couple of words; put detail in the row, not the label.",
          "Set a sensible default rather than forcing a placeholder choice.",
        ],
        dont: [
          "Don't use Select for 2–4 visible options — a Radio group or Segmented control is faster.",
          "Don't nest a Select trigger inside another clickable row.",
        ],
      }}
    >
      <Section title="Sizes & states">
        <Row>
          <Select aria-label="Language" width={170} defaultValue="en" options={LANGS} />
          <Select aria-label="Language small" size="sm" width={150} defaultValue="es" options={LANGS} />
          <Select aria-label="Language disabled" width={170} disabled placeholder="Disabled" options={LANGS} />
        </Row>
      </Section>
      <Section title="Placeholder">
        <Row>
          <Select aria-label="Assignee" width={220} placeholder="Assign to…" options={LANGS} />
        </Row>
      </Section>
    </Page>
  );
}

function SegmentedPage() {
  const [density, setDensity] = useState<"comfortable" | "compact">(
    "comfortable",
  );
  const [view, setView] = useState<"board" | "list">("board");
  return (
    <Page
      title="Segmented control"
      lead="An inline single-choice control for 2–4 short, equally-weighted options that switch a view immediately (density, layout, date range). More discoverable than a Select because every option is visible."
      importLine='import { SegmentedControl } from "linear-ui"'
      props={[
        { name: "items", type: "{ value, label, icon? }[]", description: "2–4 segments." },
        { name: "value / onValueChange", type: "string / fn", description: "Controlled selection (this control is always controlled)." },
        { name: "size", type: '"sm" | "md"', default: '"md"' , description: "Track height." },
      ]}
      guidelines={{
        do: [
          "Keep to 2–4 options with one- or two-word labels.",
          "Apply the change on click, like a Switch — no separate confirm.",
        ],
        dont: [
          "Don't use it for more than 4 options or for multi-select — use Select or Toggle group.",
          "Don't mix very different label lengths; segments look best near-equal width.",
        ],
      }}
    >
      <Section title="With icons">
        <Row>
          <SegmentedControl
            aria-label="Density"
            value={density}
            onValueChange={setDensity}
            items={[
              { value: "comfortable", label: "Comfortable", icon: <Icon icon={ListViewIcon} size={14} /> },
              { value: "compact", label: "Compact", icon: <Icon icon={GridIcon} size={14} /> },
            ]}
          />
        </Row>
      </Section>
      <Section title="Small, text only">
        <Row>
          <SegmentedControl
            aria-label="View"
            size="sm"
            value={view}
            onValueChange={setView}
            items={[
              { value: "board", label: "Board" },
              { value: "list", label: "List" },
            ]}
          />
        </Row>
      </Section>
    </Page>
  );
}

function BadgePage() {
  return (
    <Page
      title="Badge"
      lead="A small, non-interactive chip that labels or categorizes the thing next to it — a status, a count, a version, a label. If it's clickable, it's a Button."
      importLine='import { Badge } from "linear-ui"'
      props={[
        { name: "variant", type: '"neutral" | "accent" | "success" | "warning" | "danger" | "outline"', default: '"neutral"', description: "Colored variants are a low-opacity tint of the hue with matching text." },
        { name: "size", type: '"sm" | "md"', default: '"md"', description: "18px or 20px tall." },
        { name: "dot", type: "boolean", default: "false", description: "Leading status dot — the Linear label style." },
      ]}
      guidelines={{
        do: [
          "Map one color to one meaning across the whole product (green = done, etc.).",
          "Keep the text to one or two words.",
        ],
        dont: [
          "Don't attach click handlers — use a Button or a Toggle.",
          "Don't use more than one or two badges on a single row.",
        ],
      }}
    >
      <Section
        title="Variants"
        variants={[
          { name: "neutral", description: "Default. No hue — plain fill." },
          { name: "accent", description: "In-progress / active states." },
          { name: "success / warning / danger", description: "Semantic status." },
          { name: "outline", description: "Border only — lowest emphasis." },
        ]}
      >
        <Row>
          <Badge>Backlog</Badge>
          <Badge variant="accent">In progress</Badge>
          <Badge variant="success">Done</Badge>
          <Badge variant="warning">Blocked</Badge>
          <Badge variant="danger">Cancelled</Badge>
          <Badge variant="outline">Draft</Badge>
        </Row>
      </Section>
      <Section title="With dot / sizes" description="The dot echoes the variant color and reads well at small sizes and in dense lists.">
        <Row>
          <Badge dot variant="accent">Design</Badge>
          <Badge dot variant="success">Frontend</Badge>
          <Badge dot variant="danger">Urgent</Badge>
          <Badge size="sm">v0.1.0</Badge>
        </Row>
      </Section>
    </Page>
  );
}

function AvatarPage() {
  return (
    <Page
      title="Avatar"
      lead="Represents a person or workspace. Falls back to initials on a colour derived from the name, so it's stable and never empty."
      importLine='import { Avatar } from "linear-ui"'
      props={[
        { name: "name", type: "string", description: "Required — drives the initials and the fallback colour." },
        { name: "src", type: "string", description: "Image URL; initials show while it loads or if it fails." },
        { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: '"md"', description: "16 / 20 / 24 / 32px." },
      ]}
      guidelines={{
        do: [
          "Always pass a real name even when you have a src — it's the alt text and the fallback.",
          "Add a ring in the surface colour when stacking avatars so they read as separate.",
        ],
        dont: ["Don't use avatars as buttons without a label or tooltip naming the person."],
      }}
    >
      <Section title="Sizes">
        <Row>
          <Avatar name="Ada Lovelace" size="xs" />
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Ada Lovelace" size="md" />
          <Avatar name="Grace Hopper" size="lg" />
          <Avatar name="Linus" size="lg" src="https://avatars.githubusercontent.com/u/1024025?v=4" />
        </Row>
      </Section>
      <Section title="Stack" description="Overlap with a negative margin and a 2px ring in the background colour.">
        <Row>
          <div className="flex -space-x-1.5">
            {["Ada Lovelace", "Grace Hopper", "Alan Turing", "Edsger Dijkstra"].map(
              (n) => (
                <Avatar
                  key={n}
                  name={n}
                  size="md"
                  className="ring-2 ring-[var(--bg-primary)]"
                />
              ),
            )}
          </div>
        </Row>
      </Section>
    </Page>
  );
}

function KbdPage() {
  return (
    <Page
      title="Kbd"
      lead="Displays a keyboard key or shortcut. Several in a row read as a chord. Presentational only — it doesn't bind the shortcut."
      importLine='import { Kbd } from "linear-ui"'
      guidelines={{
        do: [
          "Use the platform glyphs — ⌘ ⌥ ⇧ ⌃ on macOS, Ctrl / Alt on Windows.",
          "Show the shortcut next to its action (menu item, tooltip), not in isolation.",
        ],
        dont: ["Don't style regular inline code as Kbd — it's specifically for keys."],
      }}
    >
      <Section title="Examples">
        <Row className="flex-col items-start gap-3">
          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
            Command menu <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
            Toggle sidebar <Kbd>⌘</Kbd> <Kbd>.</Kbd>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
            Create issue <Kbd>C</Kbd>
          </span>
        </Row>
      </Section>
    </Page>
  );
}

function TooltipPage() {
  return (
    <Page
      title="Tooltip"
      lead="A brief label that appears on hover or keyboard focus — for naming icon-only controls or adding a short hint. Never put essential information or interactive content in one."
      importLine='import { Tooltip, TooltipProvider } from "linear-ui"'
      radix="@radix-ui/react-tooltip"
      props={[
        { name: "content", type: "ReactNode", description: "The tooltip text." },
        { name: "shortcut", type: "string", description: "Dimmed keyboard hint shown on the right." },
        { name: "side / align", type: "string", default: '"top" / "center"', description: "Placement relative to the trigger." },
        { name: "delayDuration", type: "number", default: "250", description: "ms before it opens." },
      ]}
      guidelines={{
        do: [
          "Wrap the app once in <TooltipProvider>.",
          "Use it for every icon-only button.",
          "Keep it to a few words — it's a label, not documentation.",
        ],
        dont: [
          "Don't put links, buttons or long text in a tooltip — use a Popover or Hover card.",
          "Don't attach one to a disabled element without a wrapper; it won't receive events.",
        ],
      }}
    >
      <Section title="Sides & shortcut">
        <Row>
          <Tooltip content="Top (default)">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip side="right" content="On the right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
          <Tooltip side="bottom" content="Copy link" shortcut="⌘C">
            <Button variant="secondary" iconOnly aria-label="Copy link">
              <Icon icon={Copy01Icon} />
            </Button>
          </Tooltip>
        </Row>
      </Section>
    </Page>
  );
}

/* -------------------------------------------------------------------------- */
/*  Composite / complex demos                                                  */
/* -------------------------------------------------------------------------- */

function DropdownPage() {
  const [showDone, setShowDone] = useState(true);
  return (
    <Page
      title="Dropdown menu"
      lead="A list of actions or options revealed from a button — an overflow “…” menu, an account menu, a row's actions. For picking a value that stays selected, use Select; for a right-click menu, use Context menu."
      importLine='import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "linear-ui"'
      radix="@radix-ui/react-dropdown-menu"
      props={[
        { name: "DropdownMenuTrigger · asChild", type: "boolean", description: "Render your own Button as the trigger." },
        { name: "DropdownMenuItem · icon / shortcut", type: "ReactNode / string", description: "Leading icon and trailing keyboard hint." },
        { name: "DropdownMenuItem · destructive", type: "boolean", default: "false", description: "Red text + red hover — for Delete etc." },
        { name: "DropdownMenuCheckboxItem", type: "component", description: "A toggleable row with a leading check." },
      ]}
      guidelines={{
        do: [
          "Group related items and separate groups with DropdownMenuSeparator.",
          "Put the destructive item last, on its own, marked destructive.",
          "Mirror any shortcuts the actions have elsewhere.",
        ],
        dont: [
          "Don't exceed ~10 items — reach for a Command palette or a dedicated view.",
          "Don't use it to select a persistent value — that's Select.",
        ],
      }}
    >
      <Section title="Trigger menu" description="Labels, icons, shortcuts, a checkbox row and a destructive action.">
        <Row>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <Icon icon={MoreHorizontalIcon} /> Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Issue</DropdownMenuLabel>
              <DropdownMenuItem icon={<Icon icon={PencilEdit02Icon} />} shortcut="E">
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem icon={<Icon icon={Copy01Icon} />} shortcut="⌘C">
                Copy link
              </DropdownMenuItem>
              <DropdownMenuItem icon={<Icon icon={ArrowUpRight01Icon} />}>
                Open in new tab
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showDone}
                onCheckedChange={setShowDone}
              >
                Show completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive icon={<Icon icon={Delete02Icon} />} shortcut="⌫">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
      </Section>
    </Page>
  );
}

function TabsPage() {
  return (
    <Page
      title="Tabs"
      lead="Switches between peer views of the same subject within one page — the sections are alternatives, not steps, and the URL usually doesn't change. For navigating to different places, use the Sidebar or a Navigation menu."
      importLine='import { Tabs, TabsList, TabsTrigger, TabsContent } from "linear-ui"'
      radix="@radix-ui/react-tabs"
      props={[
        { name: "Tabs · value / defaultValue / onValueChange", type: "string / fn", description: "The active tab." },
        { name: "Tabs · orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Arrow-key navigation direction." },
        { name: "TabsTrigger · value", type: "string", description: "Matches a TabsContent." },
      ]}
      guidelines={{
        do: [
          "Keep tab labels to one word where possible; order by importance.",
          "Keep the first tab as the sensible default landing view.",
          "Persist the active tab in the URL if the content is deep-linkable.",
        ],
        dont: [
          "Don't use tabs for a sequence — that's a stepper / wizard.",
          "Don't nest tab bars; flatten or use a different pattern.",
          "Don't hide a primary action inside a non-default tab.",
        ],
      }}
    >
      <Section title="Example" description="An accent underline marks the active tab; content swaps below the hairline.">
        <Row className="block">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">
                <Icon icon={DashboardSquare02Icon} /> Overview
              </TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">
                <Icon icon={Settings01Icon} /> Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-text-secondary">
              A summary of the project — status, progress and recent updates.
            </TabsContent>
            <TabsContent value="activity" className="text-sm text-text-secondary">
              A reverse-chronological feed of everything that happened.
            </TabsContent>
            <TabsContent value="settings" className="text-sm text-text-secondary">
              Configure the project name, members and visibility.
            </TabsContent>
          </Tabs>
        </Row>
      </Section>
    </Page>
  );
}

type Issue = {
  id: string;
  title: string;
  status: "backlog" | "progress" | "done";
  priority: "urgent" | "high" | "med" | "low";
  assignee: string;
  updated: string;
};

const ISSUES: Issue[] = [
  { id: "ENG-214", title: "Token contrast audit for light theme", status: "progress", priority: "high", assignee: "Ada Lovelace", updated: "2h ago" },
  { id: "ENG-208", title: "Dialog focus trap regression", status: "backlog", priority: "urgent", assignee: "Alan Turing", updated: "5h ago" },
  { id: "ENG-201", title: "Ship SegmentedControl", status: "done", priority: "med", assignee: "Grace Hopper", updated: "1d ago" },
  { id: "ENG-198", title: "Table row density option", status: "backlog", priority: "low", assignee: "Edsger Dijkstra", updated: "2d ago" },
];

const STATUS_BADGE: Record<Issue["status"], React.ReactNode> = {
  backlog: <Badge dot>Backlog</Badge>,
  progress: <Badge dot variant="accent">In progress</Badge>,
  done: <Badge dot variant="success">Done</Badge>,
};

function TablePage() {
  const [rows, setRows] = useState(ISSUES);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<{ key: keyof Issue; dir: "asc" | "desc" }>({
    key: "id",
    dir: "asc",
  });

  const sorted = useMemo(() => {
    const s = [...rows].sort((a, b) =>
      String(a[sort.key]).localeCompare(String(b[sort.key])),
    );
    return sort.dir === "asc" ? s : s.reverse();
  }, [rows, sort]);

  const allChecked = selected.size === rows.length && rows.length > 0;
  const toggleAll = () =>
    setSelected(allChecked ? new Set() : new Set(rows.map((r) => r.id)));
  const toggleOne = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const sortBy = (key: keyof Issue) =>
    setSort((p) =>
      p.key === key
        ? { key, dir: p.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );

  return (
    <Page
      title="Table"
      lead="Presents rows of structured data for scanning and comparison. These are the low-level parts — you own the markup, the sorting and the selection state, which keeps it flexible. For a batteries-included data grid, layer @tanstack/react-table on top."
      importLine='import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "linear-ui"'
      props={[
        { name: "TableHead · sortable", type: "boolean", description: "Renders a sort button with a direction caret." },
        { name: "TableHead · sortDirection", type: '"asc" | "desc" | false', description: "Current sort state for this column." },
        { name: "TableHead · onSort", type: "() => void", description: "Called when the header is clicked." },
        { name: "TableRow · selected", type: "boolean", description: "Applies the selected-row fill." },
      ]}
      guidelines={{
        do: [
          "Right-align numeric columns; keep the first column the row's identity.",
          "Make the whole header cell the sort target, and show the current direction.",
          "Put bulk actions where the filter input is once rows are selected.",
        ],
        dont: [
          "Don't wrap cell text — truncate and rely on a tooltip or the detail view.",
          "Don't paginate tiny result sets; only page when the list is genuinely long.",
        ],
      }}
    >
      <Section title="Issues" description="Sortable headers, a select-all checkbox with an indeterminate state, hover and selected row fills, and a bulk-action bar.">
        <div className="flex flex-col gap-3">
          <div className="flex h-7 items-center gap-2">
            {selected.size > 0 ? (
              <>
                <span className="text-xs text-text-secondary">
                  {selected.size} selected
                </span>
                <Button
                  size="sm"
                  variant="subtle"
                  onClick={() =>
                    setRows((r) => r.filter((x) => !selected.has(x.id)))
                  }
                >
                  <Icon icon={Delete02Icon} size={14} /> Delete
                </Button>
              </>
            ) : (
              <Input
                size="sm"
                className="w-56"
                leadingIcon={<Icon icon={Search01Icon} />}
                placeholder="Filter issues…"
              />
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={
                      allChecked
                        ? true
                        : selected.size > 0
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead
                  sortable
                  sortDirection={sort.key === "id" && sort.dir}
                  onSort={() => sortBy("id")}
                >
                  ID
                </TableHead>
                <TableHead
                  sortable
                  sortDirection={sort.key === "title" && sort.dir}
                  onSort={() => sortBy("title")}
                >
                  Title
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((issue) => (
                <TableRow key={issue.id} selected={selected.has(issue.id)}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(issue.id)}
                      onCheckedChange={() => toggleOne(issue.id)}
                      aria-label={`Select ${issue.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-text-tertiary">
                    {issue.id}
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium">
                    {issue.title}
                  </TableCell>
                  <TableCell>{STATUS_BADGE[issue.status]}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Avatar name={issue.assignee} size="xs" />
                      <span className="text-sm text-text-secondary">
                        {issue.assignee}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm text-text-tertiary">
                    {issue.updated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>
    </Page>
  );
}

function ThemePickerPage() {
  const [value, setValue] = useState<ThemeChoice>("dark");
  return (
    <Page
      title="Theme picker"
      lead="The “Interface theme” control — three cards (System / Light / Dark), each a miniature window mock, with the selection marked by an accent border and dot. Pair it with the useTheme() hook."
      importLine='import { ThemePicker, useTheme } from "linear-ui"'
      props={[
        { name: "value", type: '"system" | "light" | "dark"', description: "The current choice." },
        { name: "onValueChange", type: "(value) => void", description: "Wire this straight to setTheme from useTheme()." },
      ]}
    >
      <Section title="Cards" description="Try it — the whole playground re-themes as you switch.">
        <Row>
          <ThemePicker value={value} onValueChange={setValue} />
        </Row>
      </Section>
    </Page>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navigation registry                                                        */
/* -------------------------------------------------------------------------- */

export type { NavItem, NavGroup } from "./nav-types";

export const NAV: NavGroup[] = [
  {
    group: "Foundations",
    items: [
      { id: "overview", label: "Overview", icon: Home09Icon, render: (nav) => <Overview onNavigate={nav} /> },
      { id: "tokens", label: "Design tokens", icon: PaintBoardIcon, render: () => <Tokens /> },
      { id: "icons", label: "Icons", icon: SquareArrowDataTransferHorizontalIcon, render: () => <Icons /> },
    ],
  },
  {
    group: "Forms",
    items: [
      { id: "button", label: "Button", icon: CommandIcon, render: () => <ButtonPage /> },
      { id: "button-group", label: "Button group", icon: MoreHorizontalCircle01Icon, render: () => <ButtonGroupPage /> },
      { id: "input", label: "Input", icon: TextFontIcon, render: () => <InputPage /> },
      { id: "input-group", label: "Input group", icon: TextIcon, render: () => <InputGroupPage /> },
      { id: "textarea", label: "Textarea", icon: ParagraphIcon, render: () => <TextareaPage /> },
      { id: "checkbox", label: "Checkbox", icon: CheckmarkSquare03Icon, render: () => <CheckboxPage /> },
      { id: "radio-group", label: "Radio group", icon: RadioIcon, render: () => <RadioPage /> },
      { id: "switch", label: "Switch", icon: ToggleOnIcon, render: () => <SwitchPage /> },
      { id: "toggle", label: "Toggle", icon: Tick01Icon, render: () => <TogglePage /> },
      { id: "toggle-group", label: "Toggle group", icon: BorderAll01Icon, render: () => <ToggleGroupPage /> },
      { id: "select", label: "Select", icon: MenuSquareIcon, render: () => <SelectPage /> },
      { id: "native-select", label: "Native select", icon: MenuCollapseIcon, render: () => <NativeSelectPage /> },
      { id: "combobox", label: "Combobox", icon: TextAlignLeft01Icon, render: () => <ComboboxPage /> },
      { id: "slider", label: "Slider", icon: SlidersHorizontalIcon, render: () => <SliderPage /> },
      { id: "segmented-control", label: "Segmented control", icon: WorkflowSquare01Icon, render: () => <SegmentedPage /> },
      { id: "label", label: "Label", icon: LabelImportantIcon, render: () => <LabelPage /> },
      { id: "field", label: "Field", icon: TextAlignLeft01Icon, render: () => <FieldPage /> },
    ],
  },
  {
    group: "Display",
    items: [
      { id: "avatar", label: "Avatar", icon: UserCircleIcon, render: () => <AvatarPage /> },
      { id: "badge", label: "Badge", icon: LabelIcon, render: () => <BadgePage /> },
      { id: "card", label: "Card", icon: Note01Icon, render: () => <CardPage /> },
      { id: "item", label: "Item", icon: ListViewIcon, render: () => <ItemPage /> },
      { id: "kbd", label: "Kbd", icon: IdIcon, render: () => <KbdPage /> },
      { id: "separator", label: "Separator", icon: MenuCollapseIcon, render: () => <SeparatorPage /> },
      { id: "skeleton", label: "Skeleton", icon: FrameworksIcon, render: () => <SkeletonPage /> },
      { id: "spinner", label: "Spinner", icon: Loading03Icon, render: () => <SpinnerPage /> },
      { id: "progress", label: "Progress", icon: WorkflowSquare01Icon, render: () => <ProgressPage /> },
      { id: "alert", label: "Alert", icon: Alert01Icon, render: () => <AlertPage /> },
      { id: "empty", label: "Empty", icon: DashboardSquare02Icon, render: () => <EmptyPage /> },
      { id: "aspect-ratio", label: "Aspect ratio", icon: SquareArrowExpand01Icon, render: () => <AspectRatioPage /> },
      { id: "attachment", label: "Attachment", icon: Attachment02Icon, render: () => <AttachmentPage /> },
      { id: "scroll-area", label: "Scroll area", icon: SidebarRight01Icon, render: () => <ScrollAreaPage /> },
    ],
  },
  {
    group: "Navigation",
    items: [
      { id: "sidebar", label: "Sidebar", icon: SidebarLeft01Icon, render: () => <SidebarShowcase /> },
      { id: "breadcrumb", label: "Breadcrumb", icon: LinkForwardIcon, render: () => <BreadcrumbPage_ /> },
      { id: "pagination", label: "Pagination", icon: LeftToRightListNumberIcon, render: () => <PaginationPage /> },
      { id: "tabs", label: "Tabs", icon: Layers01Icon, render: () => <TabsPage /> },
      { id: "menubar", label: "Menubar", icon: Menu09Icon, render: () => <MenubarPage /> },
      { id: "navigation-menu", label: "Navigation menu", icon: Navigation03Icon, render: () => <NavigationMenuPage /> },
    ],
  },
  {
    group: "Overlays",
    items: [
      { id: "tooltip", label: "Tooltip", icon: AiMagicIcon, render: () => <TooltipPage /> },
      { id: "popover", label: "Popover", icon: CircleArrowRight01Icon, render: () => <PopoverPage /> },
      { id: "hover-card", label: "Hover card", icon: CursorPointer01Icon, render: () => <HoverCardPage /> },
      { id: "dropdown-menu", label: "Dropdown menu", icon: MoreHorizontalIcon, render: () => <DropdownPage /> },
      { id: "context-menu", label: "Context menu", icon: CursorInfo01Icon, render: () => <ContextMenuPage /> },
      { id: "dialog", label: "Dialog", icon: Alert02Icon, render: () => <DialogShowcase /> },
      { id: "alert-dialog", label: "Alert dialog", icon: AlertCircleIcon, render: () => <AlertDialogPage /> },
      { id: "sheet", label: "Sheet", icon: LayoutRightIcon, render: () => <SheetPage /> },
      { id: "accordion", label: "Accordion", icon: LayersIcon, render: () => <AccordionPage /> },
      { id: "collapsible", label: "Collapsible", icon: ArrowDown01Icon, render: () => <CollapsiblePage /> },
      { id: "toast", label: "Toast", icon: AiChat01Icon, render: () => <ToastPage /> },
    ],
  },
  {
    group: "Data",
    items: [
      { id: "table", label: "Table", icon: Table01Icon, render: () => <TablePage /> },
    ],
  },
  {
    group: "Utilities",
    items: [
      { id: "direction", label: "Direction", icon: ArrowDataTransferHorizontalIcon, render: () => <DirectionPage /> },
      { id: "theme-picker", label: "Theme picker", icon: PaintBoardIcon, render: () => <ThemePickerPage /> },
    ],
  },
  {
    group: "Examples",
    items: [
      { id: "preferences", label: "Preferences screen", icon: Settings01Icon, render: () => <PreferencesExample /> },
      { id: "users-table", label: "Users table", icon: UserGroupIcon, render: () => <UsersTableExample /> },
      { id: "login", label: "Login", icon: LoginSquare01Icon, render: () => <LoginExample /> },
    ],
  },
];

export const NAV_ITEMS = NAV.flatMap((g) => g.items);
