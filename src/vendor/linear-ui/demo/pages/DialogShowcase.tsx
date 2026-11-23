import { useState } from "react";
import {
  Notification01Icon,
  CreditCardIcon,
  Image02Icon,
  Link04Icon,
  PaintBoardIcon,
  Search01Icon,
  SecurityLockIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
  Input,
  Kbd,
  Label,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  SegmentedControl,
  Select,
  Separator,
  Switch,
  Textarea,
  cn,
} from "@/lib";
import { CodeBlock, Page, Section } from "../ui";

/* A small abstract cover image, inlined so it always renders. */
const COVER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="240" viewBox="0 0 600 240">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1664ff"/><stop offset="1" stop-color="#7aa8ff"/>
      </linearGradient>
    </defs>
    <rect width="600" height="240" fill="url(#g)"/>
    <circle cx="470" cy="60" r="120" fill="#ffffff" opacity="0.12"/>
    <circle cx="120" cy="220" r="90" fill="#ffffff" opacity="0.10"/>
    <rect x="40" y="150" width="180" height="14" rx="7" fill="#ffffff" opacity="0.85"/>
    <rect x="40" y="176" width="120" height="10" rx="5" fill="#ffffff" opacity="0.55"/>
  </svg>`,
)}`;

/* -------------------------------------------------------------------------- */
/*  1 · Confirmation                                                           */
/* -------------------------------------------------------------------------- */
function ConfirmExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger">Delete project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete “Web app”?</DialogTitle>
          <DialogDescription>
            This permanently deletes the project and its 128 issues. This can't
            be undone.
          </DialogDescription>
        </DialogHeader>
        <label className="flex items-center gap-2 rounded-md border border-border-subtle bg-surface-app/60 p-3 text-sm">
          <Checkbox /> I understand this is permanent
        </label>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger">Delete project</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · Create issue — a full form                                             */
/* -------------------------------------------------------------------------- */
const LABELS = ["Design", "Frontend", "Backend", "Bug", "Docs"];

function CreateIssueExample() {
  const [priority, setPriority] = useState("med");
  const [labels, setLabels] = useState<string[]>(["Frontend"]);
  const toggleLabel = (l: string) =>
    setLabels((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l],
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">New issue</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New issue</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input placeholder="Issue title" autoFocus />
          <Textarea placeholder="Add a description…" className="min-h-24" />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Assignee</Label>
              <Select
                aria-label="Assignee"
                defaultValue="ada"
                options={[
                  { value: "ada", label: "Ada Lovelace" },
                  { value: "grace", label: "Grace Hopper" },
                  { value: "alan", label: "Alan Turing" },
                ]}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Priority</Label>
              <SegmentedControl
                aria-label="Priority"
                size="sm"
                value={priority}
                onValueChange={setPriority}
                items={[
                  { value: "low", label: "Low" },
                  { value: "med", label: "Med" },
                  { value: "high", label: "High" },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Labels</Label>
            <div className="flex flex-wrap gap-3">
              {LABELS.map((l) => (
                <Checkbox
                  key={l}
                  label={l}
                  checked={labels.includes(l)}
                  onCheckedChange={() => toggleLabel(l)}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <label className="mr-auto flex items-center gap-2 text-xs text-text-secondary">
            <Checkbox /> Create more
          </label>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary">Create issue</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · Settings dialog with an internal sidenav                               */
/* -------------------------------------------------------------------------- */
const SETTINGS_NAV = [
  { id: "account", label: "Account", icon: UserIcon },
  { id: "appearance", label: "Appearance", icon: PaintBoardIcon },
  { id: "notifications", label: "Notifications", icon: Notification01Icon },
  { id: "security", label: "Security", icon: SecurityLockIcon },
  { id: "billing", label: "Billing", icon: CreditCardIcon },
];

function SettingsDialogExample() {
  const [tab, setTab] = useState("appearance");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Icon icon={UserIcon} /> Preferences
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <div className="flex h-[420px]">
          <nav className="flex w-48 shrink-0 flex-col gap-0.5 border-r border-border-subtle bg-surface-app/50 p-2">
            <p className="px-2 py-1.5 text-sm font-semibold">Settings</p>
            {SETTINGS_NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
                  tab === item.id
                    ? "bg-fill-active font-medium text-text-primary"
                    : "text-text-secondary hover:bg-fill-hover hover:text-text-primary",
                )}
              >
                <Icon
                  icon={item.icon}
                  size={16}
                  className={tab === item.id ? "text-text-secondary" : "text-text-tertiary"}
                />
                {item.label}
              </button>
            ))}
          </nav>

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-5 p-5">
              {tab === "appearance" && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold">Appearance</h3>
                    <p className="text-xs text-text-secondary">
                      Customize how the app looks on this device.
                    </p>
                  </div>
                  <SettingLine title="Interface theme" hint="Sync with system by default">
                    <Select
                      aria-label="Theme"
                      defaultValue="system"
                      width={140}
                      options={[
                        { value: "system", label: "System" },
                        { value: "light", label: "Light" },
                        { value: "dark", label: "Dark" },
                      ]}
                    />
                  </SettingLine>
                  <SettingLine title="Reduce motion">
                    <Switch />
                  </SettingLine>
                  <SettingLine title="Show avatars in lists">
                    <Switch defaultChecked />
                  </SettingLine>
                  <Separator />
                  <SettingLine title="Sidebar width">
                    <SegmentedControl
                      aria-label="Sidebar width"
                      size="sm"
                      value="cozy"
                      onValueChange={() => {}}
                      items={[
                        { value: "compact", label: "Compact" },
                        { value: "cozy", label: "Cozy" },
                      ]}
                    />
                  </SettingLine>
                </>
              )}
              {tab === "account" && (
                <>
                  <h3 className="text-sm font-semibold">Account</h3>
                  <div className="flex items-center gap-3">
                    <Avatar name="Guillermito" size="lg" />
                    <Button size="sm" variant="secondary">Change photo</Button>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Full name</Label>
                    <Input defaultValue="Guillermo Beltramino" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Email</Label>
                    <Input defaultValue="g@example.com" type="email" />
                  </div>
                </>
              )}
              {tab === "notifications" && (
                <>
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  {["Issue assigned to me", "Mentions", "Status changes", "Weekly digest"].map(
                    (n, i) => (
                      <SettingLine key={n} title={n}>
                        <Switch defaultChecked={i < 2} />
                      </SettingLine>
                    ),
                  )}
                </>
              )}
              {tab === "security" && (
                <>
                  <h3 className="text-sm font-semibold">Security</h3>
                  <SettingLine title="Two-factor authentication" hint="Recommended">
                    <Button size="sm" variant="secondary">Enable</Button>
                  </SettingLine>
                  <SettingLine title="Active sessions">
                    <Button size="sm" variant="ghost">View all</Button>
                  </SettingLine>
                </>
              )}
              {tab === "billing" && (
                <>
                  <h3 className="text-sm font-semibold">Billing</h3>
                  <p className="text-sm text-text-secondary">
                    You're on the <Badge variant="accent">Pro</Badge> plan — $8 / user / month.
                  </p>
                  <Button size="sm" variant="secondary">Manage subscription</Button>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SettingLine({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-text-primary">{title}</p>
        {hint && <p className="text-xs text-text-tertiary">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · Share — media + copy link                                              */
/* -------------------------------------------------------------------------- */
function ShareExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Icon icon={Link04Icon} /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <img src={COVER} alt="" className="h-36 w-full object-cover" />
        <div className="flex flex-col gap-4 p-5">
          <DialogHeader>
            <DialogTitle>Share “Q3 Roadmap”</DialogTitle>
            <DialogDescription>
              Anyone with the link can view this project.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2">
            <Input readOnly value="https://linear.app/acme/p/q3-roadmap" className="flex-1" />
            <Button variant="primary">Copy</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-1.5">
              {["Ada Lovelace", "Grace Hopper", "Alan Turing"].map((n) => (
                <Avatar key={n} name={n} size="sm" className="ring-2 ring-[var(--bg-elevated)]" />
              ))}
            </div>
            <Select
              aria-label="Permission"
              defaultValue="view"
              width={130}
              options={[
                { value: "view", label: "Can view" },
                { value: "comment", label: "Can comment" },
                { value: "edit", label: "Can edit" },
              ]}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*  5 · Scrollable content with sticky header + footer                         */
/* -------------------------------------------------------------------------- */
function ChangelogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Icon icon={Image02Icon} /> What's new
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] max-w-lg flex-col overflow-hidden p-0">
        <div className="border-b border-border-subtle p-5">
          <DialogTitle>Changelog</DialogTitle>
          <DialogDescription>Everything shipped in the last month.</DialogDescription>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-6 p-5">
            {[
              ["2.4.0", "Sidebar component", "A collapsible app-shell nav with an icon rail and ⌘B toggle."],
              ["2.3.0", "Dialog examples", "Form, settings, share, wizard and command variants."],
              ["2.2.0", "Light-mode shadows", "Shapes now define with a 1px stroke instead of a drop shadow."],
              ["2.1.0", "Hugeicons", "The icon set moved to Hugeicons behind an <Icon> primitive."],
              ["2.0.0", "Accent #1664FF", "Re-seeded the whole accent ramp from a single blue."],
            ].map(([v, title, body]) => (
              <div key={v} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Badge size="sm">{v}</Badge>
                  <span className="text-sm font-medium">{title}</span>
                </div>
                <p className="text-sm text-text-secondary">{body}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end border-t border-border-subtle p-4">
          <DialogClose asChild>
            <Button variant="primary" size="sm">Got it</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*  6 · Multi-step wizard                                                      */
/* -------------------------------------------------------------------------- */
function WizardExample() {
  const [step, setStep] = useState(0);
  const steps = ["Workspace", "Invite", "Done"];
  return (
    <Dialog onOpenChange={(o) => !o && setStep(0)}>
      <DialogTrigger asChild>
        <Button variant="secondary">Create workspace</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{steps[step]}</DialogTitle>
          <DialogDescription>Step {step + 1} of {steps.length}</DialogDescription>
        </DialogHeader>
        <Progress value={((step + 1) / steps.length) * 100} className="my-1" />

        <div className="min-h-28 py-1">
          {step === 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>Workspace name</Label>
                <Input placeholder="Acme Inc." autoFocus />
              </div>
              <RadioGroup defaultValue="team">
                <Radio value="team" label="For my team" />
                <Radio value="personal" label="Just for me" />
              </RadioGroup>
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <Label>Invite teammates</Label>
              <Textarea placeholder="ada@acme.com, grace@acme.com" className="min-h-20" />
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="grid size-10 place-items-center rounded-full bg-[color-mix(in_srgb,var(--success)_16%,transparent)] text-success">
                ✓
              </div>
              <p className="text-sm font-medium">You're all set</p>
              <p className="text-xs text-text-secondary">Your workspace is ready to go.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          {step > 0 && step < 2 && (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          {step < 2 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              {step === 1 ? "Finish" : "Continue"}
            </Button>
          ) : (
            <DialogClose asChild>
              <Button variant="primary">Open workspace</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*  7 · Sign in                                                                */
/* -------------------------------------------------------------------------- */
function SignInExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign in to Acme</DialogTitle>
          <DialogDescription>Welcome back — enter your details.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Button variant="secondary" className="w-full">Continue with Google</Button>
          <div className="flex items-center gap-3 text-2xs text-text-tertiary">
            <span className="h-px flex-1 bg-border-subtle" /> OR{" "}
            <span className="h-px flex-1 bg-border-subtle" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="you@acme.com" autoFocus />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-col sm:items-stretch">
          <Button variant="primary" className="w-full">Sign in</Button>
          <p className="text-center text-xs text-text-tertiary">
            No account? <span className="text-text-link">Sign up</span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/*  8 · Command / quick search                                                 */
/* -------------------------------------------------------------------------- */
const COMMANDS = [
  { group: "Navigation", items: ["Go to Inbox", "Go to My Issues", "Go to Roadmap"] },
  { group: "Create", items: ["New issue", "New project", "New document"] },
  { group: "Account", items: ["Switch workspace", "Log out"] },
];

function CommandExample() {
  const [q, setQ] = useState("");
  const filtered = COMMANDS.map((g) => ({
    ...g,
    items: g.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())),
  })).filter((g) => g.items.length);

  return (
    <Dialog onOpenChange={(o) => !o && setQ("")}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Icon icon={Search01Icon} /> Command menu <Kbd>⌘K</Kbd>
        </Button>
      </DialogTrigger>
      <DialogContent hideClose className="max-w-lg overflow-hidden p-0">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border-subtle px-3">
          <Icon icon={Search01Icon} size={16} className="text-text-tertiary" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            className="h-11 w-full bg-transparent text-sm placeholder:text-text-tertiary focus:outline-none"
          />
        </div>
        <ScrollArea className="max-h-72">
          <div className="p-1.5">
            {filtered.length === 0 && (
              <p className="px-2 py-6 text-center text-sm text-text-tertiary">
                No results for “{q}”.
              </p>
            )}
            {filtered.map((g) => (
              <div key={g.group} className="mb-1">
                <p className="px-2 py-1 text-2xs font-semibold tracking-wide text-text-tertiary uppercase">
                  {g.group}
                </p>
                {g.items.map((it) => (
                  <button
                    key={it}
                    className="flex h-8 w-full items-center rounded-sm px-2 text-left text-sm text-text-primary hover:bg-fill-hover"
                  >
                    {it}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */

export function DialogShowcase() {
  return (
    <Page
      title="Dialog"
      lead="A modal window that focuses the user on a single task or piece of information, overlaying the page with a blurred scrim. Use it for focused create / edit forms, confirmations, and short flows — reach for a Sheet when the content is a side panel, and an Alert Dialog when you're confirming a destructive action."
      importLine='import { Dialog, DialogTrigger, DialogContent, … } from "linear-ui"'
      radix="@radix-ui/react-dialog"
      props={[
        { name: "DialogContent · className", type: "string", description: "Width and layout overrides — e.g. max-w-lg, or p-0 for edge-to-edge media / sidenav layouts." },
        { name: "DialogContent · hideClose", type: "boolean", default: "false", description: "Hides the built-in top-right dismiss button (used by the command-menu example)." },
        { name: "Dialog · onOpenChange", type: "(open: boolean) => void", description: "Fires on every open/close — reset internal step / query state here." },
        { name: "Dialog · modal", type: "boolean", default: "true", description: "When false the page behind stays interactive and scroll isn't locked." },
      ]}
      guidelines={{
        do: [
          "Keep it to one primary action; put it last (right-most) in the footer.",
          "Give every DialogContent a DialogTitle — visually or with sr-only for search / command dialogs.",
          "Reset multi-step or filter state in onOpenChange so re-opening starts fresh.",
          "Let content scroll inside the dialog with a sticky header and footer, not the page.",
        ],
        dont: [
          "Don't stack dialogs — replace the content or use a multi-step flow instead.",
          "Don't use a Dialog for a destructive confirmation — use Alert Dialog (focus lands on Cancel).",
          "Don't put long forms with many sections in a dialog — that's a full page or a Sheet.",
        ],
      }}
    >
      <Section
        title="Confirmation"
        description="The simplest shape: a title, one line of consequence, and two actions. Add a checkbox acknowledgement for anything irreversible."
      >
        <div className="flex flex-wrap gap-3">
          <ConfirmExample />
        </div>
      </Section>

      <Section
        title="Create / edit form"
        description="Dialogs are the default home for a short create flow. Compose the form from the same primitives you'd use on a page — Input, Textarea, Select, Segmented control, Checkbox — and keep secondary options (like “Create more”) in the footer."
      >
        <div className="flex flex-wrap gap-3">
          <CreateIssueExample />
          <WizardExample />
        </div>
      </Section>

      <Section
        title="With an internal navigation"
        description="For a settings-style surface, set p-0 on DialogContent and lay out your own two-pane structure: a vertical nav on the left, a scrolling ScrollArea on the right. Give the dialog an sr-only title."
      >
        <div className="flex flex-wrap gap-3">
          <SettingsDialogExample />
        </div>
      </Section>

      <Section
        title="With media"
        description="An image or cover can sit flush against the top edge — again with p-0, then pad the body separately."
      >
        <div className="flex flex-wrap gap-3">
          <ShareExample />
        </div>
      </Section>

      <Section
        title="Long, scrollable content"
        description="Pin the header and footer, and let the middle scroll. Cap the height with max-h and make the content a flex column."
      >
        <div className="flex flex-wrap gap-3">
          <ChangelogExample />
        </div>
      </Section>

      <Section
        title="Auth & command"
        description="Compact single-purpose dialogs. The command menu hides the close button and gives its input autofocus; both keep an accessible title even when it isn't shown."
      >
        <div className="flex flex-wrap gap-3">
          <SignInExample />
          <CommandExample />
        </div>
      </Section>

      <Section title="Anatomy" description="The minimal composition.">
        <CodeBlock>{`<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent className="max-w-lg">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Supporting copy.</DialogDescription>
    </DialogHeader>

    {/* body — any components */}

    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
      </Section>
    </Page>
  );
}
