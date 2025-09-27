// app/projects/page.tsx
import { client } from "@/app/lib/sanity";
import ProjectHighlight from "@/components/home/ProjectHighlight";
import type { simpleProjectCard } from "@/app/lib/interface";

export const revalidate = 30;

const QUERY = `
  *[_type == 'post'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }
`;

async function getData(): Promise<simpleProjectCard[]> {
  const data = await client.fetch(QUERY);
  return data;
}

export default async function ProjectsIndexPage() {
  const data = await getData();
  return (
    <ProjectHighlight
      data={data}
      heading="All Projects"
      subheading="Browse all our works and case studies."
      ctaHref="/projects"
      ctaLabel="All Projects"
    />
  );
}