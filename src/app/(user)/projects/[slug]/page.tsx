// app/(user)/projects/[slug]/page.tsx
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

export const revalidate = 30;

export default function Page() {
  return <ProjectDetailClient />;
}