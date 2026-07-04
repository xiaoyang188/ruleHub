/** SkillsMP API occupation slug map (SOC group id → API slug). */
export const OCCUPATION_API_SLUGS: Record<string, string> = {
  "1": "computer-and-mathematical-occupations",
  "2": "business-and-financial-operations-occupations",
  "3": "arts-design-entertainment-sports-and-media-occupations",
  "4": "office-and-administrative-support-occupations",
  "5": "legal-occupations",
  "6": "education-and-library-occupations",
  "7": "life-physical-and-social-science-occupations",
  "8": "management-occupations",
};

export function resolveOccupationApiSlug(id: string): string {
  return OCCUPATION_API_SLUGS[id] ?? id;
}
