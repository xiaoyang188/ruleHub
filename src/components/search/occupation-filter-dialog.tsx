"use client";

import { Briefcase, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OCCUPATIONS } from "@/data/mock";
import { cn } from "@/lib/utils";

export function OccupationFilterDialog({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const selected = OCCUPATIONS.find((o) => o.id === value);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="按职业筛选"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card/50 px-4 py-[10px] text-xs font-medium transition-colors hover:border-primary",
          selected && "border-primary/50"
        )}
      >
        <Briefcase className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden />
        <span className={cn("truncate", selected ? "text-primary" : "text-muted-foreground")}>
          {selected ? selected.name.replace(/类职业$/, "") : "职业"}
        </span>
        <ChevronDown
          className={cn(
            "ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="关闭"
            className="fixed inset-0 z-40 bg-background/70"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="按职业筛选"
            className="fixed left-1/2 top-1/2 z-50 max-h-[min(70vh,520px)] w-[min(calc(100vw-2rem),420px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-foreground">按职业筛选</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-[min(60vh,460px)] overflow-y-auto p-2">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/40",
                    !value ? "bg-primary/10 font-medium text-primary" : "text-foreground"
                  )}
                >
                  全部职业
                </button>
              </li>
              {OCCUPATIONS.map((occ) => (
                <li key={occ.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(occ.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/40",
                      value === occ.id ? "bg-primary/10 font-medium text-primary" : "text-foreground"
                    )}
                  >
                    <span className="block">{occ.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{occ.count} 个技能</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
