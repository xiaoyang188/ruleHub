"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function parseFrontmatter(content: string) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { fields: [] as { key: string; value: string }[], body: content };

  const fields = match[1]
    .split("\n")
    .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
    .filter(Boolean)
    .map((m) => ({ key: m![1], value: m![2] }));

  return { fields, body: match[2] };
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-muted/50 px-1 py-0.5 font-mono text-[11px]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    nodes.push(
      <ul key={key++} className="my-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
        {listItems.map((item, idx) => (
          <li key={idx}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const line of lines) {
    if (line.startsWith("# ")) {
      flushList();
      nodes.push(
        <h2 key={key++} className="mb-3 mt-6 text-xl font-bold text-foreground first:mt-0">
          {line.slice(2)}
        </h2>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      nodes.push(
        <h3 key={key++} className="mb-2 mt-5 text-base font-semibold text-foreground">
          {line.slice(3)}
        </h3>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      nodes.push(
        <h4 key={key++} className="mb-2 mt-4 text-sm font-semibold text-foreground">
          {line.slice(4)}
        </h4>
      );
      continue;
    }
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      continue;
    }
    if (!line.trim()) {
      flushList();
      continue;
    }
    flushList();
    nodes.push(
      <p key={key++} className="my-3 text-sm leading-relaxed text-muted-foreground">
        {renderInline(line)}
      </p>
    );
  }
  flushList();

  return <>{nodes}</>;
}

function FrontmatterTable({ fields }: { fields: { key: string; value: string }[] }) {
  if (fields.length === 0) return null;

  return (
    <table className="w-full table-fixed border-collapse overflow-hidden rounded-xl border border-primary/30">
      <tbody>
        {fields.map((field) => (
          <tr
            key={field.key}
            className="border-b border-primary/30 transition-colors last:border-b-0 hover:bg-primary/5"
          >
            <td className="w-1/4 border-r border-primary/30 bg-primary/10 px-4 py-3 align-top font-semibold text-primary">
              {field.key}
            </td>
            <td className="break-words px-4 py-3 align-top text-muted-foreground">{field.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SkillMdPreview({
  fileName,
  content,
  className,
}: {
  fileName: string;
  content: string;
  className?: string;
}) {
  const isSkillMd = fileName === "SKILL.md";
  const { fields, body } = isSkillMd ? parseFrontmatter(content) : { fields: [], body: content };

  return (
    <div
      id={isSkillMd ? "skill-md-preview" : undefined}
      className={cn(
        "scroll-mt-[420px] overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">{fileName}</span>
        <span className="rounded-md border border-border bg-muted/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          readonly
        </span>
      </div>
      <div className="space-y-4 overflow-auto p-4 sm:p-5">
        {isSkillMd ? (
          <>
            <FrontmatterTable fields={fields} />
            {body.trim() ? <SimpleMarkdown content={body} /> : null}
          </>
        ) : (
          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
            <code>{content}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
