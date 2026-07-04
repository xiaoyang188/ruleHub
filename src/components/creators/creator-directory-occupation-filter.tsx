"use client";

import { Briefcase, ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  CREATOR_OCCUPATION_FILTER_GROUPS,
  getCreatorOccupationLabel,
} from "@/data/creator-occupation-filter";
import { cn } from "@/lib/utils";

function CollapsibleChildren({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
        open ? "opacity-100" : "opacity-0"
      )}
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function CreatorDirectoryOccupationFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const selectedLabel = getCreatorOccupationLabel(value);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CREATOR_OCCUPATION_FILTER_GROUPS;

    return CREATOR_OCCUPATION_FILTER_GROUPS.map((group) => {
      const groupMatch = group.name.toLowerCase().includes(q);
      const matchedChildren = group.children.filter((child) =>
        child.name.toLowerCase().includes(q)
      );

      if (groupMatch) return group;
      if (matchedChildren.length > 0) return { ...group, children: matchedChildren };
      return null;
    }).filter(Boolean) as typeof CREATOR_OCCUPATION_FILTER_GROUPS;
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const q = query.trim().toLowerCase();
    if (!q) return;

    setExpanded((current) => {
      const next = { ...current };
      for (const group of CREATOR_OCCUPATION_FILTER_GROUPS) {
        const childMatch = group.children.some((child) =>
          child.name.toLowerCase().includes(q)
        );
        if (childMatch) next[group.id] = true;
      }
      return next;
    });
  }, [open, query]);

  const selectGroup = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  const clearSelection = (e: MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setOpen(false);
  };

  return (
    <div className="inline-flex w-full items-center gap-2 md:w-auto">
      <div className="relative w-full md:w-[420px]">
        <button
          type="button"
          aria-label="按职业筛选创作者"
          aria-haspopup="dialog"
          aria-expanded={open}
          data-state={open ? "open" : "closed"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-[42px] w-full cursor-pointer items-center justify-start gap-1.5 rounded-none border px-3 py-[10px] font-mono text-sm font-medium transition-colors hover:border-primary md:w-[420px]",
            value
              ? "border-primary/60 bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground"
          )}
        >
          <Briefcase className="h-3 w-3 shrink-0 text-muted-foreground" />
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-left",
              value ? "max-w-[200px] text-foreground" : ""
            )}
          >
            {selectedLabel || "全部职业"}
          </span>
          {value && (
            <span
              role="button"
              tabIndex={0}
              aria-label="清除职业筛选"
              onClick={clearSelection}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  clearSelection(e as unknown as MouseEvent);
                }
              }}
              className="ml-0.5 shrink-0 text-red-400 hover:text-red-300"
            >
              <X className="h-3 w-3" />
            </span>
          )}
          <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>

        {open && (
          <>
            <button
              type="button"
              aria-label="关闭筛选"
              className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-200"
              onClick={() => setOpen(false)}
            />
            <div
              ref={panelRef}
              role="dialog"
              aria-label="按职业筛选创作者"
              className={cn(
                "absolute left-0 top-full z-50 mt-1 w-full min-w-[380px] max-w-[90vw] origin-top overflow-hidden rounded-xl border border-border bg-background shadow-2xl transition-all duration-200 ease-out md:w-[420px]",
                open ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索职业..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="max-h-[360px] overflow-y-auto p-1">
                {!value && (
                  <button
                    type="button"
                    onClick={() => selectGroup("")}
                    className="flex w-full items-center gap-1 rounded-lg px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-primary/10"
                  >
                    <span className="w-4 shrink-0" aria-hidden />
                    <span className="flex-1 whitespace-nowrap">全部职业</span>
                  </button>
                )}

                {filteredGroups.map((group) => {
                  const isExpanded = expanded[group.id] ?? false;
                  const isSelected = value === group.id;

                  return (
                    <div key={group.id}>
                      <div
                        className={cn(
                          "flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-primary/10",
                          isSelected && "bg-primary/10"
                        )}
                      >
                        <button
                          type="button"
                          aria-label={isExpanded ? "收起" : "展开"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded((current) => ({
                              ...current,
                              [group.id]: !current[group.id],
                            }));
                          }}
                          className="cursor-pointer rounded p-0.5 hover:bg-muted"
                        >
                          <ChevronRight
                            className={cn(
                              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                              isExpanded && "rotate-90"
                            )}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => selectGroup(group.id)}
                          className="min-w-0 flex-1 cursor-pointer truncate whitespace-nowrap text-left text-foreground"
                        >
                          {group.name}
                        </button>
                      </div>

                      <CollapsibleChildren open={isExpanded}>
                        <div className="pb-1">
                          {group.children.map((child) => (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => selectGroup(group.id)}
                              className="flex w-full items-center gap-2 rounded-lg py-1.5 pl-8 pr-2 text-left text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                            >
                              <span className="truncate">{child.name}</span>
                              <span className="ml-auto shrink-0 text-[11px] text-muted-foreground/70">
                                {child.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      </CollapsibleChildren>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
