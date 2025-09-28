// app/(user)/projects/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import type { MyImageSource } from "@/lib/sanity.image";

export const revalidate = 30;

// 이미지 블록 타입
type PortableImageBlock = {
  _type: "image";
  asset?: { _ref?: string; url?: string; _type?: string };
  alt?: string;
};

// 페이지 데이터 타입
type FullProject = {
  title: string;
  titleImage?: MyImageSource | null;
  body?: PortableTextBlock[] | null;
};

const QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    titleImage,
    body
  }
`;

// PortableText 이미지 렌더
const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const v = value as PortableImageBlock;

      let src: string | null = null;
      try {
        src = urlFor(v).width(1200).height(800).auto("format").url();
      } catch {
        src = null;
      }
      if (!src) return null;

      const alt =
        typeof v.alt === "string" && v.alt.trim().length > 0
          ? v.alt
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

// 타입 추론/빌드 안정화: 정적 파라미터 생성
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await client.fetch<string[]>(
    `*[_type == "post" && defined(slug.current)].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

// any 금지 우회: params를 unknown으로 받고 안전하게 좁힘
type ParamsUnknown = unknown;
function ensureSlug(params: ParamsUnknown): string {
  // params가 객체이고 slug가 존재할 때만 꺼내기
  if (
    params &&
    typeof params === "object" &&
    "slug" in (params as Record<string, unknown>)
  ) {
    const s = (params as Record<string, unknown>).slug;
    if (typeof s === "string") return s;
    if (s != null) return String(s);
  }
  return "";
}

// 페이지 함수(외부 PageProps/제네릭 일절 금지)
export default async function Page({ params }: { params: ParamsUnknown }) {
  const slug = ensureSlug(params);
  if (!slug) return notFound();

  const data = await client.fetch<FullProject>(QUERY, { slug });
  if (!data) return notFound();

  // 커버 이미지 URL 생성
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
