import type { Skill } from "@/data/mock";
import { ALL_LISTED_SKILLS } from "@/data/detail";
import {
  mapApiSkill,
  searchSkills,
  type SearchSkill,
  type SkillsMpSkill,
} from "@/lib/skillsmp-api";
import { getSkillBySlugParts, getSkillRepoName, getSkillSlug } from "@/lib/skill-url";

export function buildCreatorSkillPath(author: string, repo: string, slug: string) {
  return `/creators/${author}/${repo}/${slug}`;
}

export function slugToSearchQueries(slug: string, author: string): string[] {
  const queries = new Set<string>();

  if (slug.startsWith("skills-")) {
    queries.add(slug.slice("skills-".length));
  }

  queries.add(slug);
  queries.add(slug.replace(/-/g, " "));
  queries.add(`${author} ${slug.replace(/-/g, " ")}`);

  const tail = slug.split("-").slice(-2).join("-");
  if (tail !== slug) queries.add(tail);

  return [...queries];
}

function matchesDetailPath(skill: SearchSkill, author: string, repo: string, slug: string) {
  const target = buildCreatorSkillPath(author, repo, slug);
  if (skill.detailHref === target) return true;

  if (!skill.detailHref) return false;
  const parts = skill.detailHref.split("/").filter(Boolean);
  return (
    parts.length >= 4 &&
    parts[0] === "creators" &&
    parts[1] === author &&
    parts[2] === repo &&
    parts[3] === slug
  );
}

export function findLocalSkill(author: string, repo: string, slug: string): Skill | undefined {
  const exact = getSkillBySlugParts(ALL_LISTED_SKILLS, author, repo, slug);
  if (exact) return exact;

  return ALL_LISTED_SKILLS.find((skill) => {
    const repoName = getSkillRepoName(skill.repo);
    if (skill.author !== author || repoName !== repo) return false;
    return (
      getSkillSlug(skill) === slug ||
      skill.name === slug ||
      slug.endsWith(skill.name) ||
      slug === `skills-${skill.name}`
    );
  });
}

async function fetchRawMatch(
  author: string,
  repo: string,
  slug: string
): Promise<SkillsMpSkill | null> {
  for (const q of slugToSearchQueries(slug, author)) {
    const sp = new URLSearchParams({ q, limit: "100", sortBy: "stars" });
    try {
      const res = await fetch(`https://skillsmp.com/api/v1/skills/search?${sp}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      });
      if (!res.ok) continue;

      const json = (await res.json()) as { data?: { skills: SkillsMpSkill[] } };
      const match = json.data?.skills.find((s) =>
        matchesDetailPath(mapApiSkill(s), author, repo, slug)
      );
      if (match) return match;
    } catch {
      continue;
    }
  }
  return null;
}

export type ResolvedSkillDetail = SearchSkill & {
  githubTreeUrl?: string;
  fromApi: boolean;
};

export async function resolveSkillDetail(
  author: string,
  repo: string,
  slug: string
): Promise<ResolvedSkillDetail | null> {
  const local = findLocalSkill(author, repo, slug);
  if (local) {
    return {
      ...local,
      detailHref: buildCreatorSkillPath(author, repo, slug),
      fromApi: false,
    };
  }

  const raw = await fetchRawMatch(author, repo, slug);
  if (!raw) return null;

  return {
    ...mapApiSkill(raw),
    detailHref: buildCreatorSkillPath(author, repo, slug),
    githubTreeUrl: raw.githubUrl,
    fromApi: true,
  };
}

export async function resolveSkillsByAuthor(author: string): Promise<SearchSkill[]> {
  const local = ALL_LISTED_SKILLS.filter((s) => s.author === author).map((s) => ({
    ...s,
    detailHref: `/creators/${s.author}/${getSkillRepoName(s.repo)}/${getSkillSlug(s)}`,
  }));

  const apiSkills: SearchSkill[] = [];
  try {
    for (let page = 1; page <= 8; page++) {
      const result = await searchSkills({ q: author, limit: 100, page, sortBy: "stars" });
      if (!result.fromApi) break;

      for (const skill of result.skills) {
        if (skill.author !== author) continue;
        const key = skill.detailHref ?? skill.id;
        if (apiSkills.some((s) => (s.detailHref ?? s.id) === key)) continue;
        apiSkills.push(skill);
      }

      if (apiSkills.length >= 100 || result.skills.length < 100) break;
    }
  } catch {
    // fall back to local mock data
  }

  if (apiSkills.length > 0) return apiSkills;
  return local;
}

export async function resolveSkillsByRepo(
  author: string,
  repo: string
): Promise<SearchSkill[]> {
  const local = ALL_LISTED_SKILLS.filter(
    (s) => s.author === author && getSkillRepoName(s.repo) === repo
  );
  if (local.length > 0) {
    return local.map((s) => ({
      ...s,
      detailHref: `/creators/${author}/${repo}/${getSkillSlug(s)}`,
    }));
  }

  const byAuthor = await resolveSkillsByAuthor(author);
  return byAuthor.filter((s) => {
    const repoName = getSkillRepoName(s.repo);
    return repoName === repo || s.detailHref?.includes(`/creators/${author}/${repo}/`);
  });
}
