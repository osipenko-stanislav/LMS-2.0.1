import { useMemo, useState } from "react";
import {
  Copy01Icon,
  Delete02Icon,
  FilterIcon,
  Mail01Icon,
  MoreHorizontalIcon,
  PencilEdit02Icon,
  Search01Icon,
  SecurityLockIcon,
  UserAdd01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
} from "@/lib";
import { Page, Section } from "../ui";

type Status = "active" | "invited" | "suspended";
type Role = "owner" | "admin" | "member" | "guest";

interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  role: Role;
  team: string;
  status: Status;
  mfa: boolean;
  lastActive: string;
  joined: string;
}

const USERS: User[] = [
  { id: "u1", name: "Ada Lovelace", handle: "ada", email: "ada@acme.com", role: "owner", team: "Engineering", status: "active", mfa: true, lastActive: "2m ago", joined: "Jan 4, 2023" },
  { id: "u2", name: "Grace Hopper", handle: "grace", email: "grace@acme.com", role: "admin", team: "Engineering", status: "active", mfa: true, lastActive: "1h ago", joined: "Feb 18, 2023" },
  { id: "u3", name: "Alan Turing", handle: "alan", email: "alan@acme.com", role: "member", team: "Research", status: "active", mfa: false, lastActive: "3h ago", joined: "Mar 2, 2023" },
  { id: "u4", name: "Edsger Dijkstra", handle: "edsger", email: "edsger@acme.com", role: "member", team: "Platform", status: "suspended", mfa: false, lastActive: "12d ago", joined: "May 9, 2023" },
  { id: "u5", name: "Katherine Johnson", handle: "katherine", email: "k.johnson@acme.com", role: "member", team: "Data", status: "active", mfa: true, lastActive: "5h ago", joined: "Jun 21, 2023" },
  { id: "u6", name: "Barbara Liskov", handle: "barbara", email: "barbara@acme.com", role: "admin", team: "Platform", status: "active", mfa: true, lastActive: "Yesterday", joined: "Aug 1, 2023" },
  { id: "u7", name: "Margaret Hamilton", handle: "margaret", email: "margaret@acme.com", role: "guest", team: "Design", status: "invited", mfa: false, lastActive: "—", joined: "Pending" },
  { id: "u8", name: "Radia Perlman", handle: "radia", email: "radia@acme.com", role: "member", team: "Networking", status: "invited", mfa: false, lastActive: "—", joined: "Pending" },
];

const ROLE_LABEL: Record<Role, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  guest: "Guest",
};

const STATUS_BADGE: Record<Status, React.ReactNode> = {
  active: <Badge dot variant="success">Active</Badge>,
  invited: <Badge dot variant="accent">Invited</Badge>,
  suspended: <Badge dot variant="danger">Suspended</Badge>,
};

type SortKey = "name" | "role" | "team" | "lastActive" | "joined";

export function UsersTableExample() {
  const [rows, setRows] = useState(USERS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "name",
    dir: "asc",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter(
      (u) =>
        (roleFilter === "all" || u.role === roleFilter) &&
        (statusFilter === "all" || u.status === statusFilter) &&
        (q === "" ||
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.team.toLowerCase().includes(q)),
    );
    const sorted = [...list].sort((a, b) =>
      String(a[sort.key]).localeCompare(String(b[sort.key])),
    );
    return sort.dir === "asc" ? sorted : sorted.reverse();
  }, [rows, query, roleFilter, statusFilter, sort]);

  const allChecked =
    filtered.length > 0 && filtered.every((u) => selected.has(u.id));
  const someChecked = filtered.some((u) => selected.has(u.id));

  const toggleAll = () =>
    setSelected(
      allChecked ? new Set() : new Set(filtered.map((u) => u.id)),
    );
  const toggleOne = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const sortBy = (key: SortKey) =>
    setSort((p) =>
      p.key === key
        ? { key, dir: p.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  const removeIds = (ids: string[]) => {
    const kill = new Set(ids);
    setRows((r) => r.filter((u) => !kill.has(u.id)));
    setSelected(new Set());
  };

  return (
    <Page
      width="full"
      title="Users table"
      lead="An admin “Members” screen — a wide, sortable data table with selection, a filter toolbar, per-row status and a right-aligned actions menu. Built from Table, Checkbox, Avatar, Badge, Select and Dropdown menu."
    >
      <Section
        title="Members"
        description="Search and filter narrow the list; the header checkbox reflects a partial selection; the ⋯ button on each row opens context actions."
      >
        <div className="flex flex-col gap-3">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {someChecked ? (
              <>
                <span className="text-xs text-text-secondary">
                  {selected.size} selected
                </span>
                <Button
                  size="sm"
                  variant="subtle"
                  onClick={() => setSelected(new Set())}
                >
                  Clear
                </Button>
                <Button size="sm" variant="subtle">
                  <Icon icon={Mail01Icon} size={14} /> Message
                </Button>
                <Button
                  size="sm"
                  variant="subtle"
                  className="text-danger"
                  onClick={() => removeIds([...selected])}
                >
                  <Icon icon={Delete02Icon} size={14} /> Remove
                </Button>
              </>
            ) : (
              <>
                <Input
                  size="sm"
                  className="w-56"
                  leadingIcon={<Icon icon={Search01Icon} />}
                  placeholder="Search members…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Select
                  aria-label="Role"
                  size="sm"
                  width={120}
                  value={roleFilter}
                  onValueChange={setRoleFilter}
                  options={[
                    { value: "all", label: "All roles" },
                    { value: "owner", label: "Owner" },
                    { value: "admin", label: "Admin" },
                    { value: "member", label: "Member" },
                    { value: "guest", label: "Guest" },
                  ]}
                />
                <Select
                  aria-label="Status"
                  size="sm"
                  width={130}
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                  options={[
                    { value: "all", label: "All statuses" },
                    { value: "active", label: "Active" },
                    { value: "invited", label: "Invited" },
                    { value: "suspended", label: "Suspended" },
                  ]}
                />
                <Button size="sm" variant="ghost" className="text-text-tertiary">
                  <Icon icon={FilterIcon} size={14} /> More filters
                </Button>
                <Button size="sm" variant="primary" className="ml-auto">
                  <Icon icon={UserAdd01Icon} size={14} /> Invite people
                </Button>
              </>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    aria-label="Select all"
                    checked={
                      allChecked
                        ? true
                        : someChecked
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead
                  sortable
                  sortDirection={sort.key === "name" && sort.dir}
                  onSort={() => sortBy("name")}
                >
                  User
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead
                  sortable
                  sortDirection={sort.key === "role" && sort.dir}
                  onSort={() => sortBy("role")}
                >
                  Role
                </TableHead>
                <TableHead
                  sortable
                  sortDirection={sort.key === "team" && sort.dir}
                  onSort={() => sortBy("team")}
                >
                  Team
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">2FA</TableHead>
                <TableHead
                  sortable
                  sortDirection={sort.key === "lastActive" && sort.dir}
                  onSort={() => sortBy("lastActive")}
                >
                  Last active
                </TableHead>
                <TableHead
                  sortable
                  sortDirection={sort.key === "joined" && sort.dir}
                  onSort={() => sortBy("joined")}
                >
                  Joined
                </TableHead>
                <TableHead className="w-10 text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id} selected={selected.has(u.id)}>
                  <TableCell>
                    <Checkbox
                      aria-label={`Select ${u.name}`}
                      checked={selected.has(u.id)}
                      onCheckedChange={() => toggleOne(u.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2.5 whitespace-nowrap">
                      <Avatar name={u.name} size="sm" />
                      <span className="flex flex-col leading-tight">
                        <span className="font-medium text-text-primary">
                          {u.name}
                        </span>
                        <span className="text-xs text-text-tertiary">
                          @{u.handle}
                        </span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-text-secondary">{u.email}</TableCell>
                  <TableCell>
                    <span className="text-text-secondary">{ROLE_LABEL[u.role]}</span>
                  </TableCell>
                  <TableCell className="text-text-secondary">{u.team}</TableCell>
                  <TableCell>{STATUS_BADGE[u.status]}</TableCell>
                  <TableCell className="text-center">
                    {u.mfa ? (
                      <Tooltip content="Two-factor enabled">
                        <span className="inline-flex text-success">
                          <Icon icon={SecurityLockIcon} size={15} />
                        </span>
                      </Tooltip>
                    ) : (
                      <span className="text-text-tertiary">—</span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-text-tertiary">
                    {u.lastActive}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-text-tertiary">
                    {u.joined}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          iconOnly
                          size="sm"
                          aria-label={`Actions for ${u.name}`}
                        >
                          <Icon icon={MoreHorizontalIcon} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{u.name}</DropdownMenuLabel>
                        <DropdownMenuItem icon={<Icon icon={ViewIcon} />}>
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem icon={<Icon icon={PencilEdit02Icon} />}>
                          Edit details
                        </DropdownMenuItem>
                        <DropdownMenuItem icon={<Icon icon={Copy01Icon} />}>
                          Copy email
                        </DropdownMenuItem>
                        {u.status === "invited" && (
                          <DropdownMenuItem icon={<Icon icon={Mail01Icon} />}>
                            Resend invite
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          destructive
                          icon={<Icon icon={Delete02Icon} />}
                          onSelect={() => removeIds([u.id])}
                        >
                          Remove from workspace
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="py-10 text-center text-sm text-text-tertiary"
                  >
                    No members match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <p className="text-xs text-text-tertiary">
            {filtered.length} of {rows.length} members
          </p>
        </div>
      </Section>
    </Page>
  );
}
