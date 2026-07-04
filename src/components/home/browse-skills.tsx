"use client";

import Link from "next/link";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { SkillCard } from "@/components/home/skill-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PrimaryCtaLink, SectionTitleBlock } from "@/components/ui/site-chrome";
import { FEATURED_SKILLS, STATS } from "@/data/mock";
import { getGridStaggerDelay } from "@/lib/animation";
import type { SearchSkill } from "@/lib/skillsmp-api";

export function BrowseSkills() {
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState<SearchSkill[]>(FEATURED_SKILLS);
  const [totalSkills, setTotalSkills] = useState(STATS.totalSkills);
  const [fromApi, setFromApi] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills/search?limit=9&sortBy=stars")
      .then((res) => res.json())
      .then((data) => {
        if (data.skills?.length) {
          setSkills(data.skills);
          setFromApi(Boolean(data.fromApi));
          if (data.total) {
            setTotalSkills(
              data.total >= 1000 ? `${data.total.toLocaleString()}+` : data.total.toLocaleString()
            );
          }
        }
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  const countLabel = fromApi ? totalSkills : STATS.totalSkills;

  return (
    <section
      id="browse"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <ScrollReveal className="mb-8">
        <SectionTitleBlock title="浏览 Agent Skills" subtitle="输入关键字搜索 skills" />
        <form
          role="search"
          action="/search"
          method="get"
          className="mx-auto mt-4 max-w-3xl"
          onSubmit={(e) => {
            if (!query.trim()) e.preventDefault();
          }}
        >
          <label className="sr-only" htmlFor="home-skill-search">
            输入关键字搜索 skills
          </label>
          <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-colors hover:border-primary/50 focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/15">
            <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground/70" />
                <input
                  id="home-skill-search"
                  name="q"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`搜索 ${countLabel} 个 skills：试试 'AI 视频'、'数据分析'、'code review'...`}
                  className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                />
              </div>
              <button
                type="submit"
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                <span>搜索 Skills</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </ScrollReveal>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          加载 skills…
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.id} delay={getGridStaggerDelay(index, 3)}>
              <SkillCard skill={skill} openInNewTab />
            </ScrollReveal>
          ))}
        </div>
      )}

      <ScrollReveal className="mt-10 text-center" delay={400}>
        <PrimaryCtaLink href="/search">浏览全部 skills</PrimaryCtaLink>
      </ScrollReveal>
    </section>
  );
}
