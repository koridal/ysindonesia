// components/home/ProjectHighlight.tsx
"use client";

import { urlFor, type MyImageSource } from "@/lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import type { simpleProjectCard } from "@/app/lib/interface";

type Card = simpleProjectCard & { titleImage: MyImageSource };

export default function ProjectHighlight({
  data = [],
  heading = "Featured Projects",
  subheading = "Selected works across manufacturing, logistics, and process industries.",
  ctaHref = "/projects",
  ctaLabel = "View All",
}: {
  data?: Card[];
  heading?: string;
  subheading?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const list = (data ?? []).slice(0, 3);
  const has = list.length > 0;

  return (
    <section className="py-16">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink dark:text-white">{heading}</h2>
            <p className="mt-2 text-ink/80 dark:text-white/80 max-w-2xl">{subheading}</p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex h-9 items-center justify-center rounded-md bg-[#73B60E] px-4 text-sm font-medium text-white transition-colors hover:bg-[#6CB10E]"
          >
            {ctaLabel}
          </Link>
        </div>

        {!has ? (
          <div className="mt-10 text-ink/70 dark:text-white/70">아직 프로젝트가 없어요. 곧 업데이트할게!</div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {list.map((p) => {
              let imgUrl: string | null = null;
              try {
                imgUrl = urlFor(p.titleImage).width(1200).height(750).auto("format").url();
              } catch {
                imgUrl = null;
              }

              return (
                <Link key={p.currentSlug} href={`/projects/${p.currentSlug}`} className="group">
                  <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.10)] transition-transform duration-300 group-hover:-translate-y-[2px]">
                    <div className="relative aspect-[16/10] w-full">
                      {imgUrl && (
                        <Image
                          src={imgUrl}
                          alt={p.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
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
                    <div className="p-4">
                      <h3 className="font-semibold text-ink dark:text-white line-clamp-2">{p.title}</h3>
                      {p.smallDescription && (
                        <p className="text-sm mt-1 text-ink/80 dark:text-white/80 line-clamp-2">
                          {p.smallDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}