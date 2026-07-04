export interface CategorySubItem {
  id: string;
  name: string;
  count: string;
}

export interface CategoryDomainSection {
  id: string;
  name: string;
  count: string;
  subcategories: CategorySubItem[];
}

export const CATEGORY_DOMAIN_SECTIONS: CategoryDomainSection[] = [
  {
    id: "tools",
    name: "工具",
    count: "479,365",
    subcategories: [
      { id: "debugging", name: "调试工具", count: "245,048" },
      { id: "system-admin", name: "系统管理", count: "101,330" },
      { id: "productivity-tools", name: "生产力工具", count: "74,853" },
      { id: "automation-tools", name: "自动化工具", count: "21,747" },
      { id: "ide-plugins", name: "IDE 插件", count: "18,892" },
      { id: "cli-tools", name: "命令行工具", count: "12,551" },
      { id: "dns-tools", name: "域名与 DNS 工具", count: "7,697" },
    ],
  },
  {
    id: "business",
    name: "商业",
    count: "375,596",
    subcategories: [
      { id: "sales-marketing", name: "销售与营销", count: "196,532" },
      { id: "project-management", name: "项目管理", count: "65,585" },
      { id: "finance-investment", name: "金融与投资", count: "58,931" },
      { id: "real-estate-legal", name: "房地产与法律", count: "33,557" },
      { id: "health-fitness", name: "健康健身", count: "6,716" },
      { id: "payments", name: "支付", count: "6,331" },
      { id: "ecommerce", name: "电子商务", count: "6,122" },
      { id: "business-apps", name: "商业应用", count: "2,417" },
    ],
  },
  {
    id: "development",
    name: "开发",
    count: "274,195",
    subcategories: [
      { id: "architecture-patterns", name: "架构模式", count: "69,770" },
      { id: "backend-development", name: "后端开发", count: "46,081" },
      { id: "frontend-development", name: "前端开发", count: "37,578" },
      { id: "game-development", name: "游戏开发", count: "22,877" },
      { id: "mobile-development", name: "移动开发", count: "20,959" },
      { id: "scripting", name: "脚本编程", count: "19,130" },
      { id: "package-management", name: "包管理与发布", count: "15,114" },
      { id: "framework-core", name: "框架内核开发", count: "14,934" },
      { id: "cms-platform", name: "CMS 与平台开发", count: "12,423" },
      { id: "fullstack", name: "全栈开发", count: "12,056" },
      { id: "ecommerce-dev", name: "电商开发", count: "5,975" },
    ],
  },
  {
    id: "testing-security",
    name: "测试与安全",
    count: "216,595",
    subcategories: [
      { id: "code-quality", name: "代码质量", count: "94,466" },
      { id: "testing", name: "测试", count: "64,309" },
      { id: "security", name: "安全", count: "58,013" },
    ],
  },
  {
    id: "data-ai",
    name: "数据与AI",
    count: "177,101",
    subcategories: [
      { id: "llm-ai", name: "LLM 与 AI", count: "91,692" },
      { id: "machine-learning", name: "机器学习", count: "41,114" },
      { id: "data-engineering", name: "数据工程", count: "31,216" },
      { id: "data-analysis", name: "数据分析", count: "13,229" },
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    count: "157,701",
    subcategories: [
      { id: "git-workflows", name: "Git 工作流", count: "87,216" },
      { id: "cicd", name: "CI/CD", count: "34,760" },
      { id: "cloud-platforms", name: "云平台", count: "15,813" },
      { id: "containers", name: "容器", count: "12,374" },
      { id: "monitoring", name: "监控", count: "8,096" },
    ],
  },
  {
    id: "documentation",
    name: "文档",
    count: "140,258",
    subcategories: [
      { id: "knowledge-base", name: "知识库", count: "53,327" },
      { id: "technical-docs", name: "技术文档", count: "47,921" },
      { id: "education", name: "教育", count: "39,478" },
    ],
  },
  {
    id: "content-media",
    name: "内容与媒体",
    count: "123,779",
    subcategories: [
      { id: "documents", name: "文档处理", count: "72,696" },
      { id: "content-creation", name: "内容创作", count: "24,497" },
      { id: "design", name: "设计", count: "14,132" },
      { id: "media-processing", name: "媒体处理", count: "12,560" },
    ],
  },
  {
    id: "research",
    name: "研究",
    count: "79,701",
    subcategories: [
      { id: "academic-research", name: "学术研究", count: "22,079" },
      { id: "bioinformatics", name: "生物信息学", count: "17,617" },
      { id: "lab-tools", name: "实验室工具", count: "14,217" },
      { id: "computational-chemistry", name: "计算化学", count: "13,891" },
      { id: "scientific-computing", name: "科学计算", count: "6,226" },
      { id: "astrophysics", name: "天文物理", count: "5,708" },
    ],
  },
  {
    id: "lifestyle",
    name: "生活方式",
    count: "28,813",
    subcategories: [
      { id: "philosophy-ethics", name: "哲学与伦理", count: "6,143" },
      { id: "literature-writing", name: "文学与写作", count: "5,716" },
      { id: "wellness", name: "健康养生", count: "5,638" },
      { id: "arts-crafts", name: "艺术与手工", count: "5,380" },
      { id: "divination", name: "占卜与玄学", count: "4,443" },
      { id: "culinary", name: "烹饪艺术", count: "1,496" },
    ],
  },
  {
    id: "database",
    name: "数据库",
    count: "22,615",
    subcategories: [
      { id: "database-tools", name: "数据库工具", count: "11,462" },
      { id: "sql-databases", name: "SQL 数据库", count: "9,926" },
      { id: "nosql-databases", name: "NoSQL 数据库", count: "1,365" },
    ],
  },
  {
    id: "blockchain",
    name: "区块链",
    count: "15,286",
    subcategories: [
      { id: "smart-contracts", name: "智能合约", count: "7,801" },
      { id: "web3-tools", name: "Web3 工具", count: "6,310" },
      { id: "defi", name: "DeFi", count: "1,175" },
    ],
  },
];

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  tools:
    "浏览精选的 agent skills 开发工具和实用程序集合。此领域包括命令行工具、IDE 插件、自动化工具和生产力增强工具，简化您的开发工作流程，提高软件开发各方面的效率。",
  business: "商业运营、销售营销、项目管理与投资分析相关的 Agent Skills。",
  development: "软件开发全流程 skills，覆盖前端、后端、移动、游戏与架构模式。",
  "testing-security": "代码质量、测试自动化与安全审计相关的 Agent Skills。",
  "data-ai": "LLM、机器学习、数据工程与数据分析相关的 Agent Skills。",
  devops: "Git 工作流、CI/CD、云平台、容器与监控相关的 DevOps skills。",
  documentation: "知识库、技术文档与教育类 Agent Skills。",
  "content-media": "文档处理、内容创作、设计与媒体处理相关的 skills。",
  research: "学术研究、生物信息学与科学计算相关的 Agent Skills。",
  lifestyle: "生活方式、文学、艺术与健康相关的 Agent Skills。",
  database: "数据库工具与 SQL/NoSQL 相关的 Agent Skills。",
  blockchain: "智能合约、Web3 与 DeFi 相关的 Agent Skills。",
};
