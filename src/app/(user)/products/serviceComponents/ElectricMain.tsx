"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ElectricMain = () => {
  const textRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImg1Ref = useRef(null);
  const rightImg2Ref = useRef(null);

  useEffect(() => {
    gsap.set([textRef.current, leftImgRef.current, rightImg1Ref.current, rightImg2Ref.current], {
      opacity: 0,
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(textRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
      .fromTo(
        [leftImgRef.current, rightImg1Ref.current, rightImg2Ref.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1 },
        "-=0.3"
      );
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto mt-10">
      {/* 왼쪽 컬럼 */}
      <div className="flex flex-col gap-8">
        {/* 텍스트 */}
        <div ref={textRef} className="p-4 pr-4 mt-2 lg:px-12">
          <p className="font-light leading-6 tracking-tight text-justify">
            <span className="text-2xl font-semibold text-transparent place-items-center bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text">
              Power Panel & PLC Control Panel
            </span>
            <br />
            <br />
            The special part of PT.YUNSUNG Electrical mechanical, product is
            designed and manufactured according to IEC{" "}
            <span className="text-sm">
              (International Electro-technical Commission)
            </span>{" "}
            and ANSI
            <span className="text-sm">
              (American National Standards Institute)
            </span>{" "}
            standards from low voltage to high voltage.
            <br />
            <br />
            The switchgear realized in compact size is widely used from
            substation to a plant, construction building and apartment due to
            high blocking and high reliability. In particular, it is equipped
            with high performance VCB, ACB, MCCB, etc.
            <br />
            <br />
            To provide the best solution for our customers.
          </p>
        </div>

        {/* 아래쪽 왼쪽 이미지 */}
        <div
          ref={leftImgRef}
          className="flex items-center justify-center w-full h-[350px]"
        >
          <Image
            src="/images/electric/panel-1.jpeg"
            alt="panel-1"
            width={600}
            height={350}
            className="w-full h-full max-w-[550px] object-cover rounded-3xl shadow-lg"
          />
        </div>
      </div>

      {/* 오른쪽 컬럼 */}
      <div className="flex flex-col gap-8">
        {/* 위쪽 오른쪽 이미지 */}
        <div
          ref={rightImg1Ref}
          className="flex items-center justify-center w-full h-[350px]"
        >
          <Image
            src="/images/electric/panel-2.jpeg"
            alt="panel-2"
            width={600}
            height={350}
            className="w-full h-full max-w-[550px] object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* 아래쪽 오른쪽 이미지 */}
        <div
          ref={rightImg2Ref}
          className="flex items-center justify-center w-full h-[350px]"
        >
          <Image
            src="/images/electric/control-panel-2.png"
            alt="control-panel"
            width={600}
            height={350}
            className="w-full h-full max-w-[550px] object-cover rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ElectricMain;
