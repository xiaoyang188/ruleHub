"use client";

import {
  Briefcase,
  Calendar,
  Download,
  GraduationCap,
  LayoutGrid,
  Mail,
  MapPin,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { getResumeAge, RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

export function ResumeView() {
  const age = getResumeAge();

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="resume-page">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-sm text-muted-foreground">在线简历 · 可导出为 PDF</p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
          >
            <LayoutGrid className="h-4 w-4 text-primary" />
            案例展示
          </Link>
          <button
            type="button"
            onClick={handleExportPdf}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <Download className="h-4 w-4" />
            导出 PDF
          </button>
        </div>
      </div>

      <article
        id="resume-print-root"
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-36px_rgba(217,145,120,0.45)]"
      >
        <header className="relative overflow-hidden border-b border-border px-6 py-8 sm:px-8 sm:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,145,120,0.18),transparent_55%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-primary">Personal Resume</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {RESUME.name}
              </h1>
              <p className="mt-2 text-base text-muted-foreground">{RESUME.title}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-md border border-border bg-background/50 px-2.5 py-1">
                  {RESUME.gender} · {age} 岁
                </span>
                <span className="rounded-md border border-border bg-background/50 px-2.5 py-1">
                  {RESUME.location}
                </span>
                <span className="rounded-md border border-border bg-background/50 px-2.5 py-1">
                  出生 {RESUME.birthDateDisplay}
                </span>
                <span className="rounded-md border border-border bg-background/50 px-2.5 py-1">
                  经验 {RESUME.experienceYears} 年
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {RESUME.availability}
              </span>
              <a
                href={`mailto:${RESUME.email}`}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-3.5 w-3.5" />
                {RESUME.email}
              </a>
              <a
                href={RESUME.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <MapPin className="h-3.5 w-3.5" />
                {RESUME.website}
              </a>
            </div>
          </div>
        </header>

        <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-8 border-b border-border bg-muted/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                教育背景
              </h2>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="font-medium text-foreground">{RESUME.education.school}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {RESUME.education.major} · {RESUME.education.degree}
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                <Wrench className="h-4 w-4 text-primary" />
                专业技能
              </h2>
              <div className="space-y-4">
                {RESUME.skillGroups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 text-xs font-medium text-primary">{group.label}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                基本信息
              </h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">所在城市</dt>
                  <dd className="font-medium text-foreground">{RESUME.location}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">到岗时间</dt>
                  <dd className="font-medium text-foreground">{RESUME.availability}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">工作年限</dt>
                  <dd className="font-medium text-foreground">{RESUME.experienceYears} 年</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">出生日期</dt>
                  <dd className="font-medium text-foreground">{RESUME.birthDateDisplay}</dd>
                </div>
              </dl>
            </section>
          </aside>

          <div className="space-y-8 p-6 sm:p-8">
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                个人概述
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{RESUME.summary}</p>
              <ul className="mt-4 space-y-2">
                {RESUME.strengths.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                项目经历
              </h2>
              <div className="space-y-4">
                {RESUME.projects.map((project, index) => (
                  <div
                    key={project.name}
                    className={cn(
                      "relative rounded-xl border border-border bg-background/40 p-5",
                      "transition-colors hover:border-primary/40"
                    )}
                  >
                    <div className="absolute left-0 top-5 h-8 w-0.5 rounded-full bg-primary" />
                    <div className="flex flex-wrap items-start justify-between gap-2 pl-3">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {project.href ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary"
                            >
                              {project.name}
                            </a>
                          ) : (
                            project.name
                          )}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {project.role}
                        </p>
                      </div>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {project.period}
                      </span>
                    </div>
                    <p className="mt-3 pl-3 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <ul className="mt-3 space-y-1.5 pl-3">
                      {project.highlights.map((point) => (
                        <li
                          key={point}
                          className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:text-primary before:content-['•']"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1.5 pl-3">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="sr-only">项目 {index + 1}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
