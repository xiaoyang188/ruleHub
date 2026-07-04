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

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const STATS = {
  totalSkills: "2,082,862",
  classifiedPercent: "81",
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

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "什么是 Agent Skills?",
    answer:
      "Agent Skills 是以 SKILL.md 文件形式存在的模块化指令包，用于扩展 AI 编码助手的能力。每个 skill 包含名称、描述和使用指南，帮助 AI 在特定场景下表现更专业。",
  },
  {
    id: "2",
    question: "如何从 RuleHub 安装 Agent Skills?",
    answer:
      "在 Claude Code 中可以使用 /plugin add 命令一键安装。也可以手动克隆 GitHub 仓库，将 skill 文件夹复制到 ~/.claude/skills/（个人）或 .claude/skills/（项目）目录。",
  },
  {
    id: "3",
    question: "这些 skills 使用安全吗?",
    answer:
      "所有 skills 均来自公开的 GitHub 仓库，RuleHub 只做索引展示。安装前请务必审查源代码，确认没有恶意指令或不当权限请求。",
  },
  {
    id: "4",
    question: "我可以同时使用多个 skills 吗?",
    answer:
      "可以。大多数 AI 编码工具支持同时加载多个 skills，AI 会根据当前任务自动选择最相关的 skill。",
  },
  {
    id: "5",
    question: "我可以创建并分享自己的 skill 吗?",
    answer:
      "当然可以。只需在 GitHub 上创建包含 SKILL.md 的公开仓库，RuleHub 会在下次索引时自动收录。",
  },
  {
    id: "6",
    question: "Skills 和 slash commands 有什么不同?",
    answer:
      "Slash commands 是用户主动触发的单次指令，而 Skills 是 AI 自动识别并应用的上下文知识，无需手动调用。",
  },
  {
    id: "7",
    question: "Skills 多久更新一次?",
    answer:
      "RuleHub 定期从 GitHub 同步更新索引。具体频率取决于仓库的活跃度和平台的爬取周期。",
  },
  {
    id: "8",
    question: "本网站与 Anthropic 或 OpenAI 有关联吗?",
    answer:
      "没有。RuleHub 是独立的社区项目，与 Anthropic、OpenAI 或任何 AI 公司均无关联。",
  },
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
