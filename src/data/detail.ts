import type { Skill } from "./mock";
import { FEATURED_SKILLS, CATEGORIES } from "./mock";
import { SEARCH_RESULTS, CATEGORY_DOMAINS, SUB_CATEGORIES } from "./catalog";
import { CATEGORY_DOMAIN_SECTIONS } from "./categories-page";

const PAGE_SUB_CATEGORIES = CATEGORY_DOMAIN_SECTIONS.flatMap((domain) =>
  domain.subcategories.map((sub) => ({
    id: sub.id,
    name: sub.name,
    count: sub.count,
  }))
);

export interface SocPosition {
  code: string;
  title: string;
  count: string;
}

export const ALL_LISTED_SKILLS: Skill[] = [
  ...FEATURED_SKILLS,
  ...SEARCH_RESULTS.filter((s) => !FEATURED_SKILLS.some((f) => f.name === s.name)),
];

export const SOC_POSITIONS: Record<string, SocPosition[]> = {
  "1": [
    { code: "15-1252", title: "软件开发者", count: "892,441" },
    { code: "15-1253", title: "软件质量保证分析师与测试员", count: "124,318" },
    { code: "15-1254", title: "Web 与数字界面开发者", count: "98,204" },
    { code: "15-1299", title: "计算机职业（其他）", count: "87,562" },
    { code: "15-2051", title: "数据科学家", count: "63,332" },
  ],
  "2": [
    { code: "13-2011", title: "会计师与审计师", count: "72,104" },
    { code: "13-1161", title: "市场研究分析师", count: "48,920" },
    { code: "11-2021", title: "市场经理", count: "41,338" },
    { code: "13-2051", title: "金融分析师", count: "28,660" },
  ],
  "3": [
    { code: "27-1024", title: "平面设计师", count: "31,442" },
    { code: "27-3043", title: "作家与作者", count: "22,118" },
    { code: "27-1014", title: "多媒体艺术家与动画师", count: "18,027" },
  ],
};

const CATEGORY_SKILL_MAP: Record<string, string[]> = {
  tools: ["1", "7", "8", "s2", "s6"],
  business: ["2", "6", "9"],
  development: ["1", "3", "5", "s2", "s3"],
  "testing-security": ["9", "s5"],
  "data-ai": ["4", "6", "9", "s3"],
  devops: ["5", "7"],
  documentation: ["8"],
  "content-media": ["6", "3"],
  debugging: ["s6", "9"],
  "llm-ai": ["4", "9", "s3"],
  testing: ["9", "s5"],
};

export function getCategoryMeta(slug: string) {
  const domain = CATEGORY_DOMAIN_SECTIONS.find((item) => item.id === slug);
  if (domain) {
    return { id: domain.id, name: domain.name, count: domain.count };
  }

  return (
    CATEGORIES.find((c) => c.id === slug) ??
    CATEGORY_DOMAINS.find((c) => c.id === slug) ??
    SUB_CATEGORIES.find((c) => c.id === slug) ??
    PAGE_SUB_CATEGORIES.find((c) => c.id === slug) ??
    null
  );
}

export function getSkillsForCategory(slug: string): Skill[] {
  const ids = CATEGORY_SKILL_MAP[slug];
  if (ids) {
    return ids
      .map((id) => ALL_LISTED_SKILLS.find((s) => s.id === id))
      .filter((s): s is Skill => Boolean(s));
  }
  return FEATURED_SKILLS.slice(0, 6);
}

export function getSkillsForOccupation(id: string): Skill[] {
  const index = Math.max(0, Number(id) - 1);
  const pool = ALL_LISTED_SKILLS;
  return Array.from({ length: Math.min(6, pool.length) }, (_, i) => pool[(index * 2 + i) % pool.length]);
}

export function getRelatedSkills(skill: Skill, limit = 4): Skill[] {
  return ALL_LISTED_SKILLS.filter(
    (s) => s.id !== skill.id && (s.author === skill.author || s.repo === skill.repo)
  ).slice(0, limit);
}

export function getCreatorStats(author: string) {
  const skills = ALL_LISTED_SKILLS.filter((s) => s.author === author);
  const repos = new Set(skills.map((s) => s.repo));
  const topStars = skills[0]?.stars ?? "0";
  return {
    skillCount: skills.length,
    repoCount: repos.size,
    topStars,
    skills,
  };
}

export function buildSkillMdPreview(skill: Skill) {
  if (skill.name === "frontend-design") {
    return `---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
---

# Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated — your job is to make choices that feel deliberate.

### Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice.

### Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, or an interactive element.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional contrast.

Structure is information. Structural devices, numbering, eyebrows, dividers, and labels should encode something true about the content, not decorate it.

- Leverage motion deliberately where it serves the subject
- Match complexity to the vision
- Consider written content carefully — copy can make a design feel as templated as the layout itself

### Process: brainstorm, explore, plan, critique, build, critique again

Work in two passes. First, brainstorm a short design plan based on the human's design brief: create a compact token system with color, type, layout, and signature.

Then review that plan against the brief before building: if any part reads like the generic default you would produce for any similar page, revise it.

### Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief.`;
  }

  return `---
name: ${skill.name}
description: ${skill.description.slice(0, 120)}...
---

# ${skill.name}

${skill.description}

## When to use

Use this skill when the user needs help with tasks related to **${skill.name.replace(/-/g, " ")}**.

## Guidelines

- Follow repository conventions in \`${skill.repo}\`
- Prefer minimal, focused changes
- Validate outputs before finishing`;
}
