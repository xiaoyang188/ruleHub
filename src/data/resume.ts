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
  name: "杨少威",
  gender: "男",
  birthDate: "2002-02-16",
  birthDateDisplay: "2002.02.16",
  location: "郑州",
  availability: "随时到岗",
  title: "前端工程师 · 多端 / uni-app",
  email: SITE_CONTACT_EMAIL,
  website: SITE_URL.replace(/^https?:\/\//, ""),
  websiteUrl: SITE_URL,
  summary:
    "偏多端落地的前端工程师：能独立做小程序产品上线，也能在业务项目中啃下人脸核身、IM、推送、对公打款等硬集成。熟悉 uni-app / 微信小程序 / Nuxt，并具备 Express 轻量后端联调经验；同时维护 RuleHub 与原型技能沉淀。",
  education: {
    school: "北京工商管理专修学院",
    major: "移动通信",
    degree: "专科",
  },
  experienceYears: 3,
  skillGroups: [
    {
      label: "多端前端",
      items: ["uni-app", "微信小程序（TS + Sass）", "Vue", "Nuxt3", "Next.js / React"],
    },
    {
      label: "工程与集成",
      items: ["阿里云人脸核身", "腾讯云 IM / TUIKit", "UniPush / 腾讯云推送", "组件化拆分"],
    },
    {
      label: "全栈补强",
      items: ["Express", "MySQL", "ThinkPHP 联调", "Nginx / PM2"],
    },
    {
      label: "AI 编程",
      items: ["Cursor", "Agent Skills / SKILL.md", "原型工厂", "VibeCoding 工作流"],
    },
  ] satisfies ResumeSkillGroup[],
  projects: [
    {
      name: "搂团积分商城",
      role: "前端开发 · 核心集成",
      period: "公司项目",
      stack: ["uni-app", "Vue", "人脸核身", "腾讯云 IM", "推送"],
      summary:
        "社交 + 积分经济 App：刷视频赚积分、拼团/盲盒、种草社区，并接入人脸核身、IM 与推送。",
      highlights: [
        "落地积分↔在线时长↔团币闭环，以及拼团/盲盒等活动，而非常规货架堆砌",
        "阿里云人脸核身原生插件串入实名、提现、下单高风险链路",
        "腾讯云 IM（TIM + TUIKit）+ UniPush，覆盖好友/群聊与离线触达",
      ],
    },
    {
      name: "懂球通",
      role: "独立开发 · 全栈",
      period: "个人产品",
      stack: ["微信小程序", "TypeScript", "Express", "MySQL"],
      summary:
        "原生微信小程序足球赛况工具：赛程、实时比分、积分榜、关注与开赛提醒；自建后端与数据同步。",
      highlights: [
        "独立完成原生小程序（TS + Sass）核心页面与体验",
        "Express + MySQL 多源同步、赛程日分片与比分合并",
        "开赛订阅消息 + 发送日志去重；上线运营约三个月 / ~500 自然流",
      ],
      href: "https://api.agkey.net",
    },
    {
      name: "开普森全端",
      role: "前端开发 · 多端",
      period: "公司项目",
      stack: ["Nuxt3", "uni-app", "Element Plus", "Tailwind"],
      summary:
        "工业测温 B2B 全端：Nuxt3 PC 官网/商城 + uni-app App/微信，覆盖对公打款与报价清单。",
      highlights: [
        "同一业务线覆盖 PC（www.sumakps.com）与移动端「开普森商城」",
        "PC 对公打款：凭证提交与待审/驳回状态",
        "「我的清单」与导出报价单，支撑选型比价与销售跟进",
      ],
      href: "https://www.sumakps.com",
    },
    {
      name: "百胜商城",
      role: "前端开发 · 多端",
      period: "公司项目",
      stack: ["uni-app", "Vue", "Coze"],
      summary:
        "港澳保健品跨境商城：App + 微信 + 商家端，大陆/港澳台双节点，分销积分与 AI 客服。",
      highlights: [
        "一仓三端：买家 App、微信小程序、商家端经营后台",
        "大陆 ↔ 港澳台双 API 节点切换与区域运营隔离",
        "分销中心 + 积分兑换 + 会员等级；商家端图表统计；接入 Coze 智能客服",
      ],
    },
    {
      name: "古东巴批发商城（华澳云仓）",
      role: "前端开发",
      period: "公司项目",
      stack: ["uni-app", "Vue"],
      summary:
        "经销商 B2B 云仓批发：审核准入、经销价/起订量、酒企选货、预售秒杀与发票。",
      highlights: [
        "经销商审核通过才能采购，全站经销价与起订量/限购",
        "酒企列表/详情选货，新品预售与秒杀",
        "发票中心 + 取货人/自提点，适配仓配履约",
      ],
      href: "https://app.huaotime.com",
    },
    {
      name: "RuleHub + 原型工厂",
      role: "独立开发 · 全栈",
      period: "2026 — 至今",
      stack: ["Next.js", "TypeScript", "Tailwind", "Agent Skills"],
      summary:
        "Agent Skills 市场与 AI 编程灵感站；沉淀高保真原型→生产技能包。",
      highlights: [
        "Skills 检索、创作者目录、VibeCoding / Insights 与 SEO 内容飞轮",
        "aibo 实践原型与生产三端分离；发布 @zhongbenkeji2/skills-prototype-factory",
        "本站案例展示页沉淀业务项目差异亮点",
      ],
      href: SITE_URL,
    },
    {
      name: "乐雅 / 深易购 / 纽艾 / 专拍（节选）",
      role: "前端开发",
      period: "公司项目",
      stack: ["uni-app", "Vue", "ThinkPHP"],
      summary:
        "差异化业务补充：票务核销、教练排行、企业订货、转拍寄售，避免同质商城堆砌。",
      highlights: [
        "乐雅：票档/持票人/票夹 + 员工扫码核销防重复",
        "深易购：教练绑定与排行榜 + 自提核销 + 商品问答",
        "纽艾：企业审核准入、合伙人套餐、纽币支付；专拍：转拍发布/提货",
      ],
    },
  ] satisfies ResumeProject[],
  strengths: [
    "多端与落地：uni-app / 小程序 / Nuxt，能独立闭环也能啃复杂 SDK 集成",
    "面试可讲清差异：社交积分、工业对公、跨境双节点、经销批发、票务核销",
    "熟练使用 Cursor / Agent Skills，持续把业务经验沉淀为可展示站点与技能包",
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
