import * as RDirection from "@radix-ui/react-direction";

/**
 * DirectionProvider — sets the reading direction (`ltr` / `rtl`) for every
 * Radix-based component beneath it. Wrap your app once.
 */
export const DirectionProvider = RDirection.Provider;
export const useDirection = RDirection.useDirection;
