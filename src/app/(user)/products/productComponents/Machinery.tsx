"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type SectionItem = {
  title: string;
  text: React.ReactNode;
  imgSrc: string;
  imgAlt: string;
  reverse?: boolean;
};

function MachinerySection({
  title,
  text,
  imgSrc,
  imgAlt,
  reverse = false,
}: SectionItem) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const textEl = textRef.current;
    const imgEl = imgRef.current;

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
    });
    tl.fromTo(textEl, { opacity: 0, y: 24 }, { opacity: 1, y: 0 }).fromTo(
      imgEl,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0 },
      "-=0.45"
    );

    return () => {
      tl.kill();
      gsap.killTweensOf([textEl, imgEl]);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10">
      <div
        className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
          reverse
            ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
            : ""
        }`}
      >
        {/* 텍스트 카드 */}
        <div ref={textRef}>
          <div className="rounded-2xl border border-white/12 bg-white/55 dark:bg-white/5 backdrop-blur-sm p-5 lg:p-6">
            <p className="text-justify font-light leading-[1.65] tracking-tight text-ink/90 dark:text-white/85 text-[14.5px] md:text-[15px]">
              <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-lg md:text-xl font-semibold text-transparent">
                {title}
              </span>
              <br />
              <br />
              {text}
            </p>
          </div>
        </div>

        {/* 이미지 카드: 프로젝트에서 써온 최대폭 규칙 반영(420→480→520) */}
        <div ref={imgRef} className="flex justify-center">
          <div
            className="
              relative w-full
              max-w-[420px] sm:max-w-[460px] md:max-w-[480px] lg:max-w-[520px]
              rounded-2xl overflow-hidden
              "
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 420px, (max-width: 768px) 460px, (max-width: 1024px) 480px, 520px"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/12" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Machinery() {
  const sections: SectionItem[] = [
    {
      title: "Conveyor",
      text: (
        <>
          Conveyor systems can be built to various specs: spray booth, dry, and
          cargo conveyors to match factory needs.
          <br />
          <br />
          For labor reduction and efficiency, PT. YUNSUNG delivers convenient,
          robust conveyor systems.
        </>
      ),
      imgSrc: "/images/machinery/conveyor-3.jpeg",
      imgAlt: "conveyor",
    },
    {
      title: "Cargo Lift",
      text: (
        <>
          Fast and safe transportation of goods across weight ranges for
          containers, warehouses, and machine handling.
          <br />
          <br />
          Helps reduce manpower and labor costs while improving logistics flow.
        </>
      ),
      imgSrc: "/images/machinery/Cargo-lift-2.jpg",
      imgAlt: "cargo lift",
      reverse: true,
    },
    {
      title: "Press",
      text: (
        <>
          Hydraulic sublimation presses used across industries such as printing
          and garment manufacturing.
        </>
      ),
      imgSrc: "/images/machinery/press.jpeg",
      imgAlt: "press",
    },
    {
      title: "Rack System",
      text: (
        <>
          Rack systems commonly used for loading and organizing electronics with
          space-efficient layout.
          <br />
          <br />
          PT. YUNSUNG provides reliable, scalable rack solutions.
        </>
      ),
      imgSrc: "/images/machinery/rack-1.jpg",
      imgAlt: "rack system",
      reverse: true,
    },
    {
      title: "Scrubber",
      text: (
        <>
          Scrubbers absorb and separate contaminants like dust, powder, and
          odors to improve indoor environments.
          <br />
          <br />
          Applied across production, electronics, plywood, clothing, and general
          manufacturing.
        </>
      ),
      imgSrc: "/images/machinery/scrubber-1.jpg",
      imgAlt: "scrubber",
    },
    {
      title: "Mixer Machine",
      text: (
        <>
          Mixers precisely blend raw and extruded materials for injection
          processes and are custom-built to requirements.
        </>
      ),
      imgSrc: "/images/machinery/mixer-2.png",
      imgAlt: "mixer machine",
      reverse: true,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 md:pt-20 pb-16 space-y-8">
      {/* Hero: 중성 글래스(프로젝트 톤 유지) */}
      <section className="relative overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0) 60%), radial-gradient(50% 50% at 20% 100%, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0) 60%), rgba(0,0,0,0.24)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
        <div className="mx-auto flex h-20 sm:h-24 items-center justify-center rounded-2xl border border-white/12 bg-white/12 backdrop-blur-md px-4 shadow-[0_8px_28px_rgba(0,0,0,0.10)]">
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white text-center">
            Machinery
          </h1>
        </div>
      </section>

      {/* 섹션 리스트 */}
      {sections.map((s, i) => (
        <MachinerySection key={`${s.title}-${i}`} {...s} />
      ))}

      <section className="mx-auto w-full max-w-7xl">
        {/* 헤더(필요 없으면 삭제) */}
        <div className="flex items-end justify-between">
          <h3 className="text-base md:text-lg font-bold tracking-tight text-ink dark:text-white">
            Gallery
          </h3>
          <span className="text-[12px] md:text-[13px] text-ink/60 dark:text-white/60">
            3 per row
          </span>
        </div>

        {/* 1줄에 3개: 모바일 1, 태블릿 2, 데스크톱 3 */}
        <ul
          className="
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      gap-4 md:gap-5 mt-3
    "
          role="list"
          aria-label="3-column gallery"
        >
          {[
            {
              src: "/images/machinery/conveyor-3.jpeg",
              alt: "Conveyor",
              title: "Conveyor",
              desc: "Spray/Dry/Cargo conveyor for diverse factory needs",
            },
            {
              src: "/images/machinery/Cargo-lift-2.jpg",
              alt: "Cargo lift",
              title: "Cargo Lift",
              desc: "Fast and safe logistics, from light to heavy goods",
            },
            {
              src: "/images/machinery/press.jpeg",
              alt: "Press",
              title: "Press",
              desc: "Hydraulic sublimation presses for multiple industries",
            },
            // 필요 시 더 추가하면 자동으로 다음 줄로 내려가며 3개씩 정렬
          ].map((g) => (
            <li
              key={g.src}
              className="
          group relative overflow-hidden
          rounded-2xl border border-white/12
          bg-white/55 dark:bg-white/5 backdrop-blur-sm
          hover:-translate-y-0.5 hover:shadow-2xl transition-all
        "
            >
              {/* 이미지: 4:3 비율 고정 + fill */}
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>

              {/* 텍스트: 이미지 바로 아래 */}
              <div className="px-3.5 py-2.5">
                <p className="text-[12.5px] md:text-[13px] font-semibold text-ink dark:text-white">
                  {g.title}
                </p>
                <p className="mt-0.5 text-[11.5px] text-ink/70 dark:text-white/70">
                  {g.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
