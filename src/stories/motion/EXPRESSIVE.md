# Expressive Motion — local studies

These three stories extend Linear UI/Motion Gallery only. Shared components, tokens, motion defaults and application behavior are unchanged. Demo content is isolated in expressive-fixtures.ts and explicitly marked as fixtures.

- Morphing Dropdown uses one retained surface: 172×40 becomes 272×236, with simultaneous position/radius changes and staggered content. Closing reverses the same springs. The menu implements roving arrow/Home/End navigation, native item activation, Escape, outside/blur dismissal and focus return.
- Expandable Card uses a scoped LayoutGroup and stable shared surface/image/title/price identities. The compact thumbnail becomes a wide upper panel while title and price relocate. Siblings leave and return; focus follows expansion and returns to the compact card. Exiting content is inert.
- Elastic Selection uses two independent edge springs. The leading edge is stiff; the trailing edge follows with softer stiffness/damping. Changing direction swaps their roles while retaining current values. Keyboard navigation settles immediately; ResizeObserver snaps only on real container-width changes, not every selection.

Reference inspection: designbookmark.com/motion-src/spring-dropdown/dropdown.js, tab-pill/tabs.js and expand-card/expand.js. The reference engine and visual styles were not copied; the same physical principles are expressed through motion/react and existing Linear UI tokens. Physics remain editable through Storybook Controls, with the existing theme toolbar for Light/Dark.

Validation: typecheck, application build and Storybook build pass. Eight targeted Chrome tests cover both themes, 1440/375 px, Reduced Motion, open/close/repeat behavior and keyboard/focus semantics. Non-reduced selection trajectories must exceed 1.25× the indicator's resting width; reduced trajectories must remain within 2 px of the resting width. Render captures and pointer-reversal measurements are in artifacts/expressive-motion/.
