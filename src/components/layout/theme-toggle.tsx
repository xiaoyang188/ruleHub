"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  applyThemeMode,
  persistThemeMode,
  readStoredThemeMode,
  THEME_LABELS,
  type ThemeMode,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const ICONS = {
  dark: Moon,
  light: Sun,
  system: Monitor,
} as const;

export function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readStoredThemeMode());
    setMounted(true);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (readStoredThemeMode() === "system") applyThemeMode("system");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const cycleTheme = () => {
    const order: ThemeMode[] = ["dark", "light", "system"];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
    persistThemeMode(next);
    applyThemeMode(next);
  };

  const Icon = ICONS[mode];
  const label = mounted ? THEME_LABELS[mode] : "切换主题";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/50 hover:text-foreground",
        className
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}
