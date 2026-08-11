import { SOC_POSITIONS } from "@/data/detail";
import { OCCUPATIONS, STATS } from "@/data/mock";

export interface OccupationLeaf {
  id: string;
  name: string;
  count: string;
  href: string;
}

export interface OccupationSubGroup {
  id: string;
  name: string;
  socCode: string;
  count: string;
  href: string;
  children: OccupationLeaf[];
}

export interface OccupationMajorGroup {
  id: string;
  name: string;
  socCode: string;
  count: string;
  href: string;
  subgroups: OccupationSubGroup[];
}

const SOC_MAJOR_CODES: Record<string, string> = {
  "1": "15-0000",
  "2": "13-0000",
  "3": "27-0000",
  "4": "43-0000",
  "5": "23-0000",
  "6": "25-0000",
  "7": "19-0000",
  "8": "11-0000",
};

function leafFromSoc(
  occupationId: string,
  code: string,
  title: string,
  count: string
): OccupationLeaf {
  return {
    id: `${occupationId}-${code}`,
    name: title,
    count,
    href: `/search?q=${encodeURIComponent(title)}`,
  };
}

function buildSubgroups(occupationId: string, occupationName: string): OccupationSubGroup[] {
  const positions = SOC_POSITIONS[occupationId] ?? [];
  if (positions.length === 0) {
    return [
      {
        id: `${occupationId}-general`,
        name: occupationName,
        socCode: SOC_MAJOR_CODES[occupationId] ?? "00-0000",
        count: OCCUPATIONS.find((o) => o.id === occupationId)?.count ?? "0",
        href: `/occupations/${occupationId}`,
        children: [],
      },
    ];
  }

  const midpoint = Math.ceil(positions.length / 2);
  const firstHalf = positions.slice(0, midpoint);
  const secondHalf = positions.slice(midpoint);

  const subgroups: OccupationSubGroup[] = [];

  if (firstHalf.length > 0) {
    const total = firstHalf.reduce((sum, p) => sum + Number(p.count.replace(/,/g, "")), 0);
    subgroups.push({
      id: `${occupationId}-a`,
      name: `${occupationName.replace(/类职业$/, "")}专员`,
      socCode: `${SOC_MAJOR_CODES[occupationId]?.slice(0, 2) ?? "00"}-1000`,
      count: total.toLocaleString("en-US"),
      href: `/occupations/${occupationId}`,
      children: firstHalf.map((p) => leafFromSoc(occupationId, p.code, p.title, p.count)),
    });
  }

  if (secondHalf.length > 0) {
    const total = secondHalf.reduce((sum, p) => sum + Number(p.count.replace(/,/g, "")), 0);
    subgroups.push({
      id: `${occupationId}-b`,
      name: `${occupationName.replace(/类职业$/, "")}相关职位`,
      socCode: `${SOC_MAJOR_CODES[occupationId]?.slice(0, 2) ?? "00"}-2000`,
      count: total.toLocaleString("en-US"),
      href: `/occupations/${occupationId}`,
      children: secondHalf.map((p) => leafFromSoc(occupationId, p.code, p.title, p.count)),
    });
  }

  return subgroups;
}

export const OCCUPATION_MAJOR_GROUPS: OccupationMajorGroup[] = OCCUPATIONS.map((occupation) => ({
  id: occupation.id,
  name: occupation.name,
  socCode: SOC_MAJOR_CODES[occupation.id] ?? "00-0000",
  count: occupation.count,
  href: `/occupations/${occupation.id}`,
  subgroups: buildSubgroups(occupation.id, occupation.name),
}));

export const OCCUPATIONS_PAGE_STATS = {
  majorGroups: STATS.occupationGroups,
  socPositions: STATS.socPositions,
  totalSkills: STATS.totalSkills,
  classifiedPercent: STATS.classifiedPercent,
};
