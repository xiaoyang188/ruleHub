import { Hero } from "@/components/home/hero";
import { BrowseSkills } from "@/components/home/browse-skills";
import { OccupationsSection } from "@/components/home/occupations-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { EcosystemSection } from "@/components/home/ecosystem-section";
import { FaqSection } from "@/components/home/faq-section";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { createPageMetadata } from "@/lib/site-seo";

export const metadata = {
  ...createPageMetadata({
    title: "RuleHub — Agent Skills 市场与 AI 编程灵感",
    description:
      "在 RuleHub 搜索与浏览 Claude Code、Codex、ChatGPT 适用的开源 Agent Skills，发现 VibeCoding 项目与 AI 行业最新动态。",
    path: "/",
    keywords: [
      "Agent Skills 市场",
      "SKILL.md",
      "Claude Code Skills",
      "Codex Skills",
      "AI 编程",
      "VibeCoding",
    ],
  }),
  title: { absolute: "RuleHub — Agent Skills 市场与 AI 编程灵感" },
};

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <Hero />
      <BrowseSkills />
      <OccupationsSection />
      <CategoriesSection />
      <EcosystemSection />
      <FaqSection />
    </>
  );
}
