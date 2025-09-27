"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/app/lib/sanity";
import type { simpleProjectCard } from "@/app/lib/interface";

function cn(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

// 빈 상태 컴포넌트(선택)
function EmptyState() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 text-center text-ink/70 dark:text-white/70">
      아직 등록된 프로젝트가 없어요. 조금만 기다려줘!
    </div>
  );
}

export default function Projects({ data = [] }: { data?: simpleProjectCard[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    const cards = containerRef.current.querySelectorAll(".project-card");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.7 }
    );

    tl.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
      "-=0.35"
    );
  }, [data]);

  if (!data.length) return <EmptyState />;

  return (
    <section className="py-16">
      <div
        ref={containerRef}
        className="flex flex-col max-w-7xl mx-auto px-4 items-center justify-center"
      >
        <h1
          ref={titleRef}
          className="px-2 text-2xl md:text-3xl font-semibold text-ink dark:text-white mb-10 opacity-0 -translate-y-[30px]"
        >
          Our Successful Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2 w-full">
          {data.map((post) => {
            const imgUrl = urlFor(post.titleImage).width(1200).height(750).auto("format").url();
            return (
              <Link
                key={post.currentSlug}
                href={`/projects/${post.currentSlug}`}
                className="group"
                aria-label={`${post.title} 상세 보기`}
              >
                <Card
                  className={cn(
                    "project-card overflow-hidden rounded-2xl",
                    "border border-black/5 dark:border-white/10",
                    "bg-white/60 dark:bg-white/[0.03] backdrop-blur-md",
                    "shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
                    "transition-transform duration-300 hover:-translate-y-[2px]"
                  )}
                >
                  <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                    <Image
                      src={imgUrl}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={false}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-soft-light"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(127,195,15,0.10) 0%, rgba(159,220,47,0.08) 40%, rgba(127,195,15,0.08) 100%)",
                        filter: "saturate(0.97)",
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 64%, rgba(0,0,0,0.14) 100%)",
                      }}
                    />
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-base md:text-lg font-semibold text-ink dark:text-white line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm mt-1 text-ink/80 dark:text-white/80 line-clamp-3">
                      {post.smallDescription}
                    </p>

                    <Button
                      asChild
                      className="w-full mt-6 bg-[#73B60E] hover:bg-[#6CB10E] text-white"
                    >
                      <Link href={`/projects/${post.currentSlug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}