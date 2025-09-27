"use client";

import { fullProject } from "@/app/lib/interface";
import { urlFor } from "@/app/lib/sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProjectCon({ data }: { data: fullProject }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Sanity PortableText 커스텀 컴포넌트
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        return (
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "본문 이미지"}
            width={800}
            height={600}
            className="rounded-lg border mx-auto my-8"
          />
        );
      },
    },
  };

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 제목 애니메이션
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // 이미지 애니메이션
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.4"
      );

      // 본문 애니메이션
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.3"
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="mt-8 max-w-4xl mx-auto">
      <h1 ref={titleRef} className="opacity-0 translate-y-[-30px]">
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Inko Jaya Konstruksi
        </span>
        <span className="mt-4 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        ref={imageRef}
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border mx-auto opacity-0 scale-90 will-change-transform will-change-opacity"
      />

      <div
        ref={bodyRef}
        className="max-w-4xl mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary mx-auto border border-gray-400 rounded-md p-6 opacity-0 translate-y-[30px] will-change-transform will-change-opacity"
      >
        <PortableText value={data.body} components={components} />
      </div>
    </div>
  );
}
