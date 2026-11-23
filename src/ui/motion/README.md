# Shared motion behavior

The approved motion behavior is enabled by default in the shared Linear UI components. The application and Storybook mount MotionProvider for shared physics and keyboard input handling. Components also use balanced defaults without an explicit provider.

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '../ui';
import { MotionProvider, motionPresets } from '../ui/motion';
// Import ui/styles.css once at the application entry, as usual.

<MotionProvider physics={motionPresets.balanced}>
  <Popover>
    <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
    <PopoverContent>Content</PopoverContent>
  </Popover>
</MotionProvider>
```

No alternate animated component library is created. Existing components keep their props, refs and handlers. Token values and component dimensions are unchanged. MotionProvider can override physics for a subtree or disable motion with enabled={false}; the Original pane in Motion Gallery uses this explicit comparison mode.

## Shared API

- `MotionProvider` — scoped physical settings, optional enabled flag and system reduced-motion handling. React context propagates across Radix portals.
- `motionPresets` — `responsive`, `balanced`, `gentle`; all use mass, stiffness and damping.
- `motionFactors` — pattern-specific response calibration; the same settings do not make every interaction feel identical.
- `useMotionSettings(pattern)` — spring transition plus enabled/reduced flags for page or Generative UI compositions.
- `LayoutRegion` — FLIP layout container without data or domain logic.
- `ExpandRegion` — measured natural height, reversible spring and ResizeObserver support for changing content. Closed descendants are inert and aria-hidden. Children unmount after collapse completes unless `keepMounted` is set.
- `FeedbackPress` — compatibility helper for explicitly grouped feedback. Shared Buttons detect it and avoid applying a second press scale. Normal Button/Toggle consumers need no wrapper. Keyboard actions settle immediately.

The implementation belongs to the library's primitive layer (`vendor/linear-ui/lib/motion.tsx`); `ui/motion/index.ts` is the public host entry. No page, repository, domain data, registry or renderer is imported.

## Existing components

| Pattern | Existing components | Mechanism |
| --- | --- | --- |
| Overlay | DropdownMenu, Popover, Dialog, Tooltip | AnimatePresence inside the existing Radix Portal; forced mounting only while shared motion owns the lifecycle; anchored transform origin; opacity uses a short tween, scale/position use springs |
| Selection | Tabs, SegmentedControl, Switch | Per-instance shared indicator IDs and spring-driven thumb; existing Radix/native selection semantics |
| Expand | Accordion, Collapsible | Radix state bridge and measured height; original forceMount preference is respected |
| Layout | Item and LayoutRegion | Shared Item handles size/reorder projection automatically; LayoutRegion handles an existing dynamic container. Static content has no entrance animation. |
| Feedback | Button, Toggle | Shared spring-driven native pointer feedback; CSS handles hover/focus colors. The demo adds only its simulated save state, not an alternate button. |

Transforms and opacity are preferred. Height is intentionally animated for disclosure because surrounding document flow must follow the content. Layout projection is scoped to the small demo lists; it is not enabled on the whole app.

## Portal lifecycle and focus

Radix still handles positioning/collision detection, dismissal, focus trapping and the normal autofocus/restore path. AnimatePresence owns the exit lifetime. Closed, exiting interactive overlay surfaces become inert. A targeted bridge handles reopening the same retained node during an exit: it redispatches the retained Radix autofocus DOM event (preserving currentTarget and preventDefault), and restores the opener after a subsequent close while respecting outside interaction and `onCloseAutoFocus` cancellation. Event handlers are composed, not replaced.

Overlay spring tolerances are expressed separately for position and scale to avoid keeping an invisible modal mounted for a long subpixel tail. Opacity remains a 120ms transition. A pointer exit at the balanced preset was measured around 285ms in the local browser; this is a measurement, not a fixed timing guarantee.

Reduced Motion removes spatial springs and layout projection. Scoped CSS also suppresses inherited control transitions. Keyboard-initiated interactions settle immediately; pointer interaction restores normal physical response. No autoplay, magnetic hover, particle burst, or decorative continuous loop is introduced.

## Reference study

Reference: https://designbookmark.com/motion

The following standalone interactive examples and their public HTML/JavaScript were inspected:

- https://designbookmark.com/motion-src/spring-dropdown/ — anchored response, spring targets, delayed selection feedback.
- https://designbookmark.com/motion-src/tab-pill/ — leading/trailing edge response and reversible selection movement.
- https://designbookmark.com/motion-src/expand-card/ — one continuous geometry change and retargeting on repeated interaction.
- https://designbookmark.com/motion-src/loading-success/ — clear idle/loading/confirmed states and cancellable timing.
- https://designbookmark.com/motion-src/shared/motion.js — shared spring engine, tuning and rest behavior.

These informed the movement; their engine, styles, tokens and component code were not copied. LMS uses `motion/react`, real Linear UI components and the existing semantic tokens. Reference screenshots and inspection notes are in `artifacts/motion/`.

## Evaluation

Storybook's controls and in-canvas controls expose stiffness, damping and mass. Presets provide restrained starting values. Change direction, dismiss/reopen, reorder, change disclosure content and reset feedback before it completes. The two panes are independent, so the original behavior remains available for comparison.

Motion integration was approved and is now mounted around the application. Original-vs-motion comparison remains available in the gallery. Storybook snapshot images supplement the interaction tests; they do not by themselves prove motion quality or full accessibility compliance.


## Shared integration details

Tooltip preserves Radix delay, hoverable-content grace area, keyboard focus, Escape dismissal and Portal positioning. Instant-open tooltips skip the entrance animation. Button and Toggle keep their native DOM event/ref API; pointer release/cancel retargets the spring, and no extra DOM wrapper is inserted. Existing transform CSS is excluded from the shared Button feedback path. Collapsed disclosure regions are aria-hidden and their retained children are inert until exit completes.

Storybook's shared physics toolbar sets responsive/balanced/gentle across ordinary component stories. Gallery physics controls intentionally override that value only for the comparison pane. Product/domain actions are unchanged.
