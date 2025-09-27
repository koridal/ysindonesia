import AboutPreview from "@/components/home/AboutPreview";
import Hero from "@/components/home/Hero";
import ProductsPreview from "@/components/home/ProductsPreview";
import ProjectHighlight from "@/components/home/ProjectHighlight";
import ServicesPreview from "@/components/home/ServicesPreview";



export default function HomePage() {
  return (
    <div>
      <Hero/>
      <AboutPreview />
      <ServicesPreview />
      <ProductsPreview />
      <ProjectHighlight />
    </div>
  );
}
