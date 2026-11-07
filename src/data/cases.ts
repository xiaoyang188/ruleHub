export type CaseItem = {
  id: string;
  name: string;
  subtitle: string;
  themeColor: string;
  accentColor: string;
  languages: string[];
  terminals: string[];
  operating: boolean;
  tags: string[];
  featured: boolean;
  highlights: string[];
  mockTitle: string;
  mockLines: string[];
  href?: string;
};

export const CASES: CaseItem[] = [
  {
    id: "loutuan",
    name: "搂团积分商城",
    subtitle: "社交 + 积分经济 + 硬集成",
    themeColor: "#0f766e",
    accentColor: "#5eead4",
    languages: ["uni-app", "Vue", "原生插件"],
    terminals: ["App（iOS / Android）"],
    operating: true,
    tags: ["人脸核身", "腾讯云 IM", "推送", "积分经济"],
    featured: true,
    mockTitle: "搂团",
    mockLines: ["刷视频赚积分", "拼团 · 盲盒 · 种草", "IM 社交消息"],
    highlights: [
      "落地「积分经济 + 社交」App：短视频任务返积分、积分兑在线时长/团币，拼团/盲盒等活动闭环。",
      "接入阿里云人脸核身原生插件，串入实名、提现、下单等高风险链路。",
      "集成腾讯云 IM（TIM + TUIKit）与 UniPush，IM 登录后绑定 RegistrationID。",
      "独立实现种草社区与视频发现流，内容可关联商品。",
    ],
  },
  {
    id: "dongqiutong",
    name: "懂球通",
    subtitle: "独立全栈足球赛况小程序",
    themeColor: "#1d4ed8",
    accentColor: "#93c5fd",
    languages: ["TypeScript", "Sass", "Express", "MySQL"],
    terminals: ["微信小程序", "自建 API"],
    operating: true,
    tags: ["原生小程序", "全栈", "订阅消息", "个人产品"],
    featured: true,
    mockTitle: "懂球通",
    mockLines: ["今日赛程 · 实时比分", "积分榜 · 关注球队", "开赛订阅提醒"],
    href: "https://api.agkey.net",
    highlights: [
      "独立实现赛程/实时比分/积分榜/关注（原生微信小程序 TS + Sass）。",
      "自建 Express + MySQL：多源同步、赛程日分片、比分合并。",
      "开赛提醒：定时扫描 + 微信订阅消息 + 发送日志去重。",
      "端到端产品到上线运营（约三个月 / ~500 自然流用户）。",
    ],
  },
  {
    id: "kaipusen",
    name: "开普森全端",
    subtitle: "工业测温 B2B · PC + App + 微信",
    themeColor: "#b45309",
    accentColor: "#fcd34d",
    languages: ["Nuxt3", "uni-app", "Element Plus", "Tailwind"],
    terminals: ["PC 官网", "App", "微信小程序"],
    operating: true,
    tags: ["工业 B2B", "对公打款", "报价清单", "多端"],
    featured: true,
    mockTitle: "开普森",
    mockLines: ["热电偶 · 热电阻", "对公打款审核", "导出报价单"],
    href: "https://www.sumakps.com",
    highlights: [
      "温度测控行业全端：Nuxt3 PC（www.sumakps.com）+ uni-app「开普森商城」App/微信。",
      "PC 对公打款：转账信息、凭证提交、待审/驳回状态。",
      "「我的清单」与渠道页导出报价单，支撑选型比价与销售跟进。",
    ],
  },
  {
    id: "baisheng",
    name: "百胜商城",
    subtitle: "港澳保健品 · 跨境双节点多端",
    themeColor: "#be123c",
    accentColor: "#fda4af",
    languages: ["uni-app", "Vue", "Coze SDK"],
    terminals: ["App", "微信小程序", "商家端"],
    operating: true,
    tags: ["跨境双节点", "分销", "积分", "商家端", "AI 客服"],
    featured: true,
    mockTitle: "百胜",
    mockLines: ["大陆 ↔ 港澳台节点", "分销 · 积分 · 会员", "商家经营看板"],
    highlights: [
      "港澳保健品多端：买家 App + 微信 + 商家端，支撑跨境零售与异业开店。",
      "大陆/港澳台双 API 节点切换（bestwin-int / hk.bestwin-int）。",
      "分销中心 + 积分兑换 + 会员等级；商家端图表统计；接入 Coze 智能客服。",
    ],
  },
  {
    id: "gudongba",
    name: "古东巴批发商城",
    subtitle: "华澳云仓 · 经销商 B2B 批发",
    themeColor: "#7c2d12",
    accentColor: "#fdba74",
    languages: ["uni-app", "Vue"],
    terminals: ["微信小程序"],
    operating: true,
    tags: ["B2B 批发", "经销准入", "起订量", "发票"],
    featured: true,
    mockTitle: "华澳云仓",
    mockLines: ["经销商审核准入", "经销价 · 起订量", "酒企选货 · 发票"],
    href: "https://app.huaotime.com",
    highlights: [
      "经销商专属 B2B 云仓批发，与普通 C 端货架权限/定价模型不同。",
      "审核准入 + 全站经销价 + 起订量/限购。",
      "酒企选货、预售秒杀、发票中心与取货人/自提点。",
    ],
  },
  {
    id: "rulehub",
    name: "RuleHub + 原型工厂",
    subtitle: "Agent Skills 平台与高保真原型闭环",
    themeColor: "#4c1d95",
    accentColor: "#c4b5fd",
    languages: ["Next.js", "React", "TypeScript", "Tailwind"],
    terminals: ["Web", "npm Skills 包"],
    operating: true,
    tags: ["Agent Skills", "SEO", "原型工厂", "个人产品"],
    featured: true,
    mockTitle: "RuleHub",
    mockLines: ["Skills 检索目录", "VibeCoding · Insights", "原型 → 生产闭环"],
    href: "https://www.yimingyinglou.top",
    highlights: [
      "Next.js 搭建 RuleHub：Skills 检索、创作者目录、VibeCoding 与 Insights。",
      "aibo 实践高保真原型与生产三端分离；发布原型技能包；演示站 card.agkey.net。",
    ],
  },
  {
    id: "leya",
    name: "乐雅艺术",
    subtitle: "门票预约 + 员工扫码核销",
    themeColor: "#9d174d",
    accentColor: "#f9a8d4",
    languages: ["uni-app", "Vue"],
    terminals: ["微信小程序"],
    operating: true,
    tags: ["票务", "核销", "票夹"],
    featured: false,
    mockTitle: "乐雅",
    mockLines: ["选票档 · 持票人", "我的票夹", "员工扫码核销"],
    highlights: [
      "门票业务：票档、持票人、下单、票夹。",
      "员工端扫码核销：防重复、核销记录，售票→入场闭环。",
    ],
  },
  {
    id: "shenyigou",
    name: "深易购",
    subtitle: "体育培训电商 · 教练排行与核销",
    themeColor: "#065f46",
    accentColor: "#6ee7b7",
    languages: ["uni-app", "Vue", "ThinkPHP"],
    terminals: ["App", "微信小程序", "后台"],
    operating: true,
    tags: ["教练排行", "自提核销", "商品问答"],
    featured: false,
    mockTitle: "深易购",
    mockLines: ["绑定教练", "区域排行榜", "自提扫码核销"],
    highlights: [
      "教练体系：绑定教练、教练/区域排行榜。",
      "自提扫码核销（含后台权限与并发行锁）+ 商品问答。",
    ],
  },
  {
    id: "niuai",
    name: "纽艾订货",
    subtitle: "企业订货 · 套餐与纽币",
    themeColor: "#1e3a8a",
    accentColor: "#a5b4fc",
    languages: ["uni-app", "Vue"],
    terminals: ["微信小程序"],
    operating: true,
    tags: ["企业审核", "合伙人套餐", "纽币"],
    featured: false,
    mockTitle: "纽艾",
    mockLines: ["企业资料审核", "合伙人套餐", "纽币支付"],
    highlights: [
      "企业资料审核准入后订货。",
      "合伙人套餐购买、纽币钱包支付与明细。",
    ],
  },
  {
    id: "zhuapai",
    name: "云上专拍",
    subtitle: "转拍 / 寄售 C2C",
    themeColor: "#334155",
    accentColor: "#94a3b8",
    languages: ["uni-app", "Vue"],
    terminals: ["微信小程序"],
    operating: true,
    tags: ["转拍", "寄售", "C2C"],
    featured: false,
    mockTitle: "专拍",
    mockLines: ["发布转拍商品", "卖家订单管理", "提货闭环"],
    highlights: [
      "转拍商品发布、预览、卖家订单与提货管理。",
      "突出 C2C/寄售差异，避免写成普通积分商城。",
    ],
  },
];

export function getFeaturedCases() {
  return CASES.filter((item) => item.featured);
}
