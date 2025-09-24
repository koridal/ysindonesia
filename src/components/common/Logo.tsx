// components/common/Logo.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  asLink?: boolean;
  withText?: boolean;
  size?: number; // px
  className?: string;
  textClassName?: string;
};

export default function Logo({
  asLink = false,
  withText = false,
  size = 36,
  className,
  textClassName,
}: LogoProps) {
  const Mark = (
    <div
      className={cn(
        "flex items-center gap-2",
        className
      )}
      aria-label="Yunsung Indonesia logo"
    >
      {/* 글래스 링 + YI 마크 (대체 로고) */}
      <div
        className="relative rounded-full border border-white/30 dark:border-white/15 bg-white/15 dark:bg-black/25 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className="absolute inset-0"
        >
          {/* 외곽 그라디언트 링 */}
          <defs>
            <radialGradient id="limeGlow" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#C8F560" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00C2A8" stopOpacity="0.2" />
            </radialGradient>
            <linearGradient id="inkStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* 글로우 배경 */}
          <circle cx="32" cy="32" r="30" fill="url(#limeGlow)" opacity="0.35" />
          {/* 유리 느낌 속 원 */}
          <circle cx="32" cy="32" r="22" fill="white" opacity="0.06" />
          {/* 윤곽선 */}
          <circle
            cx="32"
            cy="32"
            r="29"
            fill="none"
            stroke="url(#inkStroke)"
            strokeOpacity="0.35"
          />

          {/* YI 심볼: 기계/전기/소방의 선형 조합 + 이니셜 */}
          {/* Y */}
          <path
            d="M20 18 L28 28 M36 18 L28 28 L28 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          {/* I */}
          <path
            d="M40 20 L40 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* 하이라이트 포인트 (테크 감성) */}
          <circle cx="28" cy="28" r="3" fill="#00E5FF" opacity="0.9" />
          <circle cx="40" cy="24" r="2" fill="#C8F560" opacity="0.85" />
        </svg>
      </div>

      {withText && (
        <div className={cn("leading-tight", textClassName)}>
          <span className="block text-sm font-semibold text-ink dark:text-white">
            Yunsung Indonesia
          </span>
          <span className="block text-[10px] text-ink/70 dark:text-white/70">
            Since 1988
          </span>
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="text-ink dark:text-white">
        {Mark}
      </Link>
    );
  }
  return <div className="text-ink dark:text-white">{Mark}</div>;
}