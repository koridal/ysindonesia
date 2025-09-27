// components/home/AboutPreview.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function PreviewSlider({
  images = [],
  intervalMs = 5000,
  fadeMs = 800,
  aspectClass = "aspect-[16/10]",
}: {
  images?: string[];
  intervalMs?: number;
  fadeMs?: number;
  aspectClass?: string;
}) {
  const safeImages = useMemo(() => {
    const arr = (images || []).filter(Boolean);
    return Array.from(new Set(arr));
  }, [images]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length);
    }, intervalMs);
    timerRef.current = id;
    return () => window.clearInterval(id);
  }, [safeImages.length, intervalMs, paused]);

  if (safeImages.length === 0) return null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
        aspectClass
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {safeImages.map((src, i) => {
        const isActive = i === index;
        return (
          <div
            key={src + i}
            className="absolute inset-0 will-change-opacity"
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${fadeMs}ms ease`,
            }}
          >
            <Image
              src={src}
              alt="Factory preview"
              fill
              sizes="(min-width: 1024px) 640px, (min-width: 768px) 50vw, 92vw"
              className="object-cover"
              priority={i === 0}
            />
            {/* 아주 연한 라임 캐스트 */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply dark:mix-blend-soft-light"
              style={{
                background:
                  "linear-gradient(180deg, rgba(127,195,15,0.12) 0%, rgba(159,220,47,0.10) 40%, rgba(127,195,15,0.10) 100%)",
                filter: "saturate(0.97) hue-rotate(-4deg)",
              }}
            />
            {/* 비네트(조금 더 약하게) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 64%, rgba(0,0,0,0.16) 100%)",
              }}
            />
          </div>
        );
      })}

      {/* 인디케이터(농도 낮춤) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {safeImages.map((_, i) => {
          const active = i === index;
          return (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                active
                  ? "bg-black/60 dark:bg-white/80 w-3"
                  : "bg-black/30 dark:bg-white/40 w-1.5"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

type AboutPreviewProps = {
  className?: string;
  images?: string[];
  intervalMs?: number;
  fadeMs?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function AboutPreview({
  className,
  images = [],
  intervalMs = 5000,
  fadeMs = 800,
  title = "Engineering excellence that scales",
  subtitle = "Built on trust. Proven since 1988.",
  description = "We design, build, and deliver turnkey industrial solutions across mechanical, electrical, and fire protection. From concept and engineering to equipment sourcing, installation, and commissioning, our integrated teams bring discipline, speed, and reliability to every phase. We partner with manufacturers to reduce risk, accelerate timelines, and future-proof critical infrastructure—so plants run safer, smarter, and at scale.",
  ctaLabel = "Learn more",
  ctaHref = "/about",
}: AboutPreviewProps) {
  const defaultImages = [
    "/images/about/blueprint.jpeg",
    "/images/about/smart-factory.png",
    "/images/about/assembly-line.webp",
  ];
  const finalImages = images.length ? images : defaultImages;

  return (
    <section
      className={cn("relative w-full", className)}
      aria-label="About preview section"
    >
      {/* 아주 연한 라임 배경 */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* 라이트: 거의 화이트, 라임 텐트 아주 살짝 / 다크: 살짝 잉크 톤 */}
        <div className="h-full w-full bg-[oklch(0.98_0.02_120)] dark:bg-[oklch(0.17_0.03_120)]" />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(120% 100% at 20% 0%, rgba(159,220,47,0.10) 0%, rgba(127,195,15,0.08) 28%, rgba(0,0,0,0) 60%), radial-gradient(100% 80% at 100% 0%, rgba(0,194,168,0.08) 0%, rgba(0,0,0,0) 55%)",
            filter: "saturate(0.96)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 md:py-18">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 좌측: 영문 마케팅 카피 */}
          <div>
            <p className="text-sm font-medium text-ink/70 dark:text-white/70">
              {subtitle}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-ink dark:text-white">
              {title}
            </h2>
            <p className="mt-4 text-ink/80 dark:text-white/80 leading-relaxed">
              {description}
            </p>

            <div className="mt-6">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-lg bg-[#73B60E] hover:bg-[#6CB10E] text-white px-4 py-2 text-sm font-semibold transition-colors shadow"
              >
                {ctaLabel}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="opacity-95"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* 우측: 3장 슬라이더(비율 16:10) */}
          <div className="relative w-full max-w-[640px] md:justify-self-end">
            <PreviewSlider
              images={finalImages}
              intervalMs={intervalMs}
              fadeMs={fadeMs}
              aspectClass="aspect-[16/10]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
