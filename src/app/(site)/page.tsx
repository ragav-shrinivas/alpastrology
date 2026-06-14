import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;

export default async function HomePage() {
  const sections = await getPageSections("home");
  return <SectionRenderer sections={sections} />;
}
