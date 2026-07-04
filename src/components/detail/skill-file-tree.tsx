"use client";

import { ChevronDown, FileText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const SKILL_FILES = [
  { id: "license" as const, name: "LICENSE.txt", size: "9.9 KB" },
  { id: "skill" as const, name: "SKILL.md", size: "8.1 KB" },
];

export type SkillFileId = (typeof SKILL_FILES)[number]["id"];

export function SkillFileTree({
  active,
  onSelect,
}: {
  active: SkillFileId;
  onSelect: (id: SkillFileId) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="sticky top-6 z-10 mb-6 overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={collapsed ? "Expand file tree" : "Collapse file tree"}
            onClick={() => setCollapsed((v) => !v)}
            className="rounded p-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", collapsed && "-rotate-90")}
            />
          </button>
          <span className="text-xs font-medium text-muted-foreground">文件资源管理器</span>
          <span className="text-xs text-muted-foreground/70">{SKILL_FILES.length} 个文件</span>
        </div>
      </div>

      {!collapsed && (
        <div className="p-2">
          {SKILL_FILES.map((file) => (
            <button
              key={file.id}
              type="button"
              onClick={() => {
                onSelect(file.id);
                if (file.id === "skill") {
                  document.getElementById("skill-md-preview")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-colors",
                active === file.id
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              )}
            >
              <span className="inline-flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                {file.name}
              </span>
              <span className="text-[10px] opacity-70">{file.size}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
