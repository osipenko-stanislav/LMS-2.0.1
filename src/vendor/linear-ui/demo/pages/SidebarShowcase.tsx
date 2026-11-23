import { useState } from "react";
import {
  Calendar03Icon,
  DashboardSquare02Icon,
  Folder01Icon,
  Home09Icon,
  Notification01Icon,
  Rocket01Icon,
  Search01Icon,
  Settings01Icon,
  Task01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import {
  Avatar,
  Icon,
  Kbd,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/lib";
import { CodeBlock, Page, Section } from "../ui";

const MAIN = [
  { id: "home", label: "Home", icon: Home09Icon },
  { id: "my-issues", label: "My issues", icon: Task01Icon, badge: "8" },
  { id: "inbox", label: "Inbox", icon: Notification01Icon, badge: "3" },
];
const WORKSPACE = [
  { id: "roadmap", label: "Roadmap", icon: Rocket01Icon },
  { id: "projects", label: "Projects", icon: Folder01Icon },
  { id: "cycles", label: "Cycles", icon: Calendar03Icon },
  { id: "views", label: "Views", icon: DashboardSquare02Icon },
  { id: "members", label: "Members", icon: UserGroupIcon },
];

function DemoShell({ collapsible }: { collapsible?: "icon" | "offcanvas" }) {
  const [active, setActive] = useState("my-issues");
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      className="h-[440px] overflow-hidden rounded-xl border border-border"
    >
      <Sidebar collapsible={collapsible}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-1 py-1">
            <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent text-xs font-bold text-white">
              A
            </span>
            <span className="truncate text-sm font-semibold group-data-[state=collapsed]/sidebar:hidden">
              Acme Inc.
            </span>
          </div>
          <button className="flex h-7 items-center gap-2 rounded-sm border border-border-subtle px-2 text-sm text-text-tertiary group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0">
            <Icon icon={Search01Icon} size={14} />
            <span className="group-data-[state=collapsed]/sidebar:hidden">Search…</span>
            <Kbd className="ml-auto group-data-[state=collapsed]/sidebar:hidden">⌘K</Kbd>
          </button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {MAIN.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={active === item.id}
                    tooltip={item.label}
                    onClick={() => setActive(item.id)}
                  >
                    <Icon icon={item.icon} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {WORKSPACE.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={active === item.id}
                    tooltip={item.label}
                    onClick={() => setActive(item.id)}
                  >
                    <Icon icon={item.icon} />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Icon icon={Settings01Icon} />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Guillermito">
                <Avatar name="Guillermito" size="xs" />
                <span>Guillermito</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex h-11 shrink-0 items-center gap-2 border-b border-border-subtle px-3">
            <SidebarTrigger />
            <span className="text-sm font-medium capitalize">
              {active.replace("-", " ")}
            </span>
          </header>
          <div className="flex-1 p-4 text-sm text-text-secondary">
            Press <Kbd>⌘</Kbd> <Kbd>B</Kbd> or use the toggle to
            {open ? " collapse" : " expand"} the sidebar.
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SidebarShowcase() {
  return (
    <Page
      title="Sidebar"
      lead="The application shell's primary navigation — a vertical rail of grouped links with a header (brand, search) and a footer (settings, account). It collapses to a slim icon rail, remembers its state, and toggles with ⌘/Ctrl-B."
      importLine='import { SidebarProvider, Sidebar, SidebarInset, … } from "linear-ui"'
      props={[
        { name: "SidebarProvider · defaultOpen", type: "boolean", default: "true", description: "Initial expanded/collapsed state when uncontrolled." },
        { name: "SidebarProvider · open / onOpenChange", type: "boolean / fn", description: "Control the state yourself (e.g. to persist it)." },
        { name: "Sidebar · collapsible", type: '"icon" | "offcanvas" | "none"', default: '"icon"', description: "How it collapses: to an icon rail, fully away, or not at all." },
        { name: "SidebarMenuButton · isActive", type: "boolean", description: "Marks the current route." },
        { name: "SidebarMenuButton · tooltip", type: "string", description: "Shown as a right-side tooltip while collapsed to the icon rail." },
        { name: "SidebarMenuButton · asChild", type: "boolean", default: "false", description: "Render your own element (a router Link) with the button styling." },
      ]}
      guidelines={{
        do: [
          "Wrap the whole shell in SidebarProvider and put page content in SidebarInset.",
          "Give every SidebarMenuButton a tooltip so the icon rail stays usable.",
          "Group links with SidebarGroupLabel; keep the top group unlabeled for primary destinations.",
          "Persist the open state (onOpenChange → storage) so it survives reloads.",
        ],
        dont: [
          "Don't nest more than one level of groups — use a collapsible sub-menu or a separate view.",
          "Don't put long or wrapping labels in items; the rail truncates with an ellipsis.",
          "Don't hide the only way to expand it — keep a SidebarTrigger visible in the header.",
        ],
      }}
    >
      <Section
        title="Icon rail (default)"
        description={`collapsible="icon" shrinks the sidebar to a 52px rail of icons; labels, the brand name and group labels fade out, and each button shows its label as a tooltip on hover.`}
      >
        <DemoShell collapsible="icon" />
      </Section>

      <Section
        title="Off-canvas"
        description={`collapsible="offcanvas" slides the whole sidebar out of view — better on narrow layouts where even a rail is too much.`}
      >
        <DemoShell collapsible="offcanvas" />
      </Section>

      <Section title="Anatomy">
        <CodeBlock>{`<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>{/* brand, search */}</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Roadmap">
              <RocketIcon /> <span>Roadmap</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>{/* settings, account */}</SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <header><SidebarTrigger /> …</header>
    {children}
  </SidebarInset>
</SidebarProvider>`}</CodeBlock>
      </Section>

      <Section title="Note">
        <p className="text-sm text-text-secondary">
          The playground's own left navigation is a hand-rolled version of this
          pattern; the <code className="font-mono text-xs">Sidebar</code>{" "}
          component packages it up with the icon rail, the{" "}
          <Kbd>⌘</Kbd> <Kbd>B</Kbd> shortcut and the collapsed-state tooltips.
        </p>
      </Section>
    </Page>
  );
}
