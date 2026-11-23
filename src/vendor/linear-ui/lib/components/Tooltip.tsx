import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { createMotionRoot, OverlayPresence, useOverlayMotion } from "../motion";
import * as RTooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils/cn";

export const TooltipProvider = RTooltip.Provider;
const Root = createMotionRoot(RTooltip.Root);
const MotionContent = motion.create(RTooltip.Content);

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  /** Right-aligned shortcut hint, e.g. "⌘K". */
  shortcut?: string;
  side?: RTooltip.TooltipContentProps["side"];
  align?: RTooltip.TooltipContentProps["align"];
  delayDuration?: number;
}

/**
 * Tooltip — Linear's is a compact elevated chip: 12px text, hairline border,
 * popover shadow, an optional dimmed keyboard shortcut on the right.
 * Wrap your app (or a subtree) in <TooltipProvider> once.
 */
export function Tooltip({
  children,
  content,
  shortcut,
  side = "top",
  align = "center",
  delayDuration = 250,
}: TooltipProps) {
  return (
    <Root delayDuration={delayDuration}>
      <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
      <TooltipBody content={content} shortcut={shortcut} side={side} align={align} />
    </Root>
  );
}

function TooltipBody({ content, shortcut, side, align }: Pick<TooltipProps, 'content' | 'shortcut' | 'side' | 'align'>) {
  const animation = useOverlayMotion();
  const [instant, setInstant] = useState(false);
  const ref = useCallback((node: HTMLDivElement | null) => { if (node) setInstant(node.dataset.state === 'instant-open'); }, []);
  const Content = (animation.enabled ? MotionContent : RTooltip.Content) as typeof RTooltip.Content;
  const animationProps = animation.enabled ? { ...animation.props,
    initial: instant || animation.reduced ? false as const : { opacity: 0, scale: 0.97, y: side === 'top' ? 3 : -3 },
    transition: instant ? { duration: 0 } : animation.props.transition,
  } : {};
  return (
    <RTooltip.Portal forceMount={animation.enabled ? true : undefined}>
      <OverlayPresence enabled={animation.enabled} open={animation.open}>
        <Content
          {...animationProps}
          ref={ref}
          forceMount={animation.enabled ? true : undefined}
          side={side}
          align={align}
          sideOffset={6}
          className={cn(
            "z-50 flex items-center gap-2 rounded-md border border-border bg-bg-elevated px-2 py-1",
            "text-xs text-text-primary shadow-popover select-none",
            "origin-[var(--radix-tooltip-content-transform-origin)]",
            "data-[state=delayed-open]:animate-none",
            animation.props.className,
          )}
        >
          {content}
          {shortcut && <span className="font-mono text-2xs text-text-tertiary">{shortcut}</span>}
          <RTooltip.Arrow className="fill-bg-elevated" />
        </Content>
      </OverlayPresence>
    </RTooltip.Portal>
  );
}
