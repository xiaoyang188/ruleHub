export interface Skill {
  id: string;
  name: string;
  author: string;
  repo: string;
  description: string;
  stars: string;
  updatedAt: string;
}

export interface Occupation {
  id: string;
  rank: string;
  name: string;
  count: string;
}

export interface Category {
  id: string;
  name: string;
  count: string;
}

export const STATS = {
  totalSkills: "2,082,862",
  classifiedPercent: "93",
  occupationGroups: 23,
  socPositions: 867,
};

export const FEATURED_SKILLS: Skill[] = [
  {
    id: "1",
    name: "frontend-design",
    author: "anthropics",
    repo: "anthropics/skills",
    description:
      "Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that feel deliberate rather than generic.",
    stars: "154.5k",
    updatedAt: "2026-06-20",
  },
  {
    id: "2",
    name: "skill-creator",
    author: "anthropics",
    repo: "anthropics/skills",
    description:
      "Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill.",
    stars: "154.5k",
    updatedAt: "2026-06-20",
  },
  {
    id: "3",
    name: "ui-ux-pro-max",
    author: "nextlevelbuilder",
    repo: "nextlevelbuilder/ui-ux-pro-max-skill",
    description:
      "UI/UX design intelligence for web and mobile. Includes 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and more.",
    stars: "95.7k",
    updatedAt: "2026-06-15",
  },
  {
    id: "4",
    name: "brainstorming",
    author: "obra",
    repo: "obra/superpowers",
    description:
      "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.",
    stars: "237.1k",
    updatedAt: "2026-06-17",
  },
  {
    id: "5",
    name: "vercel-react-best-practices",
    author: "vercel-labs",
    repo: "vercel-labs/agent-skills",
    description:
      "React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code.",
    stars: "28.3k",
    updatedAt: "2026-06-10",
  },
  {
    id: "6",
    name: "ppt-generation",
    author: "bytedance",
    repo: "bytedance/deer-flow",
    description:
      "Use this skill when the user requests to generate, create, or make presentations (PPT/PPTX). Creates visually rich slides by generating images for each slide and assembling them.",
    stars: "73.7k",
    updatedAt: "2026-05-28",
  },
  {
    id: "7",
    name: "browser-use",
    author: "browser-use",
    repo: "browser-use/browser-use",
    description:
      "Automates browser interactions for web testing, form filling, screenshots, and data extraction. Use when the user needs to navigate websites, interact with web pages, fill forms, take screenshots.",
    stars: "100.4k",
    updatedAt: "2026-05-11",
  },
  {
    id: "8",
    name: "docx",
    author: "anthropics",
    repo: "anthropics/skills",
    description:
      "Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include any mention of 'Word doc', 'word document', or '.docx'.",
    stars: "154.5k",
    updatedAt: "2026-06-18",
  },
  {
    id: "9",
    name: "code-reviewer",
    author: "Shubhamsaboo",
    repo: "Shubhamsaboo/awesome-llm-apps",
    description:
      "Thorough code review with focus on security, performance, and best practices. Use when reviewing code, performing security audits, checking for code quality issues.",
    stars: "115.4k",
    updatedAt: "2026-06-05",
  },
];

export const OCCUPATIONS: Occupation[] = [
  { id: "1", rank: "01", name: "计算机与数学类职业", count: "1,265,857" },
  { id: "2", rank: "02", name: "商业与金融运营类职业", count: "191,022" },
  { id: "3", rank: "03", name: "艺术、设计、娱乐、体育与媒体类职业", count: "80,587" },
  { id: "4", rank: "04", name: "办公室与行政支持类职业", count: "38,746" },
  { id: "5", rank: "05", name: "法律类职业", count: "34,002" },
  { id: "6", rank: "06", name: "教育与图书馆类职业", count: "22,819" },
  { id: "7", rank: "07", name: "生命、物理与社会科学类职业", count: "21,551" },
  { id: "8", rank: "08", name: "管理类职业", count: "9,414" },
];

export const CATEGORIES: Category[] = [
  { id: "tools", name: "工具", count: "479,365" },
  { id: "business", name: "商业", count: "375,596" },
  { id: "development", name: "开发", count: "274,195" },
  { id: "testing-security", name: "测试与安全", count: "216,595" },
  { id: "data-ai", name: "数据与AI", count: "177,101" },
  { id: "devops", name: "DevOps", count: "157,701" },
  { id: "documentation", name: "文档", count: "140,258" },
  { id: "content-media", name: "内容与媒体", count: "123,779" },
];

export const NAV_LINKS = [
  { href: "/search", label: "搜索" },
  { href: "/skills", label: "Skills" },
  { href: "/creators", label: "创作者" },
  { href: "/occupations", label: "职业技能" },
  { href: "/docs", label: "文档" },
  { href: "/docs/api", label: "API 文档" },
];

export const LANGUAGES = [
  { code: "ar", label: "العربية AR" },
  { code: "de", label: "Deutsch DE" },
  { code: "en", label: "English EN" },
  { code: "es", label: "Español ES" },
  { code: "fr", label: "Français FR" },
  { code: "ja", label: "日本語 JA" },
  { code: "ko", label: "한국어 KO" },
  { code: "pt", label: "Português PT" },
  { code: "zh", label: "中文 ZH", current: true },
];
