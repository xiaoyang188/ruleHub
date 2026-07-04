import type { Category, Skill } from "./mock";

export interface CategoryDomain extends Category {
  subCount: number;
}

export interface SubCategory {
  id: string;
  name: string;
  count: string;
}

export interface CatalogLinkCard {
  title: string;
  description: string;
  href: string;
  cta?: string;
}

export const CATALOG_STATS = {
  creators: "175,878",
  hotSkillsListed: "50,000",
};

export const CATEGORY_DOMAINS: CategoryDomain[] = [
  { id: "tools", name: "工具", count: "479,365", subCount: 7 },
  { id: "business", name: "商业", count: "375,596", subCount: 8 },
  { id: "development", name: "开发", count: "274,195", subCount: 11 },
  { id: "testing-security", name: "测试与安全", count: "216,595", subCount: 3 },
  { id: "data-ai", name: "数据与AI", count: "177,101", subCount: 4 },
  { id: "devops", name: "DevOps", count: "157,701", subCount: 5 },
];

export const SUB_CATEGORIES: SubCategory[] = [
  { id: "debugging", name: "调试工具", count: "245,048" },
  { id: "sales-marketing", name: "销售与营销", count: "196,532" },
  { id: "system-admin", name: "系统管理", count: "101,330" },
  { id: "code-quality", name: "代码质量", count: "94,466" },
  { id: "llm-ai", name: "LLM 与 AI", count: "91,692" },
  { id: "git-workflows", name: "Git 工作流", count: "87,216" },
  { id: "productivity-tools", name: "生产力工具", count: "74,853" },
  { id: "documents", name: "文档处理", count: "72,696" },
  { id: "architecture-patterns", name: "架构模式", count: "69,770" },
  { id: "project-management", name: "项目管理", count: "65,585" },
  { id: "testing", name: "测试", count: "64,309" },
  { id: "finance-investment", name: "金融与投资", count: "58,931" },
];

export const DIRECTORY_CARDS: CatalogLinkCard[] = [
  {
    title: "职业",
    description: "按软件开发者、研究员、写作者等职业场景找 skill。",
    href: "/occupations",
  },
  {
    title: "搜索",
    description: "按关键词、仓库、创作者、职业、热度或更新时间查找 skills。",
    href: "/search",
  },
  {
    title: "Agent Skills 是什么？",
    description: "先理解 SKILL.md、Claude Skills、Codex Skills，再进入目录查找可安装 skills。",
    href: "/agent-skills",
  },
  {
    title: "创作者",
    description: "查看某个 GitHub 作者或组织发布了哪些 skills。",
    href: "/creators",
  },
  {
    title: "分类",
    description: "按代码、文档、研究、自动化等任务类型浏览 skills。",
    href: "/categories",
  },
];

export const PLATFORM_CARDS: CatalogLinkCard[] = [
  {
    title: "Claude Skills 目录",
    description:
      "查找围绕 SKILL.md 组织的开源 Claude Skills，用于 Claude Code、Claude 工作流和可复用任务能力。",
    href: "/claude-skills",
    cta: "打开页面",
  },
  {
    title: "Codex Skills 目录",
    description:
      "查找适用于软件开发、代码库维护、浏览器工作、文档处理和重复 agent 任务的开源 Codex Skills。",
    href: "/codex-skills",
    cta: "打开页面",
  },
];

export const SEARCH_RESULTS: Skill[] = [
  {
    id: "s1",
    name: "vfx-text-cursor",
    author: "nexu-io",
    repo: "nexu-io/open-design",
    description:
      "Cursor light trail, chromatic rays, and directional flares for word-by-word quote reveals in video intros.",
    stars: "68.7k",
    updatedAt: "2026-05-27",
  },
  {
    id: "s2",
    name: "cursor-subagent-creator",
    author: "tech-leads-club",
    repo: "tech-leads-club/agent-skills",
    description:
      "Creates Cursor-specific AI subagents with isolated context for complex multi-step workflows.",
    stars: "4.7k",
    updatedAt: "2026-05-20",
  },
  {
    id: "s3",
    name: "cursor-sdk-e2e-dev",
    author: "omnigent-ai",
    repo: "omnigent-ai/omnigent",
    description:
      "Spin up a live local Omnigent server and exercise the Cursor SDK harness end-to-end.",
    stars: "4.6k",
    updatedAt: "2026-05-18",
  },
  {
    id: "s4",
    name: "add-cursor-ambassador",
    author: "cursor",
    repo: "cursor/community-plugins",
    description:
      "Adds Cursor Directory ambassador badges by name or email via Supabase.",
    stars: "4.0k",
    updatedAt: "2026-05-15",
  },
  {
    id: "s5",
    name: "cursor-review",
    author: "Chachamaru127",
    repo: "Chachamaru127/claude-code-harness",
    description:
      "Run a Cursor Composer review as an advisory second opinion while keeping the primary review verdict on the host brain.",
    stars: "2.9k",
    updatedAt: "2026-05-12",
  },
  {
    id: "s6",
    name: "cursor-rescue",
    author: "Chachamaru127",
    repo: "Chachamaru127/claude-code-harness",
    description: "Diagnose and recover Cursor backend failures for Harness workflows.",
    stars: "2.9k",
    updatedAt: "2026-05-12",
  },
];

export const TOP_CREATORS = [
  { author: "anthropics", skills: "12", repos: 1, stars: "154.5k" },
  { author: "obra", skills: "8", repos: 1, stars: "237.1k" },
  { author: "vercel-labs", skills: "6", repos: 1, stars: "28.3k" },
  { author: "nextlevelbuilder", skills: "4", repos: 1, stars: "95.7k" },
  { author: "browser-use", skills: "3", repos: 1, stars: "100.4k" },
  { author: "bytedance", skills: "5", repos: 1, stars: "73.7k" },
  { author: "Shubhamsaboo", skills: "9", repos: 1, stars: "115.4k" },
  { author: "microsoft", skills: "42", repos: 8, stars: "89.2k" },
];
