import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroDecorations() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_86%,transparent_100%)]"
        style={{
          backgroundImage:
            "linear-gradient(116deg, transparent 0 58%, color-mix(in srgb, var(--color-card) 34%, transparent) 58% 76%, transparent 76% 100%), linear-gradient(90deg, transparent 0 72%, color-mix(in srgb, var(--color-primary) 7%, transparent) 72% 100%), linear-gradient(180deg, color-mix(in srgb, var(--color-muted) 30%, transparent), transparent 62%)",
        }}
      />
      <div aria-hidden className="absolute left-0 top-0 hidden h-full w-1 bg-primary/70 lg:block" />
      <div aria-hidden className="absolute left-[5%] top-[18%] hidden h-px w-[28%] bg-border/35 lg:block" />
      <div aria-hidden className="absolute left-[5%] top-[62%] hidden h-px w-[36%] bg-border/24 lg:block" />
      <div
        aria-hidden
        className="absolute right-[6%] top-14 hidden h-[68%] w-[43%] border border-border/26 bg-card/12 lg:block"
      />
      <div aria-hidden className="absolute right-[10%] top-[24%] hidden h-px w-[31%] bg-border/25 lg:block" />
      <div aria-hidden className="absolute right-[10%] top-[52%] hidden h-px w-[26%] bg-border/20 lg:block" />
      <div aria-hidden className="absolute right-[32%] top-14 hidden h-[68%] w-px bg-border/18 lg:block" />
      <div aria-hidden className="absolute bottom-0 left-0 hidden h-px w-full bg-border/45 lg:block" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent"
      />
    </>
  );
}

export function PrimaryCtaLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-lg border border-primary bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/25 active:translate-y-0",
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function SectionTitleBlock({
  badge,
  title,
  subtitle,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl border-y border-border py-6 text-center">
      {badge && <p className="mb-2 text-sm font-medium text-primary">{badge}</p>}
      <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
