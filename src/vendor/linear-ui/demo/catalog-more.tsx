import { useState } from "react";
import {
  Copy01Icon,
  Delete02Icon,
  File02Icon,
  PencilEdit02Icon,
  Search01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AspectRatio,
  Attachment,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Kbd,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  NativeSelect,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ScrollArea,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Spinner,
  Textarea,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  toast,
} from "@/lib";
import { Avatar } from "@/lib";
import { Page, Row, Section } from "./ui";

/* ========================================================================== */
/*  Forms                                                                      */
/* ========================================================================== */

export function ButtonGroupPage() {
  return (
    <Page
      title="Button group"
      lead="Visually joins a set of related buttons into one control — a view switcher, a text-formatting toolbar, a split button. The children keep their own Button variants; the group just merges the borders and corners."
      importLine='import { ButtonGroup, Button } from "linear-ui"'
      guidelines={{
        do: ["Keep every button in the group the same variant and size.", "Use it for actions that belong to one task."],
        dont: ["Don't group unrelated actions just to save space.", "Don't mix in a primary button — the group reads as one weight."],
      }}
    >
      <Section title="Examples">
        <Row>
          <ButtonGroup>
            <Button variant="secondary">Day</Button>
            <Button variant="secondary">Week</Button>
            <Button variant="secondary">Month</Button>
          </ButtonGroup>
        </Row>
        <Row>
          <ButtonGroup>
            <Button variant="secondary" iconOnly aria-label="Bold">
              <span className="font-bold">B</span>
            </Button>
            <Button variant="secondary" iconOnly aria-label="Italic">
              <span className="italic">I</span>
            </Button>
            <Button variant="secondary" iconOnly aria-label="Underline">
              <span className="underline">U</span>
            </Button>
          </ButtonGroup>
        </Row>
      </Section>
    </Page>
  );
}

export function InputGroupPage() {
  return (
    <Page
      title="Input group"
      lead="An Input with attached decoration — a leading search icon, a currency prefix, a trailing unit or button — all sharing one border and one focus ring. When you only need a leading icon, Input's leadingIcon prop is simpler."
      importLine='import { InputGroup, InputGroupAddon, InputGroupInput } from "linear-ui"'
      props={[
        { name: "InputGroupAddon", type: "component", description: "A non-editable slot for icons, text or a small button. Repeat for both sides." },
        { name: "InputGroupInput", type: "component", description: "The editable field — a bare <input> with the group handling the chrome." },
      ]}
    >
      <Section title="Examples">
        <Row className="flex-col items-stretch gap-3">
          <InputGroup className="max-w-xs">
            <InputGroupAddon>
              <Icon icon={Search01Icon} />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search…" />
            <InputGroupAddon>
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="max-w-xs">
            <InputGroupAddon className="text-sm text-text-tertiary">
              https://
            </InputGroupAddon>
            <InputGroupInput placeholder="acme.com" defaultValue="linear.app" />
          </InputGroup>
        </Row>
      </Section>
    </Page>
  );
}

export function TextareaPage() {
  return (
    <Page
      title="Textarea"
      lead="A multi-line text field for comments, descriptions and notes. Shares Input's border and focus treatment and grows with its content (field-sizing). Use Input for anything that fits on one line."
      importLine='import { Textarea } from "linear-ui"'
      props={[
        { name: "invalid", type: "boolean", default: "false", description: "Red border + focus ring." },
        { name: "rows", type: "number", description: "Initial visible lines; it still grows past this." },
      ]}
      guidelines={{
        do: ["Give it a Label.", "Set a minimum height that fits the expected input."],
        dont: ["Don't disable resize if the user might need more room.", "Don't use it for single-line values like a name or URL."],
      }}
    >
      <Section title="States">
        <Row className="flex-col items-stretch gap-3">
          <Textarea placeholder="Leave a comment…" className="max-w-md" />
          <Textarea
            className="max-w-md"
            defaultValue="This field is invalid."
            invalid
          />
          <Textarea className="max-w-md" disabled placeholder="Disabled" />
        </Row>
      </Section>
    </Page>
  );
}

export function TogglePage() {
  return (
    <Page
      title="Toggle"
      lead="A button that stays pressed — for a single on/off formatting or view option (bold, pin, show grid). It's a Switch you'd put in a toolbar. Group several with Toggle group."
      importLine='import { Toggle } from "linear-ui"'
      radix="@radix-ui/react-toggle"
      props={[
        { name: "pressed / defaultPressed", type: "boolean", description: "Controlled / uncontrolled state." },
        { name: "variant", type: '"ghost" | "outline"', default: '"ghost"', description: "Transparent, or with a resting border." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' , description: "24 / 28 / 32px." },
      ]}
      guidelines={{
        do: ["Use for a self-explanatory, icon-labelled option.", "Show the pressed state clearly (it fills)."],
        dont: ["Don't use a lone Toggle where a labelled Switch would be clearer.", "Don't use it for actions that do something once (that's a Button)."],
      }}
    >
      <Section title="Variants">
        <Row>
          <Toggle aria-label="Bold">
            <span className="font-bold">B</span>
          </Toggle>
          <Toggle defaultPressed aria-label="Italic">
            <span className="italic">I</span>
          </Toggle>
          <Toggle variant="outline" aria-label="Underline">
            <span className="underline">U</span>
          </Toggle>
          <Toggle disabled aria-label="Strikethrough">
            <span className="line-through">S</span>
          </Toggle>
        </Row>
      </Section>
    </Page>
  );
}

export function ToggleGroupPage() {
  const [align, setAlign] = useState("left");
  const [marks, setMarks] = useState<string[]>(["bold"]);
  return (
    <Page
      title="Toggle group"
      lead={`Several Toggles acting as one control. type="single" is a Segmented control drawn as buttons (text alignment); type="multiple" lets several be on at once (bold + italic + underline).`}
      importLine='import { ToggleGroup, ToggleGroupItem } from "linear-ui"'
      radix="@radix-ui/react-toggle-group"
      props={[
        { name: "type", type: '"single" | "multiple"', description: "One selection, or many." },
        { name: "value / onValueChange", type: "string | string[] / fn", description: "Shape follows type." },
        { name: "ToggleGroupItem · value", type: "string", description: "Identifies the item." },
      ]}
      guidelines={{
        do: ["Use single-select for mutually-exclusive choices, multiple for independent ones.", "Icon-only items need an aria-label."],
        dont: ["Don't use single-select Toggle group where a Segmented control fits better (it has the sunken track).", "Don't leave a single-select group with nothing selected unless empty is meaningful."],
      }}
    >
      <Section title="Single">
        <Row>
          <ToggleGroup type="single" value={align} onValueChange={(v) => v && setAlign(v)}>
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </Row>
      </Section>
      <Section title="Multiple">
        <Row>
          <ToggleGroup type="multiple" value={marks} onValueChange={setMarks}>
            <ToggleGroupItem value="bold"><span className="font-bold">B</span></ToggleGroupItem>
            <ToggleGroupItem value="italic"><span className="italic">I</span></ToggleGroupItem>
            <ToggleGroupItem value="underline"><span className="underline">U</span></ToggleGroupItem>
          </ToggleGroup>
        </Row>
      </Section>
    </Page>
  );
}

export function NativeSelectPage() {
  return (
    <Page
      title="Native select"
      lead="A styled wrapper around the browser's own <select>. Use it on mobile-heavy forms and very long lists where the OS picker beats a custom menu; use Select when you need custom rows, icons or grouping."
      importLine='import { NativeSelect } from "linear-ui"'
      props={[
        { name: "size", type: '"sm" | "md"', default: '"md"', description: "Trigger height." },
        { name: "invalid", type: "boolean", description: "Red border." },
      ]}
    >
      <Section title="Sizes">
        <Row>
          <NativeSelect defaultValue="en" aria-label="Language">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </NativeSelect>
          <NativeSelect size="sm" defaultValue="es" aria-label="Language small">
            <option value="en">English</option>
            <option value="es">Español</option>
          </NativeSelect>
          <NativeSelect disabled aria-label="disabled">
            <option>Disabled</option>
          </NativeSelect>
        </Row>
      </Section>
    </Page>
  );
}

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "vite", label: "Vite" },
  { value: "nuxt", label: "Nuxt" },
  { value: "svelte", label: "SvelteKit" },
];

export function ComboboxPage() {
  const [value, setValue] = useState("next");
  return (
    <Page
      title="Combobox"
      lead="A Select for a long list — the menu opens with a text filter. Use it once a Select would need scrolling (frameworks, countries, users). For a full app-wide command palette, use Command."
      importLine='import { Combobox } from "linear-ui"'
      props={[
        { name: "options", type: "{ value, label, disabled? }[]", description: "The full list; filtering is by label substring." },
        { name: "value / onValueChange", type: "string / fn", description: "The selected value." },
        { name: "placeholder / searchPlaceholder / emptyText", type: "string", description: "Trigger, filter and no-results copy." },
      ]}
      guidelines={{
        do: ["Sort options the way people think about them.", "Keep the filter matching forgiving (substring, case-insensitive)."],
        dont: ["Don't use it for 3–4 options.", "Don't make selection required if a sensible default exists."],
      }}
    >
      <Section title="Example" description="Type to filter, ↑/↓ to move, Enter to pick, Esc to close.">

        <Row>
          <Combobox
            aria-label="Framework"
            options={FRAMEWORKS}
            value={value}
            onValueChange={setValue}
            placeholder="Pick a framework"
          />
        </Row>
      </Section>
    </Page>
  );
}

export function SliderPage() {
  const [range, setRange] = useState([25, 75]);
  return (
    <Page
      title="Slider"
      lead="Picks a number from a continuous (or stepped) range where the exact value matters less than the relative position — volume, opacity, a price band. Use an Input with type=number when precision matters."
      importLine='import { Slider } from "linear-ui"'
      radix="@radix-ui/react-slider"
      props={[
        { name: "value / defaultValue", type: "number[]", description: "One entry per thumb — pass two for a range." },
        { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Bounds and granularity." },
        { name: "minStepsBetweenThumbs", type: "number", description: "Keeps range thumbs from crossing." },
      ]}
      guidelines={{
        do: ["Show the current value(s) nearby.", "Snap to a sensible step; free-floating precision is frustrating."],
        dont: ["Don't use a slider for a small set of discrete options — use a Segmented control.", "Don't make it the only input for a value people need to type exactly."],
      }}
    >
      <Section title="Single">
        <Row className="block max-w-sm">
          <Slider defaultValue={[40]} max={100} step={1} aria-label="Volume" />
        </Row>
      </Section>
      <Section title="Range">
        <Row className="block max-w-sm">
          <Slider value={range} onValueChange={setRange} max={100} step={1} minStepsBetweenThumbs={5} />
          <p className="mt-3 text-xs text-text-tertiary">
            {range[0]} – {range[1]}
          </p>
        </Row>
      </Section>
      <Section title="Disabled">
        <Row className="block max-w-sm">
          <Slider defaultValue={[60]} max={100} disabled />
        </Row>
      </Section>
    </Page>
  );
}

export function LabelPage() {
  return (
    <Page
      title="Label"
      lead="Names a form control and extends its click target. Use it directly for one-off controls; Field wraps Label + control + help + error into the standard row."
      importLine='import { Label } from "linear-ui"'
      radix="@radix-ui/react-label"
      guidelines={{
        do: ["Connect it with htmlFor / id, or wrap the control.", "Keep it a short noun phrase."],
        dont: ["Don't rely on a placeholder instead of a label.", "Don't put help text in the label — that's FieldDescription."],
      }}
    >
      <Section title="Example">
        <Row className="flex-col items-start gap-2">
          <Label htmlFor="lbl-demo">Email address</Label>
          <Input id="lbl-demo" type="email" placeholder="you@example.com" className="max-w-xs" />
        </Row>
      </Section>
    </Page>
  );
}

export function FieldPage() {
  return (
    <Page
      title="Field"
      lead="The canonical form row: a Label, the control, an optional description, and an error slot that appears when validation fails. Wrap a form's fields in FieldGroup for consistent spacing."
      importLine='import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from "linear-ui"'
      props={[
        { name: "Field · orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Stacked, or label-left / control-right (good for switches)." },
        { name: "FieldError · children", type: "ReactNode", description: "Renders nothing when empty, so you can bind it straight to form state." },
      ]}
      guidelines={{
        do: ["Keep help text to one line; put longer guidance in a Popover.", "Show the error under the field and set invalid on the control."],
        dont: ["Don't use horizontal orientation for inputs with long labels."],
      }}
    >
      <Section title="Vertical">
        <Row className="block max-w-sm">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="f-name">Display name</FieldLabel>
              <Input id="f-name" defaultValue="Guillermito" />
              <FieldDescription>Shown on your public profile.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="f-url">Website</FieldLabel>
              <Input id="f-url" defaultValue="not a url" invalid />
              <FieldError>Enter a valid URL.</FieldError>
            </Field>
          </FieldGroup>
        </Row>
      </Section>
      <Section title="Horizontal">
        <Row className="block max-w-md">
          <Field orientation="horizontal">
            <div>
              <FieldLabel>Two-factor auth</FieldLabel>
              <FieldDescription>Require a code at sign-in.</FieldDescription>
            </div>
            <Checkbox defaultChecked />
          </Field>
        </Row>
      </Section>
    </Page>
  );
}

/* ========================================================================== */
/*  Display                                                                    */
/* ========================================================================== */

export function CardPage() {
  return (
    <Page
      title="Card"
      lead="Groups related content and actions into one bordered surface — a plan, a setting group, a preview. It's a visual container, not a layout primitive; don't nest cards deeply."
      importLine='import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "linear-ui"'
      props={[
        { name: "CardHeader / CardContent / CardFooter", type: "component", description: "Padded regions; the footer gets a top divider." },
        { name: "CardTitle / CardDescription", type: "component", description: "Heading and supporting line inside the header." },
      ]}
      guidelines={{
        do: ["Use a card when the group needs a clear edge or its own actions.", "Keep the footer to one or two actions."],
        dont: ["Don't wrap every section of a page in a card — that's just borders.", "Don't nest cards more than one level."],
      }}
    >
      <Section title="Example">
        <Row>
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlimited issues and priority support.</CardDescription>
            </CardHeader>
            <CardContent className="text-text-secondary">
              $8 per user / month, billed annually.
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Upgrade</Button>
              <Button variant="ghost" size="sm">Learn more</Button>
            </CardFooter>
          </Card>
        </Row>
      </Section>
    </Page>
  );
}

export function ItemPage() {
  return (
    <Page
      title="Item"
      lead="One row in a list of things — a member, a search result, a connected account. Media on the left, a title / description stack in the middle, actions on the right. When the data is tabular and comparable, use a Table instead."
      importLine='import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "linear-ui"'
      props={[
        { name: "variant", type: '"default" | "outline" | "muted"', default: '"default"', description: "Plain, bordered, or filled." },
        { name: "interactive", type: "boolean", default: "false", description: "Adds a hover fill and pointer for clickable rows." },
        { name: "size", type: '"sm" | "md"', default: '"md"', description: "Row padding." },
      ]}
      guidelines={{
        do: ["Keep the title one line; truncate the description.", "Put at most two actions on the right — overflow the rest into a menu."],
        dont: ["Don't use Item for columns of data that should line up — that's a Table."],
      }}
    >
      <Section title="Members">
        <Row className="block">
          <div className="flex flex-col gap-1">
            {["Ada Lovelace", "Grace Hopper", "Alan Turing"].map((name, i) => (
              <Item key={name} interactive>
                <ItemMedia>
                  <Avatar name={name} size="sm" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>
                    {name.split(" ")[0].toLowerCase()}@example.com
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge variant={i === 0 ? "accent" : "neutral"} size="sm">
                    {i === 0 ? "Admin" : "Member"}
                  </Badge>
                </ItemActions>
              </Item>
            ))}
          </div>
        </Row>
      </Section>
    </Page>
  );
}

export function SeparatorPage() {
  return (
    <Page
      title="Separator"
      lead="A one-pixel rule that divides content into groups. Reach for whitespace first — add a Separator only when the gap alone isn't enough to signal the break."
      importLine='import { Separator } from "linear-ui"'
      radix="@radix-ui/react-separator"
      props={[
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Vertical needs a fixed-height parent." },
        { name: "decorative", type: "boolean", default: "true", description: "false exposes it to assistive tech as a real separator." },
      ]}
    >
      <Section title="Horizontal">
        <Row className="block max-w-sm">
          <p className="text-sm">Radix Primitives</p>
          <Separator className="my-3" />
          <p className="text-sm text-text-secondary">An open-source UI component library.</p>
        </Row>
      </Section>
      <Section title="Vertical">
        <Row>
          <div className="flex h-5 items-center gap-3 text-sm">
            <span>Blog</span>
            <Separator orientation="vertical" />
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Source</span>
          </div>
        </Row>
      </Section>
    </Page>
  );
}

export function SkeletonPage() {
  return (
    <Page
      title="Skeleton"
      lead="A grey placeholder in the shape of the content that's loading. Use it when you can predict the layout and the wait is likely under a couple of seconds; use a Spinner for indeterminate or in-place waits."
      importLine='import { Skeleton } from "linear-ui"'
      guidelines={{
        do: ["Match the skeleton to the real content's size and rhythm.", "Show it immediately — don't flash it for sub-100ms loads."],
        dont: ["Don't animate aggressively; the subtle pulse is enough.", "Don't skeleton a whole page when only one region is loading."],
      }}
    >
      <Section title="Card placeholder">
        <Row>
          <div className="flex w-64 items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </Row>
      </Section>
    </Page>
  );
}

export function SpinnerPage() {
  return (
    <Page
      title="Spinner"
      lead="An indeterminate “working…” indicator for waits with no known duration or progress — a button submitting, a panel refreshing. If you can predict the layout, a Skeleton feels faster; if you know the percentage, use Progress."
      importLine='import { Spinner } from "linear-ui"'
      props={[
        { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "14 / 16 / 20 / 32px." },
      ]}
      guidelines={{
        do: ["Place it where the result will appear.", "Replace the button label with the spinner + a verb while submitting."],
        dont: ["Don't show a full-screen spinner for a small region.", "Don't leave one spinning with no timeout or error path."],
      }}
    >
      <Section title="Sizes">
        <Row>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" className="text-accent" />
        </Row>
      </Section>
      <Section title="In a button">
        <Row>
          <Button variant="primary" disabled>
            <Spinner size="sm" /> Saving…
          </Button>
        </Row>
      </Section>
    </Page>
  );
}

export function ProgressPage() {
  const [value, setValue] = useState(60);
  return (
    <Page
      title="Progress"
      lead="Shows how far along a task is when you can measure it — an upload, an import, a multi-step form. Pass value={null} for the indeterminate bar when you know something's happening but not how much is left."
      importLine='import { Progress } from "linear-ui"'
      radix="@radix-ui/react-progress"
      props={[
        { name: "value", type: "number | null", description: "0–100. null renders the indeterminate bar." },
      ]}
      guidelines={{
        do: ["Pair it with a label or percentage.", "Keep it visible until the task finishes or fails."],
        dont: ["Don't fake progress — jumping to 90% then stalling erodes trust.", "Don't use it for waits shorter than a second."],
      }}
    >
      <Section title="Determinate">
        <Row className="block max-w-sm">
          <Progress value={value} />
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="subtle" onClick={() => setValue((v) => Math.max(0, v - 10))}>−10</Button>
            <Button size="sm" variant="subtle" onClick={() => setValue((v) => Math.min(100, v + 10))}>+10</Button>
          </div>
        </Row>
      </Section>
      <Section title="Indeterminate">
        <Row className="block max-w-sm">
          <Progress value={null} />
        </Row>
      </Section>
    </Page>
  );
}

export function AlertPage() {
  return (
    <Page
      title="Alert"
      lead="A persistent, inline message about the state of the page or a section — a trial ending, a failed payment, a saved confirmation that should stick around. For a transient confirmation, use a Toast; to interrupt with a decision, use an Alert dialog."
      importLine='import { Alert, AlertTitle, AlertDescription } from "linear-ui"'
      props={[
        { name: "variant", type: '"default" | "info" | "success" | "warning" | "danger"', default: '"default"', description: "Sets the tint and icon colour." },
      ]}
      guidelines={{
        do: ["Lead with what happened, then what to do about it.", "Place it directly above or beside the thing it's about."],
        dont: ["Don't stack multiple alerts — consolidate or prioritise.", "Don't use danger for tips; reserve it for real problems."],
      }}
    >
      <Section title="Variants">
        <Row className="flex-col items-stretch gap-3">
          <Alert className="max-w-md">
            <Icon icon={File02Icon} />
            <div>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>Your trial ends in 3 days.</AlertDescription>
            </div>
          </Alert>
          <Alert variant="success" className="max-w-md">
            <Icon icon={File02Icon} />
            <AlertDescription>Changes saved.</AlertDescription>
          </Alert>
          <Alert variant="danger" className="max-w-md">
            <Icon icon={File02Icon} />
            <div>
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>Update your card to keep your workspace active.</AlertDescription>
            </div>
          </Alert>
        </Row>
      </Section>
    </Page>
  );
}

export function EmptyPage() {
  return (
    <Page
      title="Empty"
      lead="What a list, table or panel shows before it has any content — an icon, a one-line explanation, and the action that fills it. Different from an error state (something went wrong) and a loading state (content is coming)."
      importLine='import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyActions } from "linear-ui"'
      guidelines={{
        do: ["Make the primary action the obvious next step.", "Keep the copy encouraging and specific to this surface."],
        dont: ["Don't reuse one generic empty state everywhere.", "Don't show it while data is still loading — that's a Skeleton."],
      }}
    >
      <Section title="Example">
        <Row className="block">
          <Empty className="max-w-sm">
            <EmptyIcon>
              <Icon icon={UserGroupIcon} />
            </EmptyIcon>
            <EmptyTitle>No members yet</EmptyTitle>
            <EmptyDescription>
              Invite your team to start collaborating on issues and projects.
            </EmptyDescription>
            <EmptyActions>
              <Button variant="primary" size="sm">Invite people</Button>
            </EmptyActions>
          </Empty>
        </Row>
      </Section>
    </Page>
  );
}

export function AspectRatioPage() {
  return (
    <Page
      title="Aspect ratio"
      lead="Reserves space at a fixed width-to-height ratio so images, video and embeds don't cause layout shift while they load."
      importLine='import { AspectRatio } from "linear-ui"'
      radix="@radix-ui/react-aspect-ratio"
      props={[{ name: "ratio", type: "number", default: "1", description: "width / height, e.g. 16 / 9." }]}
    >
      <Section title="16 / 9">
        <Row className="block max-w-sm">
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-lg border border-border bg-bg-tertiary"
          >
            <div className="grid h-full w-full place-items-center text-xs text-text-tertiary">
              16 / 9
            </div>
          </AspectRatio>
        </Row>
      </Section>
    </Page>
  );
}

export function AttachmentPage() {
  const [files, setFiles] = useState([
    { name: "spec.pdf", size: 248_000, type: "file" as const },
    { name: "hero.png", size: 1_480_000, type: "image" as const },
  ]);
  return (
    <Page
      title="Attachment"
      lead="Represents one file added to a message, comment or form — a type glyph, the name, the size, and a remove button. Lay several out in a wrapping row under the input."
      importLine='import { Attachment } from "linear-ui"'
      props={[
        { name: "name / size", type: "string / number", description: "Filename and bytes (formatted automatically)." },
        { name: "type", type: '"file" | "image"', default: '"file"', description: "Picks the glyph." },
        { name: "onRemove", type: "() => void", description: "Shows the remove button when provided." },
      ]}
    >
      <Section title="Example">
        <Row>
          {files.map((f) => (
            <Attachment
              key={f.name}
              name={f.name}
              size={f.size}
              type={f.type}
              onRemove={() => setFiles((prev) => prev.filter((x) => x.name !== f.name))}
            />
          ))}
          {files.length === 0 && (
            <span className="text-sm text-text-tertiary">All removed.</span>
          )}
        </Row>
      </Section>
    </Page>
  );
}

export function ScrollAreaPage() {
  return (
    <Page
      title="Scroll area"
      lead="A scroll container with a consistent, thin overlay scrollbar across platforms — use it inside menus, dialogs and side panels where the native bar would look heavy or inconsistent. Let the page itself scroll natively."
      importLine='import { ScrollArea } from "linear-ui"'
      radix="@radix-ui/react-scroll-area"
      props={[
        { name: "viewportClassName", type: "string", description: "Classes for the inner scrolling element (e.g. padding)." },
      ]}
      guidelines={{
        do: ["Give the ScrollArea a bounded height.", "Use it for scrollable regions inside overlays."],
        dont: ["Don't wrap the whole document in one — the browser does that better.", "Don't nest scroll areas."],
      }}
    >
      <Section title="Vertical">
        <Row className="block">
          <ScrollArea className="h-48 w-64 rounded-lg border border-border">
            <div className="flex flex-col gap-2 p-3 text-sm">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="rounded-sm bg-fill-hover px-2 py-1.5">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Row>
      </Section>
    </Page>
  );
}

/* ========================================================================== */
/*  Navigation                                                                 */
/* ========================================================================== */

export function BreadcrumbPage_() {
  return (
    <Page
      title="Breadcrumb"
      lead="Shows where the current page sits in a hierarchy and lets people jump back up it. Only useful when there's a real nesting more than two levels deep."
      importLine='import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "linear-ui"'
      guidelines={{
        do: ["Make every ancestor a link; the last item is the current page (not a link).", "Collapse the middle with an ellipsis menu when the trail is long."],
        dont: ["Don't use it as primary navigation.", "Don't show a one- or two-level trail — it adds noise."],
      }}
    >
      <Section title="Example">
        <Row>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="#">Workspace</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="#">Engineering</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>ENG-214</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Row>
      </Section>
    </Page>
  );
}

export function PaginationPage() {
  const [page, setPage] = useState(4);
  return (
    <Page
      title="Pagination"
      lead="Splits a long result set into numbered pages. Prefer infinite scroll or “load more” for feeds; use pagination when people need stable page numbers or to jump around (search results, tables)."
      importLine='import { Pagination } from "linear-ui"'
      props={[
        { name: "page / pageCount / onPageChange", type: "number / number / fn", description: "Current page, total pages, and the change handler." },
        { name: "siblings", type: "number", default: "1", description: "How many page numbers to show either side of the current one." },
      ]}
      guidelines={{
        do: ["Keep the current page clearly marked and always show first / last.", "Disable prev / next at the ends rather than hiding them."],
        dont: ["Don't paginate a list of under ~25 items.", "Don't reset scroll or filters when the page changes unless intended."],
      }}
    >
      <Section title="Example">
        <Row>
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
        </Row>
      </Section>
    </Page>
  );
}

export function MenubarPage() {
  return (
    <Page
      title="Menubar"
      lead="A persistent horizontal bar of menus (File / Edit / View), like a desktop app. Only worth it for dense, editor-style tools; most web apps are better served by a command palette and contextual menus."
      importLine='import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "linear-ui"'
      radix="@radix-ui/react-menubar"
      guidelines={{
        do: ["Keep top-level labels to the conventional set where they apply.", "Mirror shortcuts on the items."],
        dont: ["Don't bury primary actions here on a touch-first product.", "Don't exceed ~6 top-level menus."],
      }}
    >
      <Section title="Example">
        <Row>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem shortcut="⌘N">New issue</MenubarItem>
                <MenubarItem shortcut="⌘⇧N">New project</MenubarItem>
                <MenubarSeparator />
                <MenubarItem shortcut="⌘P">Print…</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem shortcut="⌘Z">Undo</MenubarItem>
                <MenubarItem shortcut="⌘⇧Z">Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Board</MenubarItem>
                <MenubarItem>List</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Row>
      </Section>
    </Page>
  );
}

export function NavigationMenuPage() {
  return (
    <Page
      title="Navigation menu"
      lead="A site-level navigation bar where some items open a panel of grouped links — the header nav on a marketing site or docs. For in-app navigation, use the Sidebar."
      importLine='import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "linear-ui"'
      radix="@radix-ui/react-navigation-menu"
      guidelines={{
        do: ["Keep the top level to a handful of items.", "Group panel links with short headings."],
        dont: ["Don't hide the primary destinations behind a panel.", "Don't use it as the app's main nav."],
      }}
    >
      <Section title="Example">
        <Row className="overflow-visible">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[360px] grid-cols-2 gap-1">
                    {["Issues", "Projects", "Cycles", "Roadmaps"].map((x) => (
                      <NavigationMenuLink
                        key={x}
                        href="#"
                        className="rounded-sm px-2 py-1.5 text-sm text-text-secondary hover:bg-fill-hover hover:text-text-primary"
                      >
                        {x}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className="inline-flex h-7 items-center rounded-md px-2.5 text-sm font-medium text-text-secondary hover:bg-fill-hover hover:text-text-primary"
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Row>
      </Section>
    </Page>
  );
}

/* ========================================================================== */
/*  Overlays                                                                   */
/* ========================================================================== */

export function PopoverPage() {
  return (
    <Page
      title="Popover"
      lead="A small floating panel of controls anchored to a button — a quick edit form, a filter, a colour picker. Unlike a Tooltip it can hold interactive content; unlike a Dialog it doesn't block the page."
      importLine='import { Popover, PopoverTrigger, PopoverContent } from "linear-ui"'
      radix="@radix-ui/react-popover"
      props={[
        { name: "PopoverContent · align / side / sideOffset", type: "string / number", description: "Placement relative to the trigger." },
        { name: "Popover · open / onOpenChange", type: "boolean / fn", description: "Control it (e.g. close after applying)." },
      ]}
      guidelines={{
        do: ["Keep it to a few related controls.", "Return focus to the trigger on close."],
        dont: ["Don't put a full form or a flow in a popover — use a Dialog.", "Don't stack popovers."],
      }}
    >
      <Section title="Example">
        <Row>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">
                <Icon icon={PencilEdit02Icon} /> Edit dimensions
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <p className="mb-2 text-sm font-medium">Dimensions</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between gap-3 text-sm">
                  Width <Input size="sm" className="w-20" defaultValue="240" />
                </label>
                <label className="flex items-center justify-between gap-3 text-sm">
                  Height <Input size="sm" className="w-20" defaultValue="160" />
                </label>
              </div>
            </PopoverContent>
          </Popover>
        </Row>
      </Section>
    </Page>
  );
}

export function HoverCardPage() {
  return (
    <Page
      title="Hover card"
      lead="A preview card that appears when you hover a link or name — a user profile, a linked issue, a repo. Purely informational and hover-triggered, so never put anything essential or interactive inside; on touch it doesn't open."
      importLine='import { HoverCard, HoverCardTrigger, HoverCardContent } from "linear-ui"'
      radix="@radix-ui/react-hover-card"
      guidelines={{
        do: ["Use it to save a click for supplementary context.", "Keep an open / close delay so it doesn't flicker."],
        dont: ["Don't put buttons or forms in it — use a Popover.", "Don't hide information that's only available here."],
      }}
    >
      <Section title="Example">
        <Row>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@ada</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3">
                <Avatar name="Ada Lovelace" size="lg" />
                <div>
                  <p className="text-sm font-semibold">Ada Lovelace</p>
                  <p className="text-xs text-text-secondary">
                    First programmer. Joined December 1842.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Row>
      </Section>
    </Page>
  );
}

export function ContextMenuPage() {
  return (
    <Page
      title="Context menu"
      lead="Actions revealed by right-click (or long-press) on an object — a row, a card, a canvas node. It's a power-user accelerator, so every action in it must also be reachable another way (a Dropdown menu, toolbar or shortcut)."
      importLine='import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "linear-ui"'
      radix="@radix-ui/react-context-menu"
      guidelines={{
        do: ["Scope items to the object that was right-clicked.", "Keep the destructive item last and marked destructive."],
        dont: ["Don't make it the only path to an action.", "Don't put more than ~8 items in it."],
      }}
    >
      <Section title="Example">
        <Row className="block">
          <ContextMenu>
            <ContextMenuTrigger className="grid h-28 place-items-center rounded-lg border border-dashed border-border text-sm text-text-tertiary select-none">
              Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem icon={<Icon icon={Copy01Icon} />} shortcut="⌘C">Copy</ContextMenuItem>
              <ContextMenuItem icon={<Icon icon={PencilEdit02Icon} />}>Rename</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem destructive icon={<Icon icon={Delete02Icon} />}>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Row>
      </Section>
    </Page>
  );
}

export function AlertDialogPage() {
  return (
    <Page
      title="Alert dialog"
      lead="Interrupts the user to confirm a consequential, usually irreversible action — delete, discard, sign out everywhere. Unlike a Dialog it has no dismiss-X, focus lands on Cancel, and Esc cancels."
      importLine='import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from "linear-ui"'
      radix="@radix-ui/react-alert-dialog"
      props={[
        { name: "AlertDialogAction · variant", type: '"primary" | "danger"', default: '"primary"', description: "Use danger for destructive confirmations." },
      ]}
      guidelines={{
        do: ["State the consequence plainly in the description.", "Label the action with the verb (“Delete project”), not “OK”."],
        dont: ["Don't use it for routine confirmations people do all day — that's friction.", "Don't make Cancel the scary-looking button."],
      }}
    >
      <Section title="Example">
        <Row>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger">Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently deletes your account and removes your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="danger">Delete account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Row>
      </Section>
    </Page>
  );
}

export function SheetPage() {
  return (
    <Page
      title="Sheet"
      lead="A modal panel that slides in from an edge — good for a secondary task alongside the current context (edit details, filters, a record's activity) where a centered Dialog would feel disruptive. Right is the default; bottom suits mobile."
      importLine='import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "linear-ui"'
      radix="@radix-ui/react-dialog"
      props={[
        { name: "SheetContent · side", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "Which edge it slides from." },
      ]}
      guidelines={{
        do: ["Keep the primary action pinned in SheetFooter.", "Use right / left for forms, bottom for mobile action sheets."],
        dont: ["Don't put a whole multi-page flow in a sheet.", "Don't open a sheet from within a dialog."],
      }}
    >
      <Section title="Sides">
        <Row>
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="secondary" className="capitalize">
                  {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-3">
                  <Input placeholder="Name" defaultValue="Guillermito" />
                  <Input placeholder="Email" defaultValue="g@example.com" />
                </div>
                <SheetFooter>
                  <Button variant="primary" size="sm">Save</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </Row>
      </Section>
    </Page>
  );
}

export function AccordionPage() {
  return (
    <Page
      title="Accordion"
      lead="Stacks sections that can be expanded one (or several) at a time — an FAQ, a settings group, progressive disclosure of detail. If the sections are alternative views of one thing, use Tabs instead."
      importLine='import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "linear-ui"'
      radix="@radix-ui/react-accordion"
      props={[
        { name: "Accordion · type", type: '"single" | "multiple"', description: "One panel open at a time, or many." },
        { name: "Accordion · collapsible", type: "boolean", description: "(single only) allow closing the open panel." },
        { name: "AccordionItem · value", type: "string", description: "Identifies the item." },
      ]}
      guidelines={{
        do: ["Keep trigger text a clear, scannable question or label.", "Open the most relevant item by default when there is one."],
        dont: ["Don't nest accordions.", "Don't hide critical content or primary actions inside a collapsed panel."],
      }}
    >
      <Section title="Single">
        <Row className="block max-w-lg">
          <Accordion type="single" collapsible defaultValue="a">
            <AccordionItem value="a">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes — it follows the WAI-ARIA disclosure pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>It uses the same tokens as the rest of the library.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>The height transition runs off Radix's CSS variable.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Row>
      </Section>
    </Page>
  );
}

export function CollapsiblePage() {
  const [open, setOpen] = useState(false);
  return (
    <Page
      title="Collapsible"
      lead="The single-region primitive behind Accordion — one trigger, one panel, an animated height. Use it for a standalone “show more” toggle; use Accordion when you have a set of them."
      importLine='import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "linear-ui"'
      radix="@radix-ui/react-collapsible"
      props={[
        { name: "open / onOpenChange", type: "boolean / fn", description: "Controlled state." },
        { name: "defaultOpen", type: "boolean", description: "Uncontrolled initial state." },
      ]}
    >
      <Section title="Example">
        <Row className="block max-w-sm">
          <Collapsible open={open} onOpenChange={setOpen}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">@ada starred 3 repositories</span>
              <CollapsibleTrigger asChild>
                <Button size="sm" variant="ghost">{open ? "Hide" : "Show"}</Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="mt-2 flex flex-col gap-1">
                {["radix-ui/primitives", "shadcn/ui", "tailwindlabs/tailwindcss"].map((r) => (
                  <div key={r} className="rounded-sm border border-border-subtle px-2 py-1.5 text-sm">
                    {r}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Row>
      </Section>
    </Page>
  );
}

export function ToastPage() {
  return (
    <Page
      title="Toast"
      lead="A brief, self-dismissing confirmation that an async action succeeded or failed — “Issue created”, “Couldn't save”. It's non-blocking and easy to miss, so never use it for anything the user must act on; that's an Alert or an Alert dialog."
      importLine='import { Toaster, toast } from "linear-ui"'
      radix="sonner"
      props={[
        { name: "toast(msg, opts)", type: "function", description: "opts: description, action {label, onClick}, duration. Also toast.success / .error / .promise." },
        { name: "<Toaster />", type: "component", description: "Mount once near the app root; it reads the current theme automatically." },
      ]}
      guidelines={{
        do: ["Keep it to one line plus an optional short description.", "Offer an Undo action for reversible operations."],
        dont: ["Don't put required actions or long text in a toast.", "Don't fire several at once — queue or collapse them."],
      }}
    >
      <Toaster />
      <Section title="Trigger">
        <Row>
          <Button variant="secondary" onClick={() => toast("Issue created", { description: "ENG-215 · Assigned to you" })}>
            Show toast
          </Button>
          <Button variant="secondary" onClick={() => toast.success("Changes saved")}>
            Success
          </Button>
          <Button variant="secondary" onClick={() => toast.error("Couldn't save", { description: "Check your connection." })}>
            Error
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast("Archived", { action: { label: "Undo", onClick: () => toast("Restored") } })
            }
          >
            With action
          </Button>
        </Row>
      </Section>
    </Page>
  );
}

/* ========================================================================== */
/*  Utilities                                                                  */
/* ========================================================================== */

export function DirectionPage() {
  return (
    <Page
      title="Direction"
      lead="A provider that tells every Radix-based component below it which way text reads, so menus, sliders and carets flip correctly for RTL locales. Wrap the app once, near the root."
      importLine='import { DirectionProvider } from "linear-ui"'
      radix="@radix-ui/react-direction"
      props={[{ name: "dir", type: '"ltr" | "rtl"', description: "The reading direction for the subtree." }]}
    >
      <Section title="Usage">
        <Row className="block">
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-text-secondary">
{`import { DirectionProvider } from "linear-ui";

<DirectionProvider dir="rtl">
  <App />
</DirectionProvider>`}
          </pre>
        </Row>
      </Section>
    </Page>
  );
}

