import { useCallback, useLayoutEffect, useRef, type ForwardedRef } from 'react';

// AnimatePresence can reverse an exit without mounting a new Radix FocusScope.
// Replay only that interrupted-open autofocus; ordinary opens remain owned by Radix.
export function useOverlayFocus(forwardedRef: ForwardedRef<HTMLDivElement>, enabled: boolean, open: boolean) {
  const local = useRef<HTMLDivElement | null>(null);
  const lastNode = useRef<HTMLDivElement | null>(null);
  const wasOpen = useRef(open);
  const liveOpen = useRef(open);
  liveOpen.current = open;
  const reentered = useRef(false);
  const opener = useRef<HTMLElement | null>(null);
  const outside = useRef<EventTarget | null>(null);
  const ref = useCallback((node: HTMLDivElement | null) => {
    local.current = node;
    if (typeof forwardedRef === 'function') return forwardedRef(node);
    if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);
  useLayoutEffect(() => {
    const node = local.current;
    if (enabled && node) {
      node.inert = !open;
      if (open && !wasOpen.current && lastNode.current === node) {
        reentered.current = true;
        opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        outside.current = null;
        const event = new CustomEvent('focusScope.autoFocusOnMount', { bubbles: false, cancelable: true });
        // Reuse Radix's retained listener: preserves currentTarget and preventDefault.
        node.dispatchEvent(event);
        if (!event.defaultPrevented && !node.contains(document.activeElement)) {
          const candidates = Array.from(node.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
          const target = candidates.find(candidate => candidate.getClientRects().length && !candidate.closest('[inert]')) ?? node;
          target.focus({ preventScroll: true });
        }
      }
    }
    lastNode.current = node;
    wasOpen.current = open;
  }, [enabled, open]);
  return {
    ref,
    onOutside(target: EventTarget | null) { if (liveOpen.current) outside.current = target; },
    onClose(event: Event) {
      const target = opener.current;
      if (enabled && reentered.current && !event.defaultPrevented && target?.isConnected && (!outside.current || (outside.current instanceof Node && target.contains(outside.current)))) {
        event.preventDefault();
        target.focus({ preventScroll: true });
      }
      reentered.current = false;
    },
  };
}
