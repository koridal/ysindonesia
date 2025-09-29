"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import visionImg from "../../../public/images/about/visionImg.jpg";
import { DIVERSITY, INTEGRITY, MULTI_PROCESS } from "@/lib";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(".vision-title", { opacity: 1, y: 0, duration: 0.7 }, 0);
      tl.to(".vision-block", { opacity: 1, y: 0, duration: 0.7, stagger: 0.2 }, 0.1);
      tl.to(".vision-card", { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 0.1);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        mx-auto max-w-7xl
        px-6 sm:px-8 lg:px-12
        pt-12 md:pt-20 pb-16
      "
    >
      {/* Header line + title (unified with Greeting) */}
      <header className="mb-6 md:mb-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <h1
          className="
            vision-title opacity-0 translate-y-6
            mt-4 md:mt-6
            text-left text-2xl lg:text-3xl
            font-extrabold tracking-tight
          "
        >
          Our Vision
        </h1>
      </header>

      {/* Content: left texts / right image */}
      <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-14">
        {/* Left: text blocks */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-8">
            <div className="vision-block opacity-0 translate-y-6 px-1 sm:px-0">
              <span className="text-[0.85rem] font-semibold tracking-widest text-primary uppercase">
                Diversity
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight">
                Embracing Multi‑Perspective Diversity
              </h3>
              <p className="mt-3 max-w-prose text-sm md:text-base leading-relaxed text-ink/80 dark:text-white/80">
                {DIVERSITY}
              </p>
            </div>

            <div className="vision-block opacity-0 translate-y-6 px-1 sm:px-0">
              <span className="text-[0.85rem] font-semibold tracking-widest text-primary uppercase">
                Integrity
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight">
                Building With Trust & Accountability
              </h3>
              <p className="mt-3 max-w-prose text-sm md:text-base leading-relaxed text-ink/80 dark:text-white/80">
                {INTEGRITY}
              </p>
            </div>

            <div className="vision-block opacity-0 translate-y-6 px-1 sm:px-0">
              <span className="text-[0.85rem] font-semibold tracking-widest text-primary uppercase">
                Multi Process
              </span>
              <h3 className="mt-1 text-xl font-bold tracking-tight">
                Orchestrating End‑to‑End Excellence
              </h3>
              <p className="mt-3 max-w-prose text-sm md:text-base leading-relaxed text-ink/80 dark:text-white/80">
                {MULTI_PROCESS}
              </p>
            </div>
          </div>
        </div>

        {/* Right: image glass card */}
        <div className="w-full lg:w-1/2">
          <div
            className="
              vision-card opacity-0 scale-95
              relative rounded-2xl overflow-hidden
              border border-white/10 bg-white/5 backdrop-blur-sm
              p-2
            "
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={visionImg}
              alt="Vision"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <p className="mt-3 text-xs text-ink/60 dark:text-white/50">
            Engineering • Electrical • Fire Protection • Turnkey
          </p>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}