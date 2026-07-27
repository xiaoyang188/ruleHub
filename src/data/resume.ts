import { SITE_CONTACT_EMAIL } from "@/lib/site-contact";
import { SITE_URL } from "@/lib/site-seo";

export type ResumeProject = {
  name: string;
  role: string;
  period: string;
  stack: string[];
  summary: string;
  highlights: string[];
  href?: string;
};

export type ResumeSkillGroup = {
  label: string;
  items: string[];
};

export const RESUME = {
  name: "小杨",
  gender: "男",
  birthDate: "2002-02-16",
  birthDateDisplay: "2002.02.16",
  availability: "随时到岗",
  title: "独立开发者 · AI 辅助编程",
  email: SITE_CONTACT_EMAIL,
  website: SITE_URL.replace(/^https?:\/\//, ""),
  websiteUrl: SITE_URL,
  summary:
    "五年互联网相关工作经验，擅长使用 Cursor 进行高效开发与迭代。目前独立维护 RuleHub、zuqiu 等个人项目，关注 Agent Skills、全栈落地与产品化交付。",
  education: {
    school: "北京工商管理专修学院（民专）",
    major: "移动通信",
    degree: "专科",
  },
  experienceYears: 5,
  skillGroups: [
    {
      label: "AI 编程",
      items: ["Cursor", "Claude Code", "Agent Skills / SKILL.md", "VibeCoding 工作流"],
    },
    {
      label: "前端",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      label: "后端与运维",
      items: ["Node.js / Express", "MySQL", "Nginx", "宝塔 / PM2"],
    },
  ] satisfies ResumeSkillGroup[],
  projects: [
    {
      name: "RuleHub",
      role: "独立开发 · 全栈",
      period: "2026 — 至今",
      stack: ["Next.js", "TypeScript", "Tailwind", "SEO"],
      summary:
        "Agent Skills 市场与 AI 编程灵感站：Skills 检索、创作者目录、VibeCoding / AI 资讯，以及原创洞察专栏。",
      highlights: [
        "搭建完整站点架构、导航与法律合规页",
        "实现洞察专栏 Markdown 内容体系与 SEO 收录",
        "对接后端 API，完成新闻与项目列表展示",
      ],
      href: SITE_URL,
    },
    {
      name: "zuqiu",
      role: "独立开发 · API / 数据同步",
      period: "2025 — 至今",
      stack: ["Express", "MySQL", "定时同步", "REST API"],
      summary:
        "为 RuleHub 等前端提供数据能力：内容抓取、同步入库、REST 接口与定时任务（个人练手项目占位，可持续完善）。",
      highlights: [
        "设计内容同步与数据表结构",
        "提供 vibecoding / news 等业务接口",
        "配合线上部署与日常运维",
      ],
    },
  ] satisfies ResumeProject[],
  strengths: [
    "熟练使用 Cursor，能快速把想法落地为可上线产品",
    "独立完成从需求、开发到部署的完整闭环",
    "关注可读性、SEO 与基础工程规范",
  ],
} as const;

export function getResumeAge(referenceDate = new Date()): number {
  const [y, m, d] = RESUME.birthDate.split("-").map(Number);
  let age = referenceDate.getFullYear() - y;
  const beforeBirthday =
    referenceDate.getMonth() + 1 < m ||
    (referenceDate.getMonth() + 1 === m && referenceDate.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}
