// ProjectGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import type { simpleProjectCard } from "@/app/lib/interface";

export default function ProjectGrid({ items }: { items: simpleProjectCard[] }) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ProjectCard key={item.currentSlug} item={item} />
      ))}
    </section>
  );
}

function ProjectCard({ item }: { item: simpleProjectCard }) {
  const imgUrl = getImageUrl(item);

  return (
    <Link
      href={`/projects/${encodeURIComponent(item.currentSlug)}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={item.title ?? "project cover"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-500 text-sm">
            No Image
          </div>
        )}
        <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur">
          NEW
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[3.25rem] text-base font-semibold leading-snug">
          {item.title}
        </h3>
        {item.smallDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-ink/70 dark:text-white/70">
            {item.smallDescription}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-primary/90 group-hover:text-primary transition-colors">
            Read more
          </span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs group-hover:bg-primary group-hover:text-white transition-colors">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function getImageUrl(item: simpleProjectCard): string | null {
  try {
    if (!item.titleImage) return null;
    return urlFor(item.titleImage).width(800).height(600).auto("format").url();
  } catch {
    return null;
  }
}