"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Outline from "../../../public/images/about/history.png";
import CEO from "../../../public/images/about/ceo.jpg";
import Image from "next/image";
import { HISTORY } from "@/lib";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 제목 애니메이션
      gsap.to(".hero-title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      // CEO 이미지
      gsap.to(".hero-ceo", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      // 소개 문단
      gsap.to(".hero-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // 히스토리 항목
      gsap.to(".hero-history", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      // 아웃라인 이미지
      gsap.to(".hero-outline", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap border-b border-b-neutral-900 dark:border-b-neutral-200 pb-10 px-6 sm:px-8 lg:px-12"
    >
      {/* 제목 */}
      <div className="w-full">
        <h1
          className="hero-title opacity-0 translate-y-6
            mt-4 md:mt-6
            text-left text-2xl md:text-3xl font-extrabold tracking-tight
            bg-gradient-to-r from-black via-black to-black/80 dark:from-white dark:via-white dark:to-white/70
            bg-clip-text text-transparent"
        >
          Company Introduction
        </h1>
      </div>

      {/* CEO + 소개 */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center lg:items-start md:gap-x-8 gap-y-8 md:px-4 lg:px-6 mt-6">
          {/* CEO 이미지 */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative p-1 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-lg">
              <Image
                src={CEO}
                alt="ceoImg"
                className="mx-auto rounded-2xl opacity-0 scale-95 hero-ceo"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* 소개 문단 */}
          <div className="w-full lg:w-1/2 mt-0 px-4 md:px-0">
            <div className="mx-auto md:mx-0 max-w-prose text-center lg:text-left p-6 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-lg shadow-xl">
              <p className="w-full mb-4 tracking-tighter opacity-0 translate-y-6 hero-text">
                Specializes in supplying a variety of mechanical equipment and
                parts, including construction materials, high-pressure and
                low-pressure panels, lifts, and conveyors.
              </p>
              <p className="w-full text-md tracking-tighter opacity-0 translate-y-6 hero-text">
                Execute accurate and systematic processes from design to
                construction and commissioning.
              </p>
              <p className="w-full mt-4 tracking-tighter opacity-0 translate-y-6 hero-text">
                With a team of experts and a range of licenses, our expertise is
                built on years of experience and accumulated technology.
              </p>
            </div>
          </div>
        </div>

        {/* 히스토리 + 아웃라인 */}
        <div className="flex flex-col md:flex-row gap-y-10 md:gap-x-10 mt-10 md:px-4 lg:px-6">
          <div className="w-full lg:w-1/2">
            <div className="px-4 sm:px-6 pt-10">
              {HISTORY.map((history, index) => (
                <div
                  key={index}
                  className="flex flex-wrap mb-3 sm:mb-6 opacity-0 translate-y-6 hero-history lg:justify-center"
                >
                  <div className="w-full lg:w-1/4">
                    <p className="mb-1.5 text-sm text-neutral-400">
                      {history.year}
                    </p>
                  </div>
                  <div className="w-full max-w-xl lg:w-3/4">
                    <h6 className="mb-1.5 font-semibold">{history.name}</h6>
                    <p className="mb-1.5 text-neutral-400">
                      {history.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="px-2 sm:px-4">
              <div className="relative p-3 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-lg shadow-xl">
                <Image
                  src={Outline}
                  alt="outline"
                  width={500}
                  height={300}
                  loading="lazy"
                  className="p-2 mx-auto mt-6 border rounded-xl opacity-0 translate-x-10 hero-outline"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
