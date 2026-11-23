import { useCallback, type RefCallback } from 'react';

// Capture authored artwork before enabling the extra background layers.
// Existing image layers retain their own size, position, repeat and clipping.
export function useGradientBorder<T extends HTMLElement>(forwardRef?: RefCallback<T>) {
  return useCallback((node: T | null) => {
    if (node) {
      const css = getComputedStyle(node);
      if (!node.hasAttribute('data-gradient-border')) {
        const image = css.backgroundImage;
        node.style.setProperty('--gradient-artwork', image === 'none' ? 'linear-gradient(transparent, transparent)' : image);
        node.style.setProperty('--gradient-artwork-size', css.backgroundSize);
        node.style.setProperty('--gradient-artwork-position', css.backgroundPosition);
        node.style.setProperty('--gradient-artwork-repeat', css.backgroundRepeat);
        node.style.setProperty('--gradient-artwork-clip', css.backgroundClip);
        node.style.setProperty('--gradient-artwork-origin', css.backgroundOrigin);
        node.setAttribute('data-gradient-border', '');
      }
    }
    return forwardRef?.(node);
  }, [forwardRef]);
}
