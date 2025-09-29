"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-title", {
        scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play reverse play reverse" },
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
      });
      gsap.to(".hero-mp4", {
        scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play reverse play reverse" },
        opacity: 1, scale: 1, duration: 1.2, ease: "power2.out",
      });
      gsap.to(".hero-text", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play reverse play reverse" },
        opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        mx-auto max-w-7xl
        mt-16 md:mt-20
        px-6 sm:px-8 lg:px-12
        pb-20 lg:mb-20
        border-b border-b-gray-500
      "
    >
      {/* 헤더 라인 + 타이틀 */}
      <div className="mb-6 md:mb-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <h1
          className="
            hero-title opacity-0 translate-y-6
            mt-4 md:mt-6
            text-2xl md:text-3xl lg:text-3xl
            font-extrabold tracking-tight
            text-center md:text-left
          "
        >
          Our Story Unveiled
        </h1>
      </div>

      {/* 콘텐츠: 영상 + 텍스트 */}
      <div className="flex flex-col md:flex-row md:items-center lg:items-start gap-y-10 md:gap-x-10">
        {/* 영상 */}
        <div className="w-full lg:w-1/2 md:pr-6 lg:pr-10">
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
            <video
              src="/videos/unveiled.mp4"
              className="object-cover w-full max-h-screen hero-mp4"
              autoPlay={!isMobile}  // 모바일 자동재생 X
              loop
              muted
              playsInline
              controls={isMobile}   // 모바일은 컨트롤러 제공
            />
          </div>
        </div>

        {/* 텍스트 */}
        <div className="w-full lg:w-1/2">
          <div className="mx-auto md:mx-0 max-w-prose">
            <p className="hero-text opacity-0 translate-y-6 mt-2 md:mt-4 mb-6 md:mb-8 tracking-tight text-justify">
              Inko Jaya Konstruksi, established in 1988, has been providing construction services with a focus on quality, adherence to timelines, and reliability. Our commitment to excellence is showcased through our portfolio, demonstrating our dedication to promoting our work.
            </p>
            <p className="hero-text opacity-0 translate-y-6 text-sm tracking-tight text-justify">
              Dedicated to meeting and exceeding client expectations, we strive to deliver projects that reflect precision, innovation, and superior craftsmanship. With a strong emphasis on quality, we aim to build structures that stand the test of time and exceed industry standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;