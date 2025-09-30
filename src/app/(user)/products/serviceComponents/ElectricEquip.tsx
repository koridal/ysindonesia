"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Construction = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 제목
      gsap.fromTo(
        ".equip-title",
        { autoAlpha: 0, y: -50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".equip-title",
            start: "top 80%",
          },
        }
      );

      // 네비
      gsap.fromTo(
        ".equip-nav",
        { autoAlpha: 0, y: -20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".equip-nav",
            start: "top 80%",
          },
        }
      );

      // 본문 텍스트
      gsap.fromTo(
        ".equip-text",
        { autoAlpha: 0, x: -50 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".equip-text",
            start: "top 85%",
          },
        }
      );

      // 이미지들 순차 등장
      gsap.utils.toArray<HTMLElement>(".equip-image").forEach((img, i) => {
        gsap.fromTo(
          img,
          { autoAlpha: 0, y: 30, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto mt-10">
      {/* 제목 + 네비 */}
      <div className="grid mt-10 text-white sm:h-40 place-items-center bg-gradient-to-r from-blue-700 via-blue-900 to-blue-950">
        <h1 className="equip-title text-3xl font-semibold tracking-tight text-center">
          Electric Equipment
        </h1>
        <h2 className="text-xl font-medium tracking-tight text-center text-gray-400">For more smooth work, we have the latest construction equipment.</h2>
      </div>

      {/* 첫 번째 섹션 */}
      <div className="flex flex-wrap max-w-7xl mx-auto mt-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full p-4 pr-4 mt-4 lg:px-12">
            <p className="equip-text font-light leading-6 tracking-tight text-justify">
              <span className="text-2xl font-semibold text-transparent place-items-center bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text">
                Electrical Testing Equipment
              </span>
              <br />
              <br />
              Ampere Meter 5/25A <br />
              Ampere Meter 1/30A <br />
              Voltage Meter 300/750V <br />
              Voltage Meter 30/1000V <br />
              Power factor meter 5/25A 120/240V 3ψ <br />
              Wattmeter 5/25A 120/240V 3ψ <br />
              Torque wrench 900㎏/㎠ <br />
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mb-6">
          <Image
            width={400}
            height={300}
            src="/images/electric-equip/elec-eq-1.jpg"
            alt="cargo_main"
            className="equip-image w-[500px] rounded-3xl px-2 opacity-0 translate-y-8 scale-90"
          />
        </div>
      </div>

      {/* 두 번째 섹션 */}
      <div className="flex flex-wrap max-w-7xl mt-10">
        <div className="w-full lg:w-1/2 flex justify-center mb-6">
          <Image
            width={400}
            height={300}
            src="/images/electric-equip/elec-eq-2.jpg"
            alt="cargo-1"
            className="equip-image w-[500px] rounded-3xl px-2 opacity-0 translate-y-8 scale-90"
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mb-6">
          <Image
            width={400}
            height={300}
            src="/images/electric-equip/elec-eq-3.jpg"
            alt="table hydraulic"
            className="equip-image w-[500px] rounded-3xl px-2 opacity-0 translate-y-8 scale-90"
          />
        </div>
      </div>

      {/* 세 번째 섹션 */}
      <div className="flex flex-wrap max-w-7xl mt-10">
        <div className="w-full lg:w-1/2 flex justify-center mb-6">
          <Image
            width={400}
            height={300}
            src="/images/electric-equip/elec-eq-4.jpg"
            alt="cargo-1"
            className="equip-image w-[500px] rounded-3xl px-2 opacity-0 translate-y-8 scale-90"
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mb-6">
          <Image
            width={400}
            height={300}
            src="/images/electric-equip/elec-eq-5.jpg"
            alt="table hydraulic"
            className="equip-image w-[500px] rounded-3xl px-2 opacity-0 translate-y-8 scale-90"
          />
        </div>
      </div>
    </div>
  );
};

export default Construction;
