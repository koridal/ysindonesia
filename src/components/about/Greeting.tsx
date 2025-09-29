"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import greetingImg from "../../../public/images/about/city.jpeg";
import Image from "next/image";
import { INDUSTRY, KNOW_HOW, LEADING_COMPANY, TRUST } from "@/lib";

gsap.registerPlugin(ScrollTrigger);

const Greeting = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        defaults: { ease: "power3.out" },
      });
      tl.to(".greet-title", { opacity: 1, y: 0, duration: 0.7 }, 0);
      tl.to(".greet-text", { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 0.1);
      tl.to(".greet-img", { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }, 0.1);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16"
    >
      {/* Header line */}
      <div className="mb-6 md:mb-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <h1
          className="
            greet-title opacity-0 translate-y-6
            mt-4 md:mt-6
            text-left text-2xl md:text-3xl font-extrabold tracking-tight
            bg-gradient-to-r from-black via-black to-black/80 dark:from-white dark:via-white dark:to-white/70
            bg-clip-text text-transparent
          "
        >
          Greeting
        </h1>
        <p className="mt-2 text-sm md:text-base text-ink/70 dark:text-white/70">
          Our values and direction.
        </p>
      </div>

      {/* Glass box */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

        <div className="flex flex-wrap items-start gap-y-8">
          {/* Left texts */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="greet-text opacity-0 translate-y-6">
                <span className="text-[0.85rem] font-semibold tracking-widest text-primary uppercase">
                  Accumulated Know-how
                </span>
                <h3 className="mt-1 text-xl font-bold tracking-tight">Expertise</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-white/70">
                  {KNOW_HOW}
                </p>
              </div>

              <div className="greet-text opacity-0 translate-y-6">
                <span className="text-[0.85rem] font-semibold tracking-widest text-primary uppercase">
                  Industry 4.0
                </span>
                <h3 className="mt-1 text-xl font-bold tracking-tight">Innovation</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-white/70">
                  {INDUSTRY}
                </p>
              </div>

              <div className="greet-text opacity-0 translate-y-6">
                <span className="text-[0.85rem] font-semibold tracking-widest text-primary uppercase">
                  Trust
                </span>
                <h3 className="mt-1 text-xl font-bold tracking-tight">Reliability</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-white/70">
                  {TRUST}
                </p>
              </div>

              <div className="greet-text opacity-0 translate-y-6">
                <span className="text-[0.85rem] font-semibold tracking-widest text-primary uppercase">
                  Leading Company
                </span>
                <h3 className="mt-1 text-xl font-bold tracking-tight">Leadership</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-white/70">
                  {LEADING_COMPANY}
                </p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full lg:w-1/3 pl-5">
            <div className="greet-img opacity-0 translate-x-10">
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-sm" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={greetingImg}
                  alt="City view"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <p className="mt-3 text-xs text-ink/60 dark:text-white/50 text-center">
                Engineering • Electrical • Fire Protection • Turnkey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
};

export default Greeting;