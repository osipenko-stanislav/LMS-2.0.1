import { createContext, useContext, useEffect, useLayoutEffect, useRef, useId, useState, type ComponentType, type PropsWithChildren, type ForwardedRef, type PointerEvent as ReactPointerEvent, useCallback } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useMotionValue, useSpring, useMotionValueEvent, type Transition } from 'motion/react';

export interface MotionPhysics { stiffness: number; damping: number; mass: number }
export const motionPresets = {
  responsive: { stiffness: 520, damping: 38, mass: 0.8 },
  balanced: { stiffness: 380, damping: 32, mass: 1 },
  gentle: { stiffness: 260, damping: 30, mass: 1.1 },
} satisfies Record<string, MotionPhysics>;
export type MotionPattern = 'overlay' | 'selection' | 'expand' | 'layout' | 'feedback';
export const motionFactors = { overlay: 1.1, selection: 1.35, expand: 0.8, layout: 0.9, feedback: 1.7 } as const;
const KeyboardContext = createContext(false);
const PhysicsContext = createContext<MotionPhysics | null>(motionPresets.balanced);
export function MotionProvider({ physics = motionPresets.balanced, enabled = true, children }: PropsWithChildren<{ physics?: MotionPhysics; enabled?: boolean }>) {
  const [keyboard, setKeyboard] = useState(false);
  useEffect(() => {
    const key = () => setKeyboard(true);
    const pointer = () => setKeyboard(false);
    window.addEventListener('keydown', key, true);
    window.addEventListener('pointerdown', pointer, true);
    return () => { window.removeEventListener('keydown', key, true); window.removeEventListener('pointerdown', pointer, true); };
  }, []);
  return <MotionConfig reducedMotion="user"><KeyboardContext.Provider value={keyboard}><PhysicsContext.Provider value={enabled ? physics : null}>{children}</PhysicsContext.Provider></KeyboardContext.Provider></MotionConfig>;
}
export function useMotionSettings(pattern: MotionPattern = 'layout') {
  const physics = useContext(PhysicsContext);
  const systemReduced = useReducedMotion() ?? false;
  const keyboard = useContext(KeyboardContext);
  const reduced = systemReduced || keyboard;
  const enabled = physics !== null;
  const factor = motionFactors[pattern];
  const transition: Transition = !enabled || reduced
    ? { type: 'tween', duration: 0 }
    : { type: 'spring', ...physics, stiffness: physics.stiffness * factor, damping: physics.damping * Math.sqrt(factor), restDelta: pattern === 'expand' ? 0.1 : 0.01, restSpeed: pattern === 'expand' ? 1 : 0.1 };
  return { enabled, reduced, transition };
}

const OverlayState = createContext<boolean | null>(null);
type RootProps = PropsWithChildren<{ open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void }>;
// Keeps the original controlled/uncontrolled API and callbacks. The state bridge is used while shared motion is enabled.
export function createMotionRoot<P extends RootProps>(Root: ComponentType<P>) {
  return function MotionRoot(props: P) {
    const { enabled } = useMotionSettings('overlay');
    const [internal, setInternal] = useState(props.defaultOpen ?? false);
    if (!enabled) return <Root {...props} />;
    const open = props.open ?? internal;
    return <OverlayState.Provider value={open}><Root {...props} open={open} onOpenChange={next => {
      if (props.open === undefined) setInternal(next);
      props.onOpenChange?.(next);
    }} /></OverlayState.Provider>;
  };
}
export function useOverlayMotion(modal = false) {
  const settings = useMotionSettings('overlay');
  const open = useContext(OverlayState) ?? false;
  const hidden = settings.reduced ? { opacity: 0, scale: 1, y: 0 } : { opacity: 0, scale: modal ? 0.96 : 0.95, y: modal ? 10 : -5 };
  return { ...settings, open, props: settings.enabled ? {
    initial: hidden, animate: { opacity: 1, scale: 1, y: 0 }, exit: hidden,
    transition: {
      ...settings.transition,
      scale: { ...settings.transition, restDelta: 0.002, restSpeed: 0.1 },
      y: { ...settings.transition, restDelta: 0.15, restSpeed: 10 },
      opacity: { duration: settings.reduced ? 0 : 0.12 },
    },
    className: 'lms-motion-surface',
  } : {} };
}
export function OverlayPresence({ enabled, open, children }: PropsWithChildren<{ enabled: boolean; open: boolean }>) {
  return enabled ? <AnimatePresence>{open && children}</AnimatePresence> : children;
}

// Render inside an active trigger: its parent retains all semantics and hit area.
export function SelectionIndicator({ group, kind = 'pill' }: { group: string; kind?: 'pill' | 'underline' }) {
  const { enabled, reduced, transition } = useMotionSettings('selection');
  if (!enabled) return null;
  return <motion.span aria-hidden="true" data-motion-indicator="" layoutId={reduced ? undefined : group} initial={false} transition={transition}
    className={kind === 'underline' ? 'pointer-events-none absolute inset-x-0 -bottom-px h-0.5 bg-accent' : 'pointer-events-none absolute inset-0 rounded-[5px] bg-bg-primary shadow-xs ring-1 ring-border-strong/60'} />;
}
export function useMotionGroup() { return useId(); }

export function ExpandRegion({ open, keepMounted = false, children }: PropsWithChildren<{ open: boolean; keepMounted?: boolean }>) {
  const { enabled, reduced, transition } = useMotionSettings('expand');
  const inner = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open || keepMounted);
  const liveOpen = useRef(open);
  liveOpen.current = open;
  useLayoutEffect(() => { if (open || keepMounted) setMounted(true); }, [open, keepMounted]);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    if (!enabled || !inner.current) return;
    const node = inner.current;
    const measure = () => setHeight(node.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);
  if (!enabled) return open ? <div>{children}</div> : null;
  return <motion.div initial={false} animate={{ height: open ? height : 0 }} transition={transition}
    onAnimationComplete={() => { if (!liveOpen.current && !keepMounted) setMounted(false); }}
    style={{ overflow: 'hidden' }} inert={!open} aria-hidden={!open} data-motion-expand="" data-reduced={reduced}>
    <div ref={inner}>{mounted ? children : null}</div>
  </motion.div>;
}
export function LayoutRegion({ children, className }: PropsWithChildren<{ className?: string }>) {
  const { enabled, reduced, transition } = useMotionSettings('layout');
  return <motion.div layout={enabled && !reduced} transition={transition} className={className}>{children}</motion.div>;
}
export function FeedbackPress({ children }: PropsWithChildren) {
  const { enabled, reduced, transition } = useMotionSettings('feedback');
  return <motion.div className="inline-flex lms-feedback-group" whileTap={enabled && !reduced ? { scale: 0.97 } : undefined} transition={transition}>{children}</motion.div>;
}

const SelectionState = createContext<{ value: string; group: string } | null>(null);
type SelectionRootProps = PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void }>;
export function createSelectionRoot<P extends SelectionRootProps>(Root: ComponentType<P>) {
  return function SelectionRoot(props: P) {
    const { enabled } = useMotionSettings('selection');
    const group = useId();
    const [internal, setInternal] = useState(props.defaultValue ?? '');
    if (!enabled) return <Root {...props} />;
    const value = props.value ?? internal;
    return <SelectionState.Provider value={{ value, group }}><Root {...props} value={value} onValueChange={next => {
      if (props.value === undefined) setInternal(next);
      props.onValueChange?.(next);
    }} /></SelectionState.Provider>;
  };
}
export function useSelectionState() { return useContext(SelectionState); }


// Native DOM feedback keeps React's original event/ref API, including Radix asChild composition.
export function usePressFeedback<T extends HTMLElement>(forwardedRef: ForwardedRef<T>) {
  const { enabled, reduced, transition } = useMotionSettings('feedback');
  const node = useRef<T | null>(null);
  const target = useMotionValue(1);
  const spring = useSpring(target, transition);
  const cleanup = useRef<(() => void) | undefined>(undefined);
  const originalScale = useRef('');
  const ref = useCallback((element: T | null) => {
    node.current = element;
    if (element) originalScale.current = element.style.scale;
    if (typeof forwardedRef === 'function') return forwardedRef(element);
    if (forwardedRef) forwardedRef.current = element;
  }, [forwardedRef]);
  useMotionValueEvent(spring, 'change', value => { if (node.current && enabled && !reduced) node.current.style.scale = String(value); });
  useEffect(() => {
    if (!enabled || reduced) { spring.jump(1); if (node.current) node.current.style.scale = originalScale.current; }
    return () => cleanup.current?.();
  }, [enabled, reduced, spring]);
  function release() { cleanup.current?.(); target.set(1); }
  return {
    ref, enabled,
    press(event: ReactPointerEvent<T>) {
      if (!enabled || reduced || event.defaultPrevented || event.button !== 0) return;
      // A caller still using FeedbackPress owns the gesture; avoid stacking two scales.
      if (node.current?.closest('.lms-feedback-group')) return;
      cleanup.current?.();
      target.set(0.97);
      const stop = () => release();
      window.addEventListener('pointerup', stop);
      window.addEventListener('pointercancel', stop);
      cleanup.current = () => { window.removeEventListener('pointerup', stop); window.removeEventListener('pointercancel', stop); cleanup.current = undefined; };
    },
    release,
  };
}
