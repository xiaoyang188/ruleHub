import { SOC_POSITIONS } from "@/data/detail";
import type { Occupation } from "@/data/mock";
import { OCCUPATIONS } from "@/data/mock";

export interface OccupationChild {
  name: string;
  count: string;
  href: string;
}

export interface OccupationGroupCard extends Occupation {
  socCode: string;
  borderClass: string;
  children: OccupationChild[];
}

const BORDER_COLORS = [
  "border-l-blue-500/60",
  "border-l-emerald-500/60",
  "border-l-violet-500/60",
  "border-l-amber-500/60",
  "border-l-rose-500/60",
  "border-l-cyan-500/60",
  "border-l-orange-500/60",
  "border-l-indigo-500/60",
];

const SOC_CODES = [
  "15-0000",
  "13-0000",
  "27-0000",
  "43-0000",
  "23-0000",
  "25-0000",
  "19-0000",
  "11-0000",
];

function buildChildren(occupation: Occupation): OccupationChild[] {
  const positions = SOC_POSITIONS[occupation.id] ?? [];
  if (positions.length > 0) {
    return positions.map((pos) => ({
      name: pos.title,
      count: `${pos.count} skills`,
      href: `/search?q=${encodeURIComponent(pos.title)}`,
    }));
  }
  return [
    {
      name: occupation.name,
      count: `${occupation.count} skills`,
      href: `/occupations/${occupation.id}`,
    },
  ];
}

export const OCCUPATION_GROUP_CARDS: OccupationGroupCard[] = OCCUPATIONS.map((occupation, index) => ({
  ...occupation,
  socCode: SOC_CODES[index] ?? "00-0000",
  borderClass: BORDER_COLORS[index % BORDER_COLORS.length],
  children: buildChildren(occupation),
}));
