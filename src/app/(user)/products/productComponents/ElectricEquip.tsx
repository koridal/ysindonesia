"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ElectricEquipment() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        ".equip-hero-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.05 }
      );
      gsap.fromTo(
        ".equip-hero-sub",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.12 }
      );

      // 섹션 타이틀/텍스트
      gsap.utils.toArray<HTMLElement>(".equip-section").forEach((sec, i) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
            },
            delay: i * 0.05,
          }
        );
      });

      // 이미지 카드
      gsap.utils.toArray<HTMLElement>(".equip-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            delay: (i % 3) * 0.1,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 이미지 목록(필요 시 추가/교체)
  const IMAGES = [
    { src: "/images/electric-equip/elec-eq-1.jpg", alt: "Electrical testing bench", caption: "Testing & measurement setup" },
    { src: "/images/electric-equip/elec-eq-2.jpg", alt: "Switchgear inspection", caption: "Switchgear inspection and QA" },
    { src: "/images/electric-equip/elec-eq-3.jpg", alt: "Workstation tools", caption: "Workstation tools and torque control" },
  ];

  // 스펙(본문) 텍스트
  const SPEC_LINES = [
    "Ampere Meter 5/25A",
    "Ampere Meter 1/30A",
    "Voltage Meter 300/750V",
    "Voltage Meter 30/1000V",
    "Power Factor Meter 5/25A 120/240V 3φ",
    "Wattmeter 5/25A 120/240V 3φ",
    "Torque Wrench 900 kgf·cm",
  ];

  return (
    <main
      ref={containerRef}
      className="
        mx-auto max-w-7xl
        px-6 sm:px-8 lg:px-12
        pt-20 md:pt-28 pb-20
        space-y-12
      "
    >
      {/* Hero */}
      <section
        className="
          relative overflow-hidden rounded-2xl
          border border-white/10 bg-gradient-to-b from-primary/10 via-transparent to-transparent
          backdrop-blur-sm p-8 md:p-12
        "
      >
        <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <h1 className="equip-hero-title text-3xl md:text-5xl font-extrabold tracking-tight">
          Electric Equipment
        </h1>
        <p className="equip-hero-sub mt-3 max-w-2xl text-ink/80 dark:text-white/80">
          For smoother work and reliable quality, we deploy modern testing and construction equipment aligned with site standards.
        </p>
      </section>

      {/* 소개 + 스펙 */}
      <section className="equip-section grid lg:grid-cols-2 gap-8 items-start">
        {/* 설명 카드 */}
        <div
          className="
            rounded-2xl border border-white/10
            bg-white/60 dark:bg-white/5 backdrop-blur-sm
            p-6
          "
        >
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Overview</h2>
          <p className="mt-3 text-sm md:text-[15px] text-ink/80 dark:text-white/80 max-w-prose">
            Our electrical equipment supports precise measurement, safe commissioning,
            and consistent documentation—covering voltage, current, power factor, and torque control.
          </p>
        </div>

        {/* 스펙 카드 */}
        <div
          className="
            rounded-2xl border border-white/10
            bg-white/60 dark:bg-white/5 backdrop-blur-sm
            p-6
          "
        >
          <h3 className="text-lg md:text-xl font-bold tracking-tight">Testing & Tools</h3>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-[15px] text-ink/80 dark:text-white/80">
            {SPEC_LINES.map((line) => (
              <li
                key={line}
                className="
                  rounded-lg border border-white/10
                  bg-white/50 dark:bg-white/5 backdrop-blur-sm
                  px-3 py-2
                "
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 이미지 갤러리(4:3 카드) */}
      <section className="equip-section">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">Gallery</h3>
          <p className="mt-1 text-sm md:text-[15px] text-ink/80 dark:text-white/80 max-w-prose">
            Consistent 4:3 image ratio with glass cards. Add more items by extending the IMAGES array.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((g) => (
            <div
              key={g.src}
              className="
                equip-card relative overflow-hidden
                rounded-2xl border border-white/10
                bg-white/60 dark:bg-white/5 backdrop-blur-sm
                hover:-translate-y-0.5 hover:shadow-2xl transition-all
              "
            >
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="px-4 py-3">
                <h4 className="font-semibold">{g.alt}</h4>
                {g.caption && (
                  <p className="mt-1 text-xs text-ink/70 dark:text-white/70">{g.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          relative overflow-hidden rounded-2xl
          border border-white/10 bg-gradient-to-r from-primary/15 via-transparent to-fuchsia-400/10
          backdrop-blur-sm p-8 md:p-10
        "
      >
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">Need a detail list or proposal?</h3>
        <p className="mt-2 text-ink/80 dark:text-white/80">
          Tell us your site voltage class, panel specs, and testing scope. We’ll respond with a tailored checklist.
        </p>
        <div className="mt-5">
          <a
            href="/contact"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white shadow hover:shadow-lg transition-all"
          >
            Contact us
          </a>
        </div>
      </section>
    </main>
  );
}