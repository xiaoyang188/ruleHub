import { BriefcaseBusiness } from "lucide-react";

export function CreatorOccupationChip({
  title,
  muted = false,
}: {
  title: string;
  muted?: boolean;
}) {
  return (
    <span
      title={title}
      className={`inline-flex max-w-full items-center gap-1 border border-border bg-background px-2 py-1 font-mono text-[11px] ${
        muted ? "text-muted-foreground" : "text-foreground"
      }`}
    >
      <BriefcaseBusiness className="h-3 w-3 shrink-0 text-primary" aria-hidden />
      <span className="truncate">{title}</span>
    </span>
  );
}
