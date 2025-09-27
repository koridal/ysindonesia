// app/projects/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import type { MyImageSource } from "@/lib/sanity.image";

export const revalidate = 30;

type PortableImageBlock = {
  _type: "image";
  asset?: { _ref?: string; url?: string; _type?: string };
  alt?: string;
};

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
        typeof v.alt === "string" && v.alt.trim().length > 0 ? v.alt : "본문 이미지";

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

// ✅ 동기 Page 컴포넌트
interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <Content slug={params.slug} />;
}

// ✅ async 로직은 별도 컴포넌트에서 처리
async function Content({ slug }: { slug: string }) {
  const data = await client.fetch<FullProject>(QUERY, { slug });
  if (!data) return notFound();

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
