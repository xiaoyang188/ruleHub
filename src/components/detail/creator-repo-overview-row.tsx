import Link from "next/link";
import { CreatorOccupationChip } from "@/components/detail/creator-occupation-chip";
import type { RepoGroup } from "@/lib/creator-profile";
import { formatRepoRank } from "@/lib/creator-profile";

export function CreatorRepoOverviewRow({
  group,
  rank,
}: {
  group: RepoGroup;
  rank: number;
}) {
  const classifiedLabel =
    group.occupationCount > 0
      ? `${group.occupationCount} 个职业分类 · 已分类 100%`
      : "职业分类待补全";

  const displayTitles =
    group.occupationTitles.length > 0 ? group.occupationTitles : ["未分类"];
  const chipsMuted = group.occupationCount === 0;

  return (
    <Link
      href={`#repo-${group.repoName}`}
      className="grid gap-3 px-4 py-3 transition-colors hover:bg-muted/25 lg:grid-cols-[42px_minmax(180px,0.8fr)_minmax(180px,1fr)_110px]"
    >
      <div className="font-mono text-xs text-muted-foreground">{formatRepoRank(rank)}</div>

      <div className="min-w-0">
        <div className="truncate font-semibold text-foreground">{group.repoName}</div>
        <div className="mt-1 font-mono text-[11px] text-muted-foreground">
          {group.skills.length} 个 skills · {group.latestDate}
        </div>
      </div>

      <div className="min-w-0">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            {displayTitles.slice(0, 5).map((title) => (
              <CreatorOccupationChip key={title} title={title} muted={chipsMuted} />
            ))}
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">{classifiedLabel}</p>
        </div>
      </div>

      <div className="min-w-0 font-mono text-xs text-muted-foreground">
        <div className="flex items-center justify-between gap-2">
          <span>{group.sharePercent}%</span>
          <span className="text-[11px]">占比</span>
        </div>
        <div className="mt-2 h-1.5 bg-muted">
          <div
            className="h-full bg-primary"
            style={{ width: `${Math.min(100, group.sharePercent)}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
