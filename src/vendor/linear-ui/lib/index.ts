/* Linear UI — public entry point */

export { cn } from "./utils/cn";

/* ---- Primitives --------------------------------------------------------- */
export { Button, buttonVariants, type ButtonProps } from "./components/Button";
export { ButtonGroup } from "./components/ButtonGroup";
export { Switch, type SwitchProps } from "./components/Switch";
export { Input, type InputProps } from "./components/Input";
export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./components/InputGroup";
export { Textarea, type TextareaProps } from "./components/Textarea";
export { Checkbox, type CheckboxProps } from "./components/Checkbox";
export { Select, type SelectProps, type SelectOption } from "./components/Select";
export {
  NativeSelect,
  type NativeSelectProps,
} from "./components/NativeSelect";
export {
  Combobox,
  type ComboboxProps,
  type ComboboxOption,
} from "./components/Combobox";
export {
  RadioGroup,
  Radio,
  type RadioGroupProps,
  type RadioProps,
} from "./components/RadioGroup";
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedControlItem,
} from "./components/SegmentedControl";
export { Slider } from "./components/Slider";
export { Toggle, toggleVariants, type ToggleProps } from "./components/Toggle";
export { ToggleGroup, ToggleGroupItem } from "./components/ToggleGroup";
export { Label } from "./components/Label";
export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "./components/Field";
export { Badge, type BadgeProps } from "./components/Badge";
export { Avatar } from "./components/Avatar";
export { Kbd } from "./components/Kbd";
export { Icon } from "./components/Icon";
export { Spinner } from "./components/Spinner";
export { Skeleton } from "./components/Skeleton";
export { Progress, type ProgressProps } from "./components/Progress";
export { Separator } from "./components/Separator";
export { AspectRatio } from "./components/AspectRatio";
export { ScrollArea } from "./components/ScrollArea";
export {
  Attachment,
  type AttachmentProps,
} from "./components/Attachment";

/* ---- Containers & content --------------------------------------------- */
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/Card";
export {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  type ItemProps,
} from "./components/Item";
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
} from "./components/Alert";
export {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
} from "./components/Empty";
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/Accordion";
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./components/Collapsible";
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type TableHeadProps,
} from "./components/Table";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";

/* ---- Navigation ------------------------------------------------------- */
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/Breadcrumb";
export {
  Pagination,
  PaginationRoot,
  PaginationItem,
  type PaginationProps,
} from "./components/Pagination";
export {
  Menubar,
  MenubarMenu,
  MenubarGroup,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  type MenubarItemProps,
} from "./components/Menubar";
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./components/NavigationMenu";

/* ---- Overlays -------------------------------------------------------- */
export {
  Tooltip,
  TooltipProvider,
  type TooltipProps,
} from "./components/Tooltip";
export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
} from "./components/Popover";
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./components/HoverCard";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  type DropdownMenuItemProps,
} from "./components/DropdownMenu";
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  type ContextMenuItemProps,
} from "./components/ContextMenu";
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/Dialog";
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/AlertDialog";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetContentProps,
} from "./components/Sheet";
export { Toaster, toast } from "./components/Toast";

/* ---- App shell ------------------------------------------------------ */
export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
  useSidebar,
  type SidebarProps,
  type SidebarProviderProps,
  type SidebarMenuButtonProps,
} from "./components/Sidebar";

/* ---- Settings scaffolding ------------------------------------------- */
export {
  SettingsPage,
  SettingsSection,
  SettingRow,
} from "./components/Settings";
export { ThemePicker, type ThemeChoice } from "./components/ThemePicker";

/* ---- Providers & hooks -------------------------------------------- */
export { DirectionProvider, useDirection } from "./components/Direction";
export { useTheme } from "./hooks/useTheme";
