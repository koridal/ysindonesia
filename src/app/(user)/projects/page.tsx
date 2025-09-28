// app/projects/page.tsx
import { client } from "@/app/lib/sanity";
import type { simpleProjectCard } from "@/app/lib/interface";
import HeroSection from "@/components/projects/HeroSection";
import Divider from "@/components/projects/Divider";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const revalidate = 30;

const QUERY = `
  *[_type == "post"] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }
`;

async function getData(): Promise<simpleProjectCard[]> {
  const data = await client.fetch<simpleProjectCard[]>(QUERY);
  return Array.isArray(data) ? data : [];
}

export default async function ProjectsIndexPage() {
  const data = await getData();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 pb-16 space-y-12">
      <HeroSection />
      <Divider />
      <ProjectGrid items={data} />
    </main>
  );
}