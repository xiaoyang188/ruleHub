import { SOC_POSITIONS } from "@/data/detail";
import { OCCUPATIONS } from "@/data/mock";
import { OCCUPATION_API_SLUGS } from "@/lib/occupation-slugs";

export interface CreatorOccupationFilterChild {
  id: string;
  name: string;
  count: string;
}

export interface CreatorOccupationFilterGroup {
  id: string;
  slug: string;
  name: string;
  count: string;
  children: CreatorOccupationFilterChild[];
}

const OCCUPATION_SLUGS = OCCUPATION_API_SLUGS;

export const CREATOR_OCCUPATION_FILTER_GROUPS: CreatorOccupationFilterGroup[] =
  OCCUPATIONS.map((occupation) => {
    const positions = SOC_POSITIONS[occupation.id] ?? [];
    const children =
      positions.length > 0
        ? positions.map((pos) => ({
            id: `${occupation.id}-${pos.code}`,
            name: pos.title,
            count: `${pos.count} skills`,
          }))
        : [
            {
              id: occupation.id,
              name: occupation.name,
              count: `${occupation.count} skills`,
            },
          ];

    return {
      id: occupation.id,
      slug: OCCUPATION_SLUGS[occupation.id] ?? occupation.id,
      name: occupation.name,
      count: occupation.count,
      children,
    };
  });

export function getCreatorOccupationLabel(id: string) {
  return CREATOR_OCCUPATION_FILTER_GROUPS.find((group) => group.id === id)?.name ?? "";
}
