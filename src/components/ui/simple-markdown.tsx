import type { ReactNode } from "react";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
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
        <code key={i} className="rounded bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          className="text-primary underline-offset-2 hover:underline"
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

export function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    nodes.push(
      <ul key={key++} className="my-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
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
        <h2 key={key++} className="mb-4 mt-8 text-2xl font-bold text-foreground first:mt-0">
          {line.slice(2)}
        </h2>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      nodes.push(
        <h3 key={key++} className="mb-3 mt-7 text-xl font-semibold text-foreground">
          {line.slice(3)}
        </h3>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      nodes.push(
        <h4 key={key++} className="mb-2 mt-5 text-lg font-semibold text-foreground">
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
      <p key={key++} className="my-4 text-base leading-relaxed text-muted-foreground">
        {renderInline(line)}
      </p>
    );
  }
  flushList();
  return <div className="insights-prose">{nodes}</div>;
}
