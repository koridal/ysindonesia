"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

type ServiceGalleryProps = {
  title: string;
  description?: string;
  items: GalleryItem[];
};

export default function ServiceGallery({
  title,
  description,
  items,
}: ServiceGalleryProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <section className="mt-12">
      <header className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-ink dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm md:text-base text-ink/80 dark:text-white/80 max-w-prose">
            {description}
          </p>
        )}
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((it, idx) => (
          <button
            key={idx}
            onClick={() => setActive(it)}
            className="
              group relative overflow-hidden rounded-xl
              border border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm
              aspect-[4/3]
              hover:-translate-y-0.5 hover:shadow-2xl transition-all
            "
            aria-label={`Open image: ${it.alt}`}
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent" />
            <span className="pointer-events-none absolute bottom-2 left-2 text-[11px] md:text-xs text-white/90">
              {it.alt}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setActive(null)}
              className="absolute -top-10 right-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 bg-white/20 text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50">
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
