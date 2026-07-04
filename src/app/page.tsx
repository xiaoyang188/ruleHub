import { Hero } from "@/components/home/hero";
import { BrowseSkills } from "@/components/home/browse-skills";
import { OccupationsSection } from "@/components/home/occupations-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { EcosystemSection } from "@/components/home/ecosystem-section";
import { FaqSection } from "@/components/home/faq-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrowseSkills />
      <OccupationsSection />
      <CategoriesSection />
      <EcosystemSection />
      <FaqSection />
    </>
  );
}
