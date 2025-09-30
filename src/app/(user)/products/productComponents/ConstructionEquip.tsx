"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConstructionEquip() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 초기 깜빡임 방지
    gsap.set(containerRef.current, { autoAlpha: 0 });

    const ctx = gsap.context(() => {
      // 전체 컨테이너 페이드인
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power1.out",
      });

      // Hero 타이틀/서브
      gsap.fromTo(
        ".ce-hero-title",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.05 }
      );
      gsap.fromTo(
        ".ce-hero-sub",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.12 }
      );

      // 섹션 카드
      gsap.utils.toArray<HTMLElement>(".ce-section").forEach((sec, i) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: sec, start: "top 82%" },
            delay: i * 0.05,
          }
        );
      });

      // 갤러리 카드
      gsap.utils.toArray<HTMLElement>(".ce-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 86%" },
            delay: (i % 3) * 0.1,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 소개/스펙
  const SPEC_LINES = [
    "Excavator KOBELCO SK200",
    "Electrical Scissor Lift",
    "Manual Scissor Lift",
    "Baby Roller Machine",
    "Stamping Machine",
    "Dump Truck",
    "Fuso Truck",
    "Forklift",
    "Molen (Concrete Mixer)",
    "Concrete Cutting Machine",
  ];

  // 갤러리 이미지(4:3 카드)
  const GALLERY = [
    {
      src: "/images/construction-equip/con-eq-1.jpg",
      alt: "Excavator on site",
      caption: "Excavation and grading works",
    },
    {
      src: "/images/construction-equip/con-eq-2.jpg",
      alt: "Scissor lift",
      caption: "Electrical/Manual scissor lifts for height access",
    },
    {
      src: "/images/construction-equip/con-eq-3.jpg",
      alt: "Baby roller compaction",
      caption: "Compaction for subgrade and asphalt layers",
    },
    {
      src: "/images/construction-equip/con-eq-4.jpg",
      alt: "Concrete mixer and cutting",
      caption: "On-site concrete mixing and cutting",
    },
    {
      src: "/images/construction-equip/con-eq-5.jpg",
      alt: "Logistics trucks and forklift",
      caption: "Dump/Fuso trucks and forklift logistics",
    },
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
        <h1 className="ce-hero-title text-3xl md:text-5xl font-extrabold tracking-tight">
          Construction Equipment
        </h1>
        <p className="ce-hero-sub mt-3 max-w-2xl text-ink/80 dark:text-white/80">
          For smoother work and reliable quality, we deploy modern construction equipment aligned with site standards.
        </p>
      </section>

      {/* Overview + Spec */}
      <section className="ce-section grid lg:grid-cols-2 gap-8 items-start">
        {/* Overview */}
        <div
          className="
            rounded-2xl border border-white/10
            bg-white/60 dark:bg-white/5 backdrop-blur-sm
            p-6
          "
        >
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Overview</h2>
          <p className="mt-3 text-sm md:text-[15px] text-ink/80 dark:text-white/80 max-w-prose">
            Our fleet covers excavation, lifting, compaction, logistics, and concrete works—ensuring
            schedule reliability and on-site safety.
          </p>
        </div>

        {/* Spec List */}
        <div
          className="
            rounded-2xl border border-white/10
            bg-white/60 dark:bg-white/5 backdrop-blur-sm
            p-6
          "
        >
          <h3 className="text-lg md:text-xl font-bold tracking-tight">Key Equipment</h3>
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

      {/* Gallery */}
      <section className="ce-section">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">Gallery</h3>
          <p className="mt-1 text-sm md:text-[15px] text-ink/80 dark:text-white/80 max-w-prose">
            Consistent 4:3 image ratio with glass cards for visual harmony across devices.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY.map((g) => (
            <div
              key={g.src}
              className="
                ce-card relative overflow-hidden
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
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">Need a site-ready equipment plan?</h3>
        <p className="mt-2 text-ink/80 dark:text-white/80">
          Share your scope and timeline—we’ll prepare a tailored equipment list and logistics plan.
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