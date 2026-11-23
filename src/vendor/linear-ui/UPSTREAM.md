# Linear UI source snapshot

- Source: https://github.com/guillermobeltramino/linear-ui
- Commit: `074b6a6f42a70d4cabc6357b908e2f2144c5f0fe`
- Imported: 2026-11-22
- Permission: project owner explicitly confirmed permission to use the code in this project's conversation. Upstream contains no LICENSE file or package license field; this note does not grant redistribution rights to other users.

`lib/` and `styles/` are the original sources, including the semantic tokens and persisted theme hook. `demo/` contains upstream interactive examples used only by Storybook; the playground app entry points are omitted. The source alias `@/` resolves to this snapshot. The initial integration preserved component styles and token values; subsequent local motion adaptations are listed below.

Upstream package.json omits `@hugeicons/react` and `@hugeicons/core-free-icons`, which the actual sources import; the host installs these, as well as the actual Radix/CVA/clsx/sonner/tailwind-merge dependencies. `hugeicons-react` is not used by the sources and is omitted. The host also supplies Tailwind v4's Vite plugin, Inter fonts, and lucide-react.

Upstream demo names, tables and text are fixture content from this snapshot, not trusted LMS data. They are isolated from `core` and are not imported by the application. There is no additional product screen or parallel token system.

Public host imports: `src/ui/index.ts` and `src/ui/styles.css`. For updates, compare a new upstream commit with this snapshot and recheck types, builds, themes and interactions. Do not overwrite local adaptations blindly.


## Local opt-in motion adaptation — 2026-11-22

The original snapshot is now adapted in Popover, Dialog, DropdownMenu, Tabs, SegmentedControl, Switch, Accordion and Collapsible. Without MotionProvider these components use their original rendering/behavior paths. Inside the provider, shared motion primitives, portal presence, selection and disclosure bridges are enabled. `lib/motion.tsx`, `lib/useOverlayFocus.ts` and `lib/useDisclosureMotion.ts` are local additions. Host-only motion CSS is scoped to opted-in elements. Tokens remain unchanged. See `src/ui/motion/README.md` for reference sources, lifecycle tradeoffs and validation.


## Local field focus correction — 2026-11-22

Input, InputGroupInput and the Combobox search input suppress the global focus-visible box-shadow on their inner native input. The wrapper owns the rounded field focus treatment; the Combobox search row exposes focus through its bottom border. Textarea invalid focus uses the same danger ring as Input instead of the normal accent ring. Global focus rules, token values, dimensions and handlers are unchanged.


## Approved shared motion integration — 2026-11-22

Balanced physics is now the shared default. App and Storybook mount configurable MotionProvider; enabled={false} preserves the original comparison path in Motion Gallery. Tooltip, Button, Toggle and Item join the existing overlay/selection/disclosure integration. The autofocus bridge redispatches Radix's retained native event so custom currentTarget/preventDefault handlers work during interrupted exits. No domain contracts, data sources, token values or dependencies changed in this integration.

## Dark elevated gradient borders — 2026-11-22

DialogContent, PopoverContent and DropdownMenuContent opt into the shared dark gradient border through useGradientBorder. Composer uses the same mechanism with bg-primary as its surface. The host stylesheet `src/ui/gradient-border.css` uses existing surface/border tokens and background clips; artwork is retained above the surface and border layers. Light styles, shadows, radius, border width and focus rings are unchanged. `data-gradient-border="off"` opts out (used by mobile navigation). Storybook comparison: Linear UI/Surfaces/Gradient Borders.
