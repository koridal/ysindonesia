"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Design = () => {
  // 애니메이션을 위한 ref들
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    gsap.fromTo(
      imgRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        delay: 0.8,
      }
    );
  });

  return () => ctx.revert();
}, []);


  return (
    <div className="max-w-7xl mx-auto">
      {/* 제목 섹션 */}
      <div
        ref={titleRef}
        className="grid h-40 mt-10 text-white place-items-center bg-red-400  shadow-lg"
      >
        <h1 className="text-3xl font-semibold tracking-tight text-center">
          Architectual Design
        </h1>
      </div>

      {/* 본문 */}
      <div className="flex flex-wrap justify-center mt-10">
        {/* 텍스트 */}
        <div ref={textRef} className="w-full lg:w-1/2 px-4 lg:px-12 mt-4">
          <p className="font-light leading-6 tracking-tight text-justify">
            <span className="text-2xl font-semibold text-transparent place-items-center bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text">
              Factory <br /><br />
              Logistics <br /><br />
              Building<br /><br />
              Office<br /><br />
              Dormitory 
            </span>
          </p>
        </div>

        {/* 첫번째 이미지 */}
        <div
          ref={(el) => {
            if (el) imgRefs.current.push(el);
          }}
          className="w-full lg:w-1/2 flex justify-center mb-6"
        >
          <Image
            width={400}
            height={200}
            src="/images/homeimage/blueprint.jpeg"
            alt="blueprint"
            className="w-[500px] h-[300px] object-cover rounded-3xl px-2 shadow-lg"
          />
        </div>

        {/* 추가 이미지 2개 */}
        <div className="flex flex-col lg:flex-row mt-10 mx-auto max-w-7xl gap-10 lg:gap-32">
          {/* 왼쪽 이미지 - 위 텍스트 영역의 왼쪽 라인에 맞춤 */}
          <div
            ref={(el) => {
              if (el) imgRefs.current.push(el);
            }}
            className="w-full lg:w-1/2 flex justify-start mb-6 lg:mb-0"
          >
            <Image
              width={400}
              height={300}
              src="/images/homeimage/design.jpg"
              alt="buildingr"
              className="w-[500px] h-[300px] object-cover rounded-3xl px-2 shadow-lg"
            />
          </div>

          {/* 오른쪽 이미지 - 위 hydrant 이미지의 오른쪽 라인에 맞춤 */}
          <div
            ref={(el) => {
              if (el) imgRefs.current.push(el);
            }}
            className="w-full lg:w-1/2 flex justify-end"
          >
            <Image
              width={400}
              height={300}
              src="/images/architectual-design/nesia-19.jpeg"
              alt="factory"
              className="w-[500px] h-[300px] object-cover rounded-3xl px-2 shadow-lg"
            />
          </div>
        </div>
        {/* 추가 이미지 2개 */}
        <div className="flex flex-col lg:flex-row mt-10 mx-auto max-w-7xl gap-10 lg:gap-32">
          {/* 왼쪽 이미지 - 위 텍스트 영역의 왼쪽 라인에 맞춤 */}
          <div
            ref={(el) => {
              if (el) imgRefs.current.push(el);
            }}
            className="w-full lg:w-1/2 flex justify-start mb-6 lg:mb-0"
          >
            <Image
              width={400}
              height={300}
              src="/images/architectual-design/office.jpg"
              alt="office"
              className="w-[500px] h-[300px] object-cover rounded-3xl px-2 shadow-lg"
            />
          </div>

          {/* 오른쪽 이미지 - 위 hydrant 이미지의 오른쪽 라인에 맞춤 */}
          <div
            ref={(el) => {
              if (el) imgRefs.current.push(el);
            }}
            className="w-full lg:w-1/2 flex justify-end"
          >
            <Image
              width={400}
              height={300}
              src="/images/architectual-design/warehouse.jpg"
              alt="logistics"
              className="w-[500px] h-[300px] object-cover rounded-3xl px-2 shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
