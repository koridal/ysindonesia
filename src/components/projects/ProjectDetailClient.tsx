// src/components/project/ProjectDetailClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  return useMemo(() => {
    if (typeof window === "undefined") return "";
    const pathname = window.location.pathname;
    // basePath가 선행하도록 강제
    if (!pathname.startsWith(basePath)) {
      console.warn("[Client] Unexpected path:", pathname, "expected basePath:", basePath);
    }
    const parts = pathname.split("/").filter(Boolean);
    // 마지막 세그먼트를 slug로 간주
    const last = parts[parts.length - 1] || "";
    return last;
  }, [basePath]);
}

export default function ProjectDetailClient({ basePath = "/projects" }: { basePath?: string }) {
  const slug = useSlugFromPathname(basePath);
  const [data, setData] = useState<FullProject | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "notfound" | "done">("idle");
  const retriedEmptySlug = useRef(false);

  useEffect(() => {
    // slug가 비면 한 번만 300ms 후 재평가(라우터 전환 직후 대비)
    if (!slug) {
      if (!retriedEmptySlug.current) {
        retriedEmptySlug.current = true;
        console.warn("[Client] slug empty. pathname:", typeof window !== "undefined" ? window.location.pathname : "(ssr)");
        const t = setTimeout(() => {
          // 상태 변화 트리거: idle 유지 → 재렌더 유도는 basePath/경로 변동 때 일어남
          // 필요 시 여기서 강제 setStatus 호출 가능
        }, 300);
        return () => clearTimeout(t);
      }
      return;
    }

    let mounted = true;
    const ac = new AbortController();

    async function load() {
      setStatus("loading");
      try {
        console.log("[Client] fetching slug:", slug);

        // fetch 타임아웃(15s)으로 무한 대기 방지
        const timeout = setTimeout(() => ac.abort(), 15000);

        const res = await fetch(`/api/project/${encodeURIComponent(slug)}`, {
          next: { revalidate: 30 },
          signal: ac.signal,
        });

        clearTimeout(timeout);

        if (res.status === 404) {
          console.warn("[Client] 404 for slug:", slug);
          if (mounted) setStatus("notfound");
          return;
        }
        if (!res.ok) {
          console.warn("[Client] !ok:", res.status, res.statusText);
          if (mounted) setStatus("error");
          return;
        }

        const json = (await res.json()) as FullProject;
        if (mounted) {
          setData(json);
          setStatus("done");
          console.log("[Client] matched Sanity slug:", json.currentSlug ?? "(none)");
        }
      } catch (err) {
        if (ac.signal.aborted) {
          console.warn("[Client] fetch aborted (timeout or route change)");
        } else {
          console.error("[Client] fetch error:", err);
        }
        if (mounted) setStatus("error");
      }
    }

    load();
    return () => {
      mounted = false;
      ac.abort();
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
        <p className="mt-2 text-ink/70 dark:text-white/70">
          주소의 마지막 경로와 Sanity의 slug.current가 정확히 같은지 확인해줘.
        </p>
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

  // 커버 이미지 URL
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
        <p className="text-sm font-semibold text-primary tracking-wide uppercase">Yunsung Indonesia</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-white">{data.title}</h1>
      </header>

      {coverUrl && (
        <div className="relative mt-8 w-full" style={{ aspectRatio: "16/10" }}>
          <Image src={coverUrl} alt={coverAlt} fill className="object-cover rounded-lg border" priority />
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