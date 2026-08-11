export type FaqReference = {
  title: string;
  href: string;
  date?: string;
  type: "博客" | "文档" | "帮助";
};

export type FaqDocItem = {
  id: string;
  question: string;
  answer: string;
  references?: FaqReference[];
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqDocItem[];
};

export const FAQ_DOC_CATEGORIES: FaqCategory[] = [
  {
    id: "basics",
    title: "基础问题",
    items: [
      {
        id: "skills-useful",
        question: "Skills 真的有用吗？基础 Claude 对我来说已经很好用了。",
        answer: `如果你的任务是一次性的且通用的，基础 Claude 是完美的。但 Skills 在以下情况下会发光：

- 经常重复类似的任务（节省每次解释上下文的时间）
- 需要遵循特定的公司工作流程
- 需要 Claude 训练中没有的深度领域专业知识
- 希望每次都获得一致的结果

这样想：基础 Claude 是一个聪明的通才，Skills 增加了专家知识。`,
        references: [
          {
            title: "Introducing Agent Skills",
            href: "https://claude.com/blog/skills",
            date: "2025-10-16",
            type: "博客",
          },
          {
            title: "什么是 Skills? - 帮助中心",
            href: "https://support.claude.com/en/articles/12512176-what-are-skills",
            date: "2025-10-16",
            type: "帮助",
          },
        ],
      },
      {
        id: "what-is-agent-skill",
        question: "什么是 Agent Skills？",
        answer: `Agent Skills 是以 **SKILL.md** 文件形式存在的模块化指令包，用于扩展 AI 编码助手的能力。每个 skill 包含名称、描述和使用指南，帮助 AI 在特定场景下表现更专业。

RuleHub 只做索引与展示，skill 源码始终托管在 GitHub 上。安装前建议在详情页阅读 \`SKILL.md\` 与 \`LICENSE.txt\`。`,
        references: [
          {
            title: "什么是 Agent Skill？（RuleHub 教程）",
            href: "/insights/what-is-agent-skill",
            type: "文档",
          },
          {
            title: "SKILL.md 格式指南",
            href: "/insights/skill-md-format-guide",
            type: "文档",
          },
        ],
      },
    ],
  },
  {
    id: "quality",
    title: "质量与测试",
    items: [
      {
        id: "all-tested",
        question: "所有这些 skills 都经过测试了吗？",
        answer: `老实说？**没有。**

我们从社区索引了大量 skills——质量参差不齐。RuleHub 不会亲自测试每一个。

这也是为什么我们建议你：

- 安装前阅读 \`SKILL.md\` 与相关脚本
- 查看 GitHub star 数与最近提交时间
- 优先选择有清晰文档和真实用例的仓库

像对待开源代码一样对待 Skills：使用前审查，查看 GitHub 星标，阅读 README。`,
        references: [
          {
            title: "skill-creator 官方模板",
            href: "https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md",
            date: "持续更新",
            type: "文档",
          },
          {
            title: "如何评估 GitHub Skills 的安全性",
            href: "/insights/evaluate-github-skills",
            type: "文档",
          },
        ],
      },
      {
        id: "quality-signals",
        question: "我如何知道一个 skill 的质量好不好？",
        answer: `寻找这些信号：

- ✓ 高 GitHub 星标（社区验证）
- ✓ 活跃维护（最近的提交）
- ✓ \`SKILL.md\` 中的清晰文档
- ✓ README 中的真实用例
- ✓ 来自领域专家，而不仅仅是 AI 生成

RuleHub 详情页会展示 star 数、更新时间等信息，可作为初步筛选参考。`,
        references: [
          {
            title: "Claude Code Documentation - Skills",
            href: "https://code.claude.com/docs/en/skills",
            date: "持续更新",
            type: "文档",
          },
          {
            title: "如何挑选 Claude Skills",
            href: "/insights/how-to-pick-claude-skills",
            type: "文档",
          },
        ],
      },
      {
        id: "security",
        question: "有安全风险吗？",
        answer: `有，像对待任何开源代码一样对待 Skills：

- ⚠️ Skills 可能包含脚本（Python、Bash 等）
- ⚠️ 安装前始终审查代码
- ⚠️ 检查作者在 GitHub 上的声誉
- ⚠️ 优先选择可信来源的 skills

RuleHub 不扫描恶意软件。这是社区驱动的内容——使用常识和尽职调查。`,
        references: [
          {
            title: "Improving frontend design through Skills",
            href: "https://claude.com/blog/improving-frontend-design-through-skills",
            date: "2025-11-12",
            type: "博客",
          },
          {
            title: "API 路由安全检查清单",
            href: "/insights/api-route-security-checklist",
            type: "文档",
          },
        ],
      },
    ],
  },
  {
    id: "install",
    title: "安装与使用",
    items: [
      {
        id: "platform-support",
        question: "Skills 在所有平台上都能工作吗？",
        answer: `大多数 skills 在所有平台上都能工作：

- ✅ 常规 Skills（Python/JS/Markdown）→ Web + Desktop + CLI
- ⚠️ 使用 MCP 工具的 Skills → 通常仅 Desktop + CLI（Web 支持因客户端而异）

具体取决于你使用的 AI 客户端。安装前请阅读 skill 文档中的平台说明。`,
        references: [
          {
            title: "Using Skills in Claude",
            href: "https://support.claude.com/en/articles/12512180-using-skills-in-claude",
            date: "2025-10-16",
            type: "帮助",
          },
          {
            title: "从 RuleHub 安装 Agent Skills",
            href: "/insights/install-agent-skills-from-rulehub",
            type: "文档",
          },
        ],
      },
      {
        id: "install-multiple",
        question: "我可以一次安装多个 skills 吗？",
        answer: `可以。大多数 AI 编码工具支持同时加载多个 skills，AI 会根据当前任务自动选择最相关的 skill。

在 RuleHub 上你可以：

- 使用详情页的 **命令** 标签，通过 \`/plugin marketplace add\` 安装
- 使用 **Prompt** 标签，让 AI 帮你批量复制到 \`~/.claude/skills/\`
- 点击 **下载 Zip**，解压后手动复制多个 skill 目录

建议一次不要加载过多无关 skills，以免占用上下文窗口。`,
        references: [
          {
            title: "OpenAI API - Agent Skills",
            href: "https://developers.openai.com/api/docs/guides/tools-skills",
            date: "持续更新",
            type: "文档",
          },
        ],
      },
      {
        id: "install-from-rulehub",
        question: "如何从 RuleHub 安装 Agent Skills？",
        answer: `三种常用方式：

1. **插件命令**：复制详情页「安装 → 命令」中的 \`/plugin marketplace add author/repo\`
2. **Prompt 辅助**：复制 Prompt 到 Codex / Claude，让 AI 帮你完成安装
3. **下载 Zip**：获取 GitHub 仓库压缩包，解压到 \`~/.claude/skills/\` 或 \`.claude/skills/\`

安装前务必在详情页 **文件资源管理器** 中阅读 \`SKILL.md\`。`,
        references: [
          {
            title: "Skill 文档",
            href: "/docs/skill",
            type: "文档",
          },
        ],
      },
    ],
  },
  {
    id: "technical",
    title: "技术细节",
    items: [
      {
        id: "skills-vs-commands",
        question: "Skills、Agents、Commands 和 Hooks 有什么区别？",
        answer: `这些都是 Claude Code 插件生态中的不同构件：

- **Skills** (\`SKILL.md\`) — 知识和工作流程
- **Agents** (\`AGENT.md\`) — 自主任务执行器
- **Commands** (\`COMMAND.md\`) — 斜杠命令 (\`/foo\`)
- **Hooks** — 事件触发器（pre-commit 等）

许多仓库包含捆绑在一起的多种类型。RuleHub 当前主要索引 **Skills**。`,
        references: [
          {
            title: "Skills 与 Prompt、Rules 的区别",
            href: "/insights/prompt-vs-skill-vs-rules",
            type: "文档",
          },
          {
            title: "Skills 详细解释：与 MCP 对比",
            href: "https://claude.com/blog/skills-explained",
            date: "2025-11-13",
            type: "博客",
          },
        ],
      },
      {
        id: "lazy-loading",
        question: "「延迟加载」是如何工作的？",
        answer: `Skills 使用渐进式披露：

1. Claude 最初看到：skill 名称 + 简短描述（很少的 tokens）
2. 如果可能相关：Claude 读取完整的 \`SKILL.md\`（更多 tokens）
3. 如果需要：Claude 加载 \`references/\` 和 \`assets/\`（更多 tokens）

这比一次性加载所有内容（像部分 MCP 场景那样）更节省 tokens。`,
        references: [
          {
            title: "skill-creator 官方模板",
            href: "https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md",
            date: "持续更新",
            type: "文档",
          },
        ],
      },
      {
        id: "modify-skill",
        question: "我可以修改下载的 skill 吗？",
        answer: `当然可以！一旦安装，skills 只是你系统上的文件。

你可以：

- ✓ 编辑 \`SKILL.md\` 以自定义工作流程
- ✓ 添加你自己的最佳实践
- ✓ 修改 \`scripts/\` 目录中的脚本
- ✓ 在 GitHub 上 fork 并分享你的版本

只需尊重原始许可条款。`,
        references: [
          {
            title: "90 分钟写出第一个 SKILL.md",
            href: "/insights/write-first-skill-md-90min",
            type: "文档",
          },
        ],
      },
    ],
  },
  {
    id: "community",
    title: "社区与贡献",
    items: [
      {
        id: "submit-skill",
        question: "我如何将 skill 提交到 RuleHub？",
        answer: `我们从 GitHub 自动索引 skills！要被收录：

1. 创建一个带 \`SKILL.md\` 文件的 **公开** GitHub 仓库
2. 添加适当的 frontmatter（名称、描述）
3. 确保仓库可被公开访问
4. 等待下一次索引同步

无需手动提交表单。若长期未出现，可通过 [联系我们](/contact) 反馈。`,
        references: [
          {
            title: "Skills 索引多久更新一次？",
            href: "/insights/skills-index-update-frequency",
            type: "文档",
          },
          {
            title: "RuleHub 是独立项目吗？",
            href: "/insights/rulehub-independent-project",
            type: "文档",
          },
        ],
      },
      {
        id: "affiliation",
        question: "本网站与 Anthropic 或 OpenAI 有关联吗？",
        answer: `**没有。** RuleHub 是独立的社区项目，与 Anthropic、OpenAI 或任何 AI 公司均无官方关联。

我们索引社区开源 skills，不分发闭源模型或官方插件包。名称与 Logo 仅用于说明兼容性，不暗示官方合作。`,
        references: [
          {
            title: "关于 RuleHub",
            href: "/about",
            type: "文档",
          },
        ],
      },
    ],
  },
];

/** 首页展示的 FAQ（每个分类取 1–2 个代表问题） */
const HOME_FAQ_IDS = [
  "skills-useful",
  "what-is-agent-skill",
  "security",
  "install-from-rulehub",
  "install-multiple",
  "skills-vs-commands",
  "submit-skill",
  "affiliation",
] as const;

export const FAQ_HOME_ITEMS = FAQ_DOC_CATEGORIES.flatMap((category) =>
  category.items.filter((item) => (HOME_FAQ_IDS as readonly string[]).includes(item.id))
).map((item) => ({
  id: item.id,
  question: item.question,
  answer: item.answer
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .split("\n\n")[0]
    .slice(0, 140),
  href: `/docs/faq#q-${item.id}`,
}));

export function getFaqDocCount() {
  return FAQ_DOC_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
}
