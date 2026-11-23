import { useCallback, useSyncExternalStore } from "react";

export type ThemeChoice = "system" | "light" | "dark";

const STORAGE_KEY = "linear-ui-theme";

function systemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function read(): ThemeChoice {
  if (typeof window === "undefined") return "system";
  const fromQuery = new URLSearchParams(window.location.search).get("theme");
  if (fromQuery === "light" || fromQuery === "dark" || fromQuery === "system") {
    return fromQuery;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    /* storage unavailable */
  }
  return "system";
}

function apply(choice: ThemeChoice) {
  if (typeof document === "undefined") return;
  const dark = choice === "dark" || (choice === "system" && systemPrefersDark());
  document.documentElement.classList.toggle("dark", dark);
}

/* ---- module-level store so every consumer stays in sync ------------------- */

let current: ThemeChoice = read();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function setChoice(choice: ThemeChoice) {
  current = choice;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage unavailable */
  }
  apply(choice);
  emit();
}

if (typeof window !== "undefined") {
  apply(current);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => current === "system" && apply("system"));
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      current = read();
      apply(current);
      emit();
    }
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/**
 * useTheme — mirrors Linear's "Interface theme" setting: system / light / dark.
 * Backed by a shared store (so multiple components agree), persisted to
 * localStorage, synced across tabs, and re-applied when the OS preference
 * changes while set to "system".
 */
export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => "system" as ThemeChoice,
  );
  return { theme, setTheme: useCallback(setChoice, []) };
}
