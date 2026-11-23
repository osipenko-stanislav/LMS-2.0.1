import { useCallback, useLayoutEffect, useRef, useState, type ForwardedRef } from 'react';
export function useDisclosureState(forwardedRef: ForwardedRef<HTMLDivElement>, enabled: boolean) {
  const local = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useCallback((node: HTMLDivElement | null) => {
    local.current = node;
    if (typeof forwardedRef === 'function') return forwardedRef(node);
    if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);
  useLayoutEffect(() => {
    if (!enabled || !local.current) return;
    const node = local.current;
    const sync = () => setOpen(node.dataset.state === 'open');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(node, { attributes: true, attributeFilter: ['data-state'] });
    return () => observer.disconnect();
  }, [enabled]);
  return { ref, open };
}
