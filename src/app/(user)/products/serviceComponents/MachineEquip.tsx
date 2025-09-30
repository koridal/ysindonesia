"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const MachineEquip = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);  // 각 이미지를 담을 배열

  // ref 업데이트 함수
  const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) imageRefs.current[index] = el;
  };

  useEffect(() => {
    // FOUC 방지: 초기 opacity 0 설정
    gsap.set(containerRef.current, { autoAlpha: 0 });

    const ctx = gsap.context(() => {
      // 전체 container fade-in 효과
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power1.out",
      });

      // Heading 애니메이션
      gsap.from(headingRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // 텍스트 블록 애니메이션
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // 이미지 스크롤 트리거로 애니메이션
      imageRefs.current.forEach((el, index) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
        });
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto mt-10 opacity-0">
      {/* Heading + Navigation */}
      <div className="grid mt-10 text-white sm:h-40 place-items-center bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
        <h1
          ref={headingRef}
          className="text-3xl font-semibold tracking-tight text-center"
        >
          Machinery Equipment
        </h1>
        <h2 className="text-xl font-medium tracking-tight text-center text-gray-400">For more smooth work, we have the latest construction equipment.</h2>
      </div>

      {/* Text + 첫 번째 이미지 */}
      <div className="flex flex-wrap max-w-7xl mx-auto mt-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full p-4 pr-4 mt-4 lg:px-12">
            <p
              ref={textRef}
              className="font-light leading-6 tracking-tight text-justify"
            >
              <span className="text-2xl font-semibold text-transparent place-items-center bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text">
                Machinery Equipment
              </span>
              <br />
              <br />
              Banding Machine <br />
              Cutting Machine <br />
              Milling Machine <br />
              BusBar Banding Machine <br />
              Radial Machine <br />
              Co & Argon Machine <br />
              Global Power Coating Line <br />
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div
            className="flex justify-center mb-6"
            ref={setImageRef(0)} // ref 설정 함수 호출
          >
            <Image
              width={400}
              height={300}
              src="/images/machine-equip/ma-eq-1.jpg"
              alt="cargo_main"
              className="w-[500px] rounded-3xl px-2"
            />
          </div>
        </div>
      </div>

      {/* 두 번째 이미지 섹션 */}
      <div className="flex flex-wrap max-w-7xl mt-10">
        <div className="w-full lg:w-1/2">
          <div
            className="flex justify-center mb-6"
            ref={setImageRef(1)} // ref 설정 함수 호출
          >
            <Image
              width={400}
              height={300}
              src="/images/machine-equip/ma-eq-2.jpg"
              alt="cargo-1"
              className="w-[500px] rounded-3xl px-2"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div
            className="flex justify-center mb-6"
            ref={setImageRef(2)} // ref 설정 함수 호출
          >
            <Image
              width={400}
              height={300}
              src="/images/machine-equip/ma-eq-3.jpg"
              alt="table hydraulic"
              className="w-[500px] rounded-3xl px-2"
            />
          </div>
        </div>
      </div>

      {/* 세 번째 이미지 섹션 */}
      <div className="flex flex-wrap max-w-7xl mt-10">
        <div className="w-full lg:w-1/2">
          <div
            className="flex justify-center mb-6"
            ref={setImageRef(3)} // ref 설정 함수 호출
          >
            <Image
              width={400}
              height={300}
              src="/images/machine-equip/ma-eq-4.jpg"
              alt="cargo-1"
              className="w-[500px] rounded-3xl px-2"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div
            className="flex justify-center mb-6"
            ref={setImageRef(4)} // ref 설정 함수 호출
          >
            <Image
              width={400}
              height={300}
              src="/images/machine-equip/ma-eq-5.jpg"
              alt="table hydraulic"
              className="w-[500px] rounded-3xl px-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineEquip;
