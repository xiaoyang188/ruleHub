import { searchSkills, browseSkills, resolveBrowseQuery } from "@/lib/skillsmp-api";
import { resolveOccupationApiSlug } from "@/lib/occupation-slugs";
import { SEARCH_RESULTS } from "@/data/catalog";
import { FEATURED_SKILLS } from "@/data/mock";
import { getSkillDetailPath } from "@/lib/skill-url";

function sortByStars(skills: typeof FEATURED_SKILLS) {
  return [...skills].sort((a, b) => {
    const parse = (s: string) => {
      const n = parseFloat(s.replace(/k|m/i, ""));
      if (s.toLowerCase().includes("m")) return n * 1_000_000;
      if (s.toLowerCase().includes("k")) return n * 1_000;
      return n;
    };
    return parse(b.stars) - parse(a.stars);
  });
}

function withDetailHref(skills: typeof FEATURED_SKILLS) {
  return skills.map((s) => ({ ...s, detailHref: getSkillDetailPath(s) }));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "12");
  const sortBy = searchParams.get("sortBy") === "recent" ? "recent" : "stars";
  const category = searchParams.get("category") ?? undefined;
  const occupationRaw = searchParams.get("occupation") ?? undefined;
  const occupation = occupationRaw ? resolveOccupationApiSlug(occupationRaw) : undefined;

  if (!q) {
    const result = await browseSkills({
      page,
      limit,
      sortBy,
      category,
      occupation,
      q: resolveBrowseQuery({ category }),
    });
    if (result.fromApi && result.skills.length > 0) {
      return Response.json({
        success: true,
        skills: result.skills,
        total: result.total,
        fromApi: true,
        hasNext: result.hasNext,
      });
    }

    const fallback = withDetailHref(sortByStars(FEATURED_SKILLS)).slice(0, limit);
    return Response.json({
      success: true,
      skills: fallback,
      total: fallback.length,
      fromApi: false,
      hasNext: false,
    });
  }

  const result = await searchSkills({
    q,
    page,
    limit,
    sortBy,
    category,
    occupation: occupationRaw,
  });

  if (result.fromApi) {
    return Response.json({
      success: true,
      skills: result.skills,
      total: result.total,
      fromApi: true,
      hasNext: result.hasNext,
    });
  }

  const fallback = SEARCH_RESULTS.filter(
    (s) =>
      s.name.includes(q.toLowerCase()) ||
      s.description.toLowerCase().includes(q.toLowerCase()) ||
      s.author.includes(q.toLowerCase())
  ).map((s) => ({ ...s, detailHref: undefined }));

  return Response.json({
    success: true,
    skills: fallback,
    total: fallback.length,
    fromApi: false,
    hasNext: false,
  });
}
