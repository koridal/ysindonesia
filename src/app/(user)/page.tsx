import AboutPreview from "@/components/home/AboutPreview";
import Hero from "@/components/home/Hero";
import ProductsPreview from "@/components/home/ProductsPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import { client } from "@/app/lib/sanity";
import ProjectHighlight from "@/components/home/ProjectHighlight";
import type { simpleProjectCard } from "@/app/lib/interface";
import Marquee from "@/components/home/Marquee";
import Contact from "@/components/contact/Contact";
import CallToAction from "@/components/home/CallToAction";

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
  const list = (data ?? []).slice(0, 4);

  return (
    <div>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProductsPreview />
      <ProjectHighlight
        data={list}
        heading="All Projects"
        subheading="Browse all our works and case studies."
        ctaHref="/projects"
        ctaLabel="All Projects"
      />
      <Marquee />
      <Contact />
      <CallToAction />
    </div>
  );
}
