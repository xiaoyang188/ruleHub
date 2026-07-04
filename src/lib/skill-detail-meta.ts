import type { Skill } from "@/data/mock";

export interface SkillDetailMeta {
  starsDisplay: string;
  forksDisplay: string;
  updatedAtDisplay: string;
}

const KNOWN_META: Record<string, Partial<SkillDetailMeta>> = {
  "frontend-design": {
    starsDisplay: "154,456",
    forksDisplay: "18,196",
    updatedAtDisplay: "2026年6月9日 19:33",
  },
};

function parseStarsToNumber(stars: string): number {
  const s = stars.toLowerCase().replace(/,/g, "");
  if (s.endsWith("k")) return Math.round(parseFloat(s) * 1000);
  if (s.endsWith("m")) return Math.round(parseFloat(s) * 1_000_000);
  return Number.parseInt(s, 10) || 0;
}

function formatChineseDateTime(dateStr: string, seed: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash + seed.charCodeAt(i) * 17) % 24;
  const hour = 9 + (hash % 12);
  const minute = (hash * 7) % 60;

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${pad(hour)}:${pad(minute)}`;
}

export function getSkillDetailMeta(skill: Skill): SkillDetailMeta {
  const known = KNOWN_META[skill.name];
  if (known?.starsDisplay && known.forksDisplay && known.updatedAtDisplay) {
    return known as SkillDetailMeta;
  }

  const starsNum = parseStarsToNumber(skill.stars);
  const forksNum = Math.max(1, Math.round(starsNum * 0.118));

  return {
    starsDisplay: starsNum.toLocaleString("en-US"),
    forksDisplay: forksNum.toLocaleString("en-US"),
    updatedAtDisplay: formatChineseDateTime(skill.updatedAt, skill.id),
  };
}

export function getInstallPrompt(skill: Skill, repoName: string) {
  return `请帮我安装这个 Agent Skill：

名称：${skill.name}
仓库：${skill.author}/${repoName}
页面：RuleHub skill detail

请检查 SKILL.md 内容，确认安全后安装到 ~/.claude/skills/ 或项目 .claude/skills/ 目录。`;
}

export const SKILL_OCCUPATION_TAGS: Record<
  string,
  { title: string; group: string; code: string }
> = {
  "frontend-design": {
    title: "网页与数字界面设计师",
    group: "计算机与数学类职业",
    code: "SOC 15-1255",
  },
  "skill-creator": {
    title: "软件开发者",
    group: "计算机与数学类职业",
    code: "SOC 15-1252",
  },
  "brainstorming": {
    title: "多媒体艺术家与动画师",
    group: "艺术、设计、娱乐、体育与媒体类职业",
    code: "SOC 27-1014",
  },
};

const OCCUPATION_TITLE_POOL = [
  "软件开发工程师",
  "软件质量保证分析师与测试员",
  "计算机系统分析师",
  "计算机程序员",
  "技术写作员",
  "综合与运营经理",
  "其他计算机职业",
  "桌面出版专家",
  "网络与计算机系统管理员",
  "网页与数字界面设计师",
  "数据科学家",
  "市场经理",
] as const;

const UNCLASSIFIED_SKILL_NAMES = new Set([
  "maintaining-macos-defaults",
  "managing-homedir",
]);

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const SKILL_OCCUPATION_TAG_LISTS: Record<string, string[]> = {
  "getting-started-with-skills": ["技术写作员", "计算机系统分析师"],
  "installing-skills-system": ["软件开发工程师"],
  "testing-skills-with-subagents": ["软件质量保证分析师与测试员"],
  "executing-plans": ["综合与运营经理"],
};

export function getSkillOccupationTagTitles(skill: Skill): string[] {
  const listed = SKILL_OCCUPATION_TAG_LISTS[skill.name];
  if (listed) return listed;

  const primary = getSkillOccupationTags(skill);
  if (primary.title === "未分类") return ["未分类"];

  const hash = hashString(`${skill.id}:${skill.name}`);
  if (hash % 6 === 0) {
    const secondary = OCCUPATION_TITLE_POOL[(hash + 3) % OCCUPATION_TITLE_POOL.length];
    if (secondary !== primary.title) return [primary.title, secondary];
  }

  return [primary.title];
}

export function getSkillOccupationTags(skill: Skill) {
  if (SKILL_OCCUPATION_TAGS[skill.name]) {
    return SKILL_OCCUPATION_TAGS[skill.name];
  }

  if (UNCLASSIFIED_SKILL_NAMES.has(skill.name)) {
    return {
      title: "未分类",
      group: "待补全",
      code: "SOC —",
    };
  }

  const index = hashString(`${skill.author}:${skill.name}:${skill.id}`) % OCCUPATION_TITLE_POOL.length;
  const title = OCCUPATION_TITLE_POOL[index];

  return {
    title,
    group: "计算机与数学类职业",
    code: "SOC 15-1252",
  };
}
