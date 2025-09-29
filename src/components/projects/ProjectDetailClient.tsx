// src/components/project/ProjectDetailClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/lib/sanity.image";
import type { MyImageSource } from "@/lib/sanity.image";

type FullProject = {
  currentSlug?: string;
  title: string;
  titleImage?: MyImageSource | null;
  body?: PortableTextBlock[] | null;
};

type PortableImageValue = {
  _type?: string;
  asset?: { _ref?: string; url?: string; _type?: string };
  alt?: unknown;
};

function getAlt(v: PortableImageValue): string {
  if (typeof v.alt === "string" && v.alt.trim().length > 0) return v.alt;
  return "본문 이미지";
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const v = (value || {}) as PortableImageValue;
      let src: string | null = null;
      try {
        src = urlFor(v as unknown as MyImageSource)
          .width(1200)
          .height(800)
          .auto("format")
          .url();
      } catch {
        src = null;
      }
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={getAlt(v)}
          width={1200}
          height={800}
          className="rounded-lg border mx-auto my-8"
        />
      );
    },
  },
};

function useSlugFromPathname(basePath = "/projects"): string {
  const pathname = usePathname();
  return useMemo(() => {
    if (!pathname) return "";
    if (!pathname.startsWith(basePath)) return "";
    const parts = pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || "";
  }, [pathname, basePath]);
}

export default function ProjectDetailClient({
  basePath = "/projects",
}: {
  basePath?: string;
}) {
  const slug = useSlugFromPathname(basePath);
  const [data, setData] = useState<FullProject | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "notfound" | "done"
  >("idle");
  const loadId = useRef(0);

  useEffect(() => {
    if (!slug) return; // slug 준비 전엔 요청 금지
    const myLoad = ++loadId.current;
    setStatus("loading");

    const ac = new AbortController();

    async function load() {
      try {
        const res = await fetch(`/api/project/${encodeURIComponent(slug)}`, {
          cache: "no-store", // 전환 직후 캐시 잔상 방지
          signal: ac.signal,
        });

        if (loadId.current !== myLoad) return; // 최신 요청만 반영

        if (res.status === 404) {
          setStatus("notfound");
          return;
        }
        if (!res.ok) {
          setStatus("error");
          return;
        }

        const json = (await res.json()) as FullProject;
        setData(json);
        setStatus("done");
      } catch {
        if (!ac.signal.aborted) setStatus("error");
      }
    }

    load();
    return () => {
      ac.abort();
    };
  }, [slug]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="animate-pulse text-ink/70 dark:text-white/70">
          Loading
        </div>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Project not found.</h1>
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">
          An error occurred. Please try again later.
        </h1>
      </div>
    );
  }

  let coverUrl: string | null = null;
  if (data.titleImage) {
    try {
      coverUrl = urlFor(data.titleImage)
        .width(1600)
        .height(1000)
        .auto("format")
        .url();
    } catch {
      coverUrl = null;
    }
  }
  const coverAlt = data.title ? `${data.title} cover` : "프로젝트 커버 이미지";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="text-center">
        <p className="text-sm font-semibold text-primary tracking-wide uppercase">
          Yunsung Indonesia
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-white">
          {data.title}
        </h1>
      </header>

      {coverUrl && (
        <div className="relative mt-8 w-full" style={{ aspectRatio: "16/10" }}>
          <Image
            src={coverUrl}
            alt={coverAlt}
            fill
            className="object-cover rounded-lg border"
            priority
          />
        </div>
      )}

      {Array.isArray(data.body) && data.body.length > 0 && (
        <article className="prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary mt-12 border border-gray-300 dark:border-white/15 rounded-md p-6">
          <PortableText value={data.body} components={portableComponents} />
        </article>
      )}
    </main>
  );
}
