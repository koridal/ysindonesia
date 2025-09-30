"use client";

import ElectricMain from "./ElectricMain";

export default function Electric() {
  return (
    <main className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 md:pt-20 pb-16 space-y-8">
      {/* Hero: 컨셉 통일(블루 그라데 제거 → 브랜드 중성 글래스) */}
      <section className="relative overflow-hidden rounded-2xl">
        {/* 은은한 라디얼 라이트 + 다크닝 */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 60%), radial-gradient(50% 50% at 20% 100%, rgba(236,72,153,0.16) 0%, rgba(236,72,153,0) 60%), rgba(0,0,0,0.28)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
        <div
          className="
            mx-auto flex h-20 sm:h-24 items-center justify-center
            rounded-2xl border border-white/12
            bg-white/12 backdrop-blur-md
            px-4 shadow-[0_8px_28px_rgba(0,0,0,0.10)]
          "
        >
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white text-center">
            POWER PANEL & CABLE
          </h1>
        </div>
      </section>

      <ElectricMain />
    </main>
  );
}