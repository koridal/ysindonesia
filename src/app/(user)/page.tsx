import { client } from "@/app/lib/sanity";
import ProjectHighlight from "@/components/home/ProjectHighlight";
import type { simpleProjectCard } from "@/app/lib/interface";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProductsPreview from "@/components/home/ProductsPreview";

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
  return client.fetch(QUERY);
}

export default async function HomePage() {
  const data = await getData();
  console.log("[ProjectsIndex] count:", Array.isArray(data) ? data.length : "no-array");
  // 혹시 컴포넌트에서 slice를 빼고 싶으면 여기서 3개로 자르면 됨
  // const highlights = (data ?? []).slice(0, 3);
  return (
    <div>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProductsPreview />
      <ProjectHighlight
        data={data} // 컴포넌트에서 내부적으로 3개로 제한
        heading="Featured Projects"
        subheading="Selected works across manufacturing, logistics, and process industries."
        ctaHref="/projects"
        ctaLabel="View All"
      />
    </div>
  );
}
