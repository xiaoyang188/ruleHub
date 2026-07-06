import Link from "next/link";
import { ArrowRight, Briefcase, Code2, Search, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getGridStaggerDelay } from "@/lib/animation";
import { siteFeatures } from "@/lib/site-features";

const EXPLORE_CARDS = [
  {
    step: "01",
    title: "按职业探索领域",
    description:
      "从 23 个职业大类和 867 个 SOC 职位进入，熟悉其他领域有哪些 skills，以及这些 skills 如何拆任务、写说明。",
    href: "/occupations",
    cta: "按职业探索",
    icon: Briefcase,
  },
  {
    step: "02",
    title: "按创作者追来源",
    description:
      "查看创作者维护的仓库、skills 数量和更新时间，判断这是一次性示例，还是可持续参考的技能集合。",
    href: "/creators",
    cta: "浏览创作者",
    icon: Users,
  },
  {
    step: "03",
    title: "带着来源搜索",
    description:
      "关键词搜索 200 万+ 个已收集 skills，再结合职业标签、创作者和 GitHub 来源判断哪些值得打开。",
    href: "/search",
    cta: "搜索 Skills",
    icon: Search,
  },
];

export function EcosystemSection() {
  return (
    <section
      aria-labelledby="ecosystem-heading"
      className="border-y border-border bg-background px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            RuleHub / 创作者、职业分类
          </p>
          <h2
            id="ecosystem-heading"
            className="text-2xl font-bold text-foreground sm:text-3xl"
          >
            按职业和创作者探索 Agent Skills 生态
          </h2>
        </ScrollReveal>

        <ScrollReveal
          className="mx-auto mt-8 max-w-3xl space-y-4 text-center text-sm leading-relaxed text-muted-foreground md:text-base"
          delay={100}
        >
          <p>
            RuleHub 不只是把 SKILL.md 放进搜索框。它更像一张开放地图：按职业、创作者和仓库组织公开
            skills，帮助你看到不同领域正在把哪些工作流程、判断标准和专业习惯写给 AI agents。
          </p>
          <p>
            也可以按创作者或 GitHub 仓库回到来源：看同一个团队维护了哪些 skills、仓库是否活跃、README
            怎么组织，再决定是否打开、安装或复用。
          </p>
          <p className="text-muted-foreground/80">
            适合三种用法：按职业了解陌生领域，按创作者学习别人怎么组织 skill，最后按来源判断哪些值得打开或复用。
          </p>
        </ScrollReveal>

        {siteFeatures.showApiDocs && (
          <ScrollReveal className="mt-8" delay={200}>
            <Link
              href="/docs/api"
              className="group flex flex-col rounded-xl border border-primary/30 bg-primary/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/15">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    开发者入口
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-foreground">
                    把同一份目录数据接入你的工具
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                    通过 REST API 使用 200 万+ 个公开 skills，用在自己的搜索、分析或 agent
                    工作流里。
                  </p>
                </div>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary md:mt-0">
                查看 API 文档
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </ScrollReveal>
        )}

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {EXPLORE_CARDS.map((card, index) => (
            <ScrollReveal key={card.step} delay={getGridStaggerDelay(index, 3)}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-muted/20"
              >
                <span className="text-sm font-mono text-primary">{card.step}</span>
                <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground/80"
          delay={400}
        >
          <p>
            先从职业图谱理解场景，再沿着创作者和仓库回到真实代码。RuleHub
            不是只给一个名字，而是帮你判断一个 skill 为什么值得打开。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
