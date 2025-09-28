// components/project/ProjectDetailClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/lib/sanity.image";
import type { MyImageSource } from "@/lib/sanity.image";

type FullProject = {
  title: string;
  titleImage?: MyImageSource | null;
  body?: PortableTextBlock[] | null;
};

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // Sanity PortableText 내 이미지 블록을 널리 처리
      let src: string | null = null;
      try {
        src = urlFor(value as unknown as MyImageSource)
          .width(1200)
          .height(800)
          .auto("format")
          .url();
      } catch {
        src = null;
      }
      if (!src) return null;

      const alt =
        typeof (value as any)?.alt === "string" &&
        (value as any)?.alt?.trim().length > 0
          ? (value as any).alt
          : "본문 이미지";

      return (
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="rounded-lg border mx-auto my-8"
        />
      );
    },
  },
};

export default function ProjectDetailClient() {
  // 현재 브라우저 URL에서 slug 파싱
  const slug = useMemo(() => {
    if (typeof window === "undefined") return "";
    // 예: /projects/my-post → ["", "projects", "my-post"]
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || "";
  }, []);

  const [data, setData] = useState<FullProject | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "notfound" | "done">("idle");

  useEffect(() => {
    if (!slug) return;
    let mounted = true;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(`/api/project/${encodeURIComponent(slug)}`, {
          next: { revalidate: 30 },
        });
        if (res.status === 404) {
          if (mounted) setStatus("notfound");
          return;
        }
        if (!res.ok) {
          if (mounted) setStatus("error");
          return;
        }
        const json = (await res.json()) as FullProject;
        if (mounted) {
          setData(json);
          setStatus("done");
        }
      } catch {
        if (mounted) setStatus("error");
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="animate-pulse text-ink/70 dark:text-white/70">불러오는 중…</div>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">프로젝트를 찾을 수 없어요.</h1>
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold">문제가 발생했어요. 잠시 후 다시 시도해줘.</h1>
      </div>
    );
  }

  // 커버 이미지
  let coverUrl: string | null = null;
  if (data.titleImage) {
    try {
      coverUrl = urlFor(data.titleImage).width(1600).height(1000).auto("format").url();
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