// app/projects/page.tsx
import { client } from "@/app/lib/sanity";
import type { simpleProjectCard } from "@/app/lib/interface";
import HeroSection from "@/components/projects/HeroSection";
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
    <main
      className="
        mx-auto max-w-7xl
        px-6 sm:px-8 lg:px-12
        pt-20 md:pt-28 pb-20
        space-y-12
      "
    >
      <HeroSection
        title="All Projects"
        subtitle="Browse all our works and case studies."
        primaryHref="/projects"
        primaryLabel="View All"
        secondaryHref="/"
        secondaryLabel="Home"
        align="left"
      />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <section className="mt-2">
        <ProjectGrid items={data} />
      </section>
    </main>
  );
}
