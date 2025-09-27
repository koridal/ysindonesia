// components/home/ProjectHighlight.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";

type Project = {
  title: string;
  slug: string;
  img: string;
  year: number;
  industry: string;
  location: string;
};

const HIGHLIGHTS: Project[] = [
  {
    title: "Greenfield Smart Plant",
    slug: "greenfield-smart-plant",
    img: "/images/projects/project-01.jpg",
    year: 2024,
    industry: "Manufacturing",
    location: "Bekasi, West Java",
  },
  {
    title: "High-Speed Logistics Hub",
    slug: "high-speed-logistics-hub",
    img: "/images/projects/project-02.jpg",
    year: 2023,
    industry: "Logistics",
    location: "Karawang, West Java",
  },
  {
    title: "Process Utilities Upgrade",
    slug: "process-utilities-upgrade",
    img: "/images/projects/project-03.jpg",
    year: 2023,
    industry: "Process",
    location: "Cikarang, West Java",
  },
];

export default function ProjectHighlight() {
  return (
    <section className="py-16">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-2 text-ink/80 dark:text-white/80 max-w-2xl">
              Selected works across manufacturing, logistics, and process
              industries.
            </p>
          </div>
          <Button asChild>
            <Link href="/projects">View All</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`}>
              <GlassCard className="glass glass-hover overflow-hidden">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-black/50 text-white text-xs px-2 py-1 backdrop-blur-sm dark:bg-white/15">
                      {p.year}
                    </span>
                    <span className="rounded-full bg-black/50 text-white text-xs px-2 py-1 backdrop-blur-sm dark:bg-white/15">
                      {p.industry}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-ink dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-sm mt-1 text-ink/80 dark:text-white/80">
                    {p.location}
                  </p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
