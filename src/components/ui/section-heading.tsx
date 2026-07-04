import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-4">
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
