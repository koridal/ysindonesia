"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ElectricMain() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    const textEl = textRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.set(el, { autoAlpha: 0 });
    gsap.set([textEl], { opacity: 0, y: reduceMotion ? 0 : 18 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: reduceMotion ? 0 : 0.5 },
    });
    tl.to(el, {
      autoAlpha: 1,
      duration: reduceMotion ? 0 : 0.28,
      ease: "power1.out",
    }).to(textEl, { opacity: 1, y: 0 });

    return () => {
      tl.kill();
      gsap.killTweensOf(el);
      gsap.killTweensOf([textEl]);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-12 md:pt-16 pb-12 space-y-8"
    >
      {/* 섹션 헤딩(콤팩트) */}
      <header className="w-full">
        <h2 className="text-base md:text-lg font-bold tracking-tight text-ink dark:text-white">
          Electric Panels & Control
        </h2>
        <p className="mt-1 text-[12.5px] md:text-[13px] text-ink/80 dark:text-white/80">
          IEC/ANSI-compliant power and PLC control.
        </p>
      </header>

      {/* 요약 텍스트 박스 (정렬 기준) */}
      <div
        ref={textRef}
        className="
          w-full max-w-[720px] mx-auto
          p-4 lg:px-6
          rounded-2xl border border-white/12
          bg-white/50 dark:bg-white/5 backdrop-blur-sm
        "
      >
        <p className="text-justify font-light leading-[1.6] tracking-tight text-ink/90 dark:text-white/85 text-[13.5px] md:text-[14px]">
          <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-[17px] md:text-[19px] font-semibold text-transparent">
            Power Panel & PLC Control
          </span>
          <br />
          Built to IEC/ANSI standards. Compact switchgear (VCB/ACB/MCCB) for
          substations, plants, and buildings. Stable distribution and precise
          control tailored to your specs.
        </p>
      </div>

      {/* 한 줄 가로 스크롤 갤러리(이미지 카드: 4:3, 동일 폭, 전체 정렬 통일) */}
      <section className="space-y-3">
        <div className="flex items-end justify-between max-w-[1200px] mx-auto w-full">
          <h3 className="text-base md:text-lg font-bold tracking-tight text-ink dark:text-white">
            Panels Gallery
          </h3>
          <span className="text-[12px] md:text-[13px] text-ink/60 dark:text-white/60">
            Swipe horizontally
          </span>
        </div>

        {/* 양끝 정렬: 스크롤 대신 컨테이너 폭 내 배치를 우선 */}
        <div className="w-full max-w-[1200px] mx-auto">
          <ul
            className="
        flex items-stretch justify-between gap-4 md:gap-6
      "
            role="list"
            aria-label="Electric panels images"
          >
            {[
              // 3장 기준. 4장 이상이면 반응형 분기 고려
              {
                src: "/images/electric/panel-1.jpeg",
                alt: "Power panel overview",
                cap: "Compact switchgear layout",
              },
              {
                src: "/images/electric/panel-2.jpeg",
                alt: "Switchgear lineup",
                cap: "VCB / ACB / MCCB configuration",
              },
              {
                src: "/images/electric/control-panel-2.png",
                alt: "PLC control panel",
                cap: "IO distribution and wiring",
              },
            ].map((g) => (
              <li
                key={g.src}
                className="
            group relative overflow-hidden
            rounded-2xl border border-white/12
            bg-white/55 dark:bg-white/5 backdrop-blur-sm
            hover:-translate-y-0.5 hover:shadow-2xl transition-all
            w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px]
            flex-shrink-0
          "
              >
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 33vw, 320px"
                  />
                </div>
                <div className="px-3.5 py-2.5">
                  <p className="text-[12.5px] md:text-[13px] font-semibold text-ink dark:text-white">
                    {g.alt}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-ink/70 dark:text-white/70">
                    {g.cap}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
