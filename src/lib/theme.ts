export const THEME_STORAGE_KEY = "rulehub-theme";

export type ThemeMode = "dark" | "light" | "system";

export const THEME_MODES: ThemeMode[] = ["dark", "light", "system"];

export function getNextThemeMode(current: ThemeMode): ThemeMode {
  const index = THEME_MODES.indexOf(current);
  return THEME_MODES[(index + 1) % THEME_MODES.length];
}

export function resolveThemeClass(mode: ThemeMode): "dark" | "light" {
  if (mode === "system") {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode;
}

export function applyThemeMode(mode: ThemeMode) {
  const resolved = resolveThemeClass(mode);
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(resolved);
}

export function readStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "system" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return "dark";
}

export function persistThemeMode(mode: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

export const THEME_LABELS: Record<ThemeMode, string> = {
  dark: "深色模式",
  light: "浅色模式",
  system: "跟随系统",
};
