"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<Array<SVGSVGElement | null>>([]);

  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1.08,
        x: "-4%",
        y: "0%",
        duration: 28,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    gsap.fromTo(
      leftCardRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", delay: 0.18 }
    );
    gsap.fromTo(
      rightCardRef.current,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", delay: 0.34 }
    );

    const icons = iconsRef.current.filter(Boolean) as SVGSVGElement[];
    if (icons.length) {
      gsap.fromTo(
        icons,
        { y: -8, opacity: 0, scale: 0.9, rotation: -6 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.3)",
          stagger: 0.12,
          delay: 0.6,
        }
      );
    }
  }, []);

  const setIconRef = (el: SVGSVGElement | null, i: number) => {
    iconsRef.current[i] = el;
  };

  const services = [
    { name: "Factory Solutions", desc: "Layout, equipment, commissioning", color: "text-green-200", svg: (
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 21h18V8l-4 2-4-2-4 2-4-2v13z" />
    )} ,
    { name: "Electrical Systems", desc: "Power distribution & controls", color: "text-yellow-300", svg: (
      <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    )},
    { name: "Fire Protection", desc: "Detection, suppression & safety", color: "text-red-400", svg: (
      <>
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2s4 3 4.5 6.5S12 14 12 14s-1-2-4-4C8 10 5 7 5 5.5 5 4 7 2 12 2z" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 14s1.5 2.5 4 3" />
      </>
    )},
    { name: "Turnkey Projects", desc: "End-to-end delivery", color: "text-blue-300", svg: (
      <>
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 21h18V8l-9-4-9 4v13z" />
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 10h6v6H9z" />
      </>
    )}
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div ref={bgRef} className="absolute inset-0 w-full h-full will-change-transform" aria-hidden>
        <Image src="/images/hero/Jakarta.webp" alt="City industrial background" fill priority className="object-cover saturate-110 contrast-105" />
      </div>
      <div className="absolute inset-0 bg-[rgba(78,154,64,0.22)] mix-blend-multiply pointer-events-none" />

      <div className="relative z-20 w-[92%] max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-stretch justify-center">
        {/* LEFT CARD */}
        <div ref={leftCardRef} className="w-full md:w-1/2 max-w-md mx-auto backdrop-blur-md bg-white/8 border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_6px_30px_rgba(10,20,10,0.16)] text-white flex flex-col justify-center">
          <div className="mb-2 text-3xl md:text-4xl font-extrabold leading-tight">Yunsung Indonesia</div>
          <div className="text-sm md:text-base text-green-100/90 mb-4">Building Trust, Building the Future</div>
          <p className="text-sm text-white/85 leading-relaxed mb-4">
            We deliver turnkey industrial systems — <strong>mechanical</strong>, <strong>electrical</strong>, and <strong>fire protection</strong> — from engineering and equipment supply to installation and commissioning.
          </p>
          <div className="flex gap-3 items-center">
            <button className="px-4 py-2 rounded-lg bg-green-400/85 text-white text-sm font-semibold shadow hover:scale-[1.03] transition-transform">
              Explore More
            </button>
            <a href="#contact" className="text-sm text-white/80 underline underline-offset-2">Contact</a>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div ref={rightCardRef} className="w-full md:w-1/2 max-w-md mx-auto backdrop-blur-md bg-white/7 border border-white/10 rounded-2xl p-5 md:p-7 shadow-[0_6px_30px_rgba(10,20,10,0.12)] text-white flex flex-col">
          <div className="mb-3">
            <div className="text-sm text-green-100/90 font-semibold">Our Services</div>
            <div className="text-xs text-white/80">Project-based full delivery</div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div key={i} className="relative flex items-start gap-3 group" 
                   onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <div className="w-10 h-10 flex items-center justify-center bg-white/6 rounded-xl transition-transform group-hover:scale-110">
                  <svg ref={(el) => setIconRef(el, i)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-5 h-5 ${s.color}`} fill="none" stroke="currentColor">
                    {s.svg}
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-white/80">{s.desc}</div>
                </div>

                {/* Tooltip */}
                {hovered === i && (
                  <div className="absolute top-[-1.5rem] left-0 bg-black/70 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none z-30">
                    {s.name}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 text-xs text-white/70">
            Design → Production Line Equipment → Installation → Commissioning
          </div>
        </div>
      </div>
    </section>
  );
}
