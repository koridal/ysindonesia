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
  return client.fetch<simpleProjectCard[]>(QUERY);
}

export default async function ProjectsIndexPage() {
  const data = await getData();
  const list = (data ?? []).slice(0, 3); // 하이라이트는 3개만
  return (
    <ProjectHighlight
      data={list}
      heading="All Projects"
      subheading="Browse all our works and case studies."
      ctaHref="/projects"
      ctaLabel="All Projects"
    />
  );
}