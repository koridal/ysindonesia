"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MachinerySectionProps {
  title: string;
  text: React.ReactNode; // JSX도 가능하게 React.ReactNode
  imgSrc: string;
  imgAlt: string;
  reverse?: boolean;
}

const MachinerySection: React.FC<MachinerySectionProps> = ({
  title,
  text,
  imgSrc,
  imgAlt,
  reverse = false,
}) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.set([textRef.current, imgRef.current], { opacity: 0, y: 40 });

    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.to(textRef.current, { opacity: 1, y: 0 })
      .to(imgRef.current, { opacity: 1, y: 0 }, "-=0.6");
  }, []);

  return (
    <div className="flex flex-wrap items-center max-w-7xl mx-auto my-16 px-4 lg:px-12">
      {/* 텍스트 영역 */}
      <div
        ref={textRef}
        className={`w-full lg:w-1/2 mb-6 lg:mb-0 ${
          reverse ? "lg:order-2 lg:pl-12" : "lg:pr-12"
        }`}
      >
        <p className="font-light leading-6 tracking-tight text-justify">
          <span className="text-2xl font-semibold text-transparent bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text">
            {title}
          </span>
          <br />
          <br />
          {text}
        </p>
      </div>

      {/* 이미지 영역 */}
      <div
        ref={imgRef}
        className={`w-full lg:w-1/2 flex justify-center ${reverse ? "lg:order-1" : ""}`}
      >
        <Image
          width={700}
          height={400}
          src={imgSrc}
          alt={imgAlt}
          className="w-[650px] rounded-3xl px-2"
        />
      </div>
    </div>
  );
};

const Machinery: React.FC = () => {
  const sections: MachinerySectionProps[] = [
    {
      title: "Conveyor",
      text: (
        <>
          Conveyor systems can be manufactured in various ways to meet the needs
          of each factory, such as spray booth conveyor, dry conveyor, cargo
          conveyor.
          <br />
          <br />
          Especially, in the production of various conveyors, which are
          essential for manpower and labor cost reduction, PT. YUNSUNG provides
          more convenient and perfect conveyor system.
        </>
      ),
      imgSrc: "/images/machinery/conveyor-3.jpeg",
      imgAlt: "conveyor",
    },
    {
      title: "Cargo Lift",
      text: (
        <>
          The lift consists mainly of cargo lifts.
          <br />
          Fast and safe transportation of goods from low to high weight.
          <br />
          <br />
          It is commonly used for container loading, warehouse loading, machine
          transportation, and various product transportation, which requires
          reduction of manpower and labor costs.
        </>
      ),
      imgSrc: "/images/machinery/Cargo-lift-2.jpg",
      imgAlt: "cargo lift",
      reverse: true,
    },
    {
      title: "Press",
      text: <>Hydraulic sublimation press can be used in various industries such as printing factory and sewing company.</>,
      imgSrc: "/images/machinery/press.jpeg",
      imgAlt: "press",
    },
    {
      title: "Rack System",
      text: (
        <>
          Rack System can be used a lot for loading electronic goods.
          <br />
          <br />
          PT. YUNSUNG provides more convenient and perfect RACK system.
        </>
      ),
      imgSrc: "/images/machinery/rack-1.jpg",
      imgAlt: "rack system",
      reverse: true,
    },
    {
      title: "Scrubber",
      text: (
        <>
          The scrubber produced by PT.YUNSUNG is used to absorb and separate
          contaminants such as dust, powder, and odor.
          <br />
          <br />
          At the same time, it can play a role of clearing the environment
          inside the factory that produces various machines.
          <br />
          Mainly in various industrial fields such as production, electronics,
          plywood, clothing, manufacturing, sewing factory etc.
          <br />
          <br />
          It can be used variously.
        </>
      ),
      imgSrc: "/images/machinery/scrubber-1.jpg",
      imgAlt: "scrubber",
    },
    {
      title: "Mixer Machine",
      text: (
        <>
          A mixer is a facility that mixes extruded and raw materials in an
          injection machine at an exact ratio.
          <br />
          <br />
          This is an essential machine for all product manufacturing plants with
          extrusion and injection.
          <br />
          <br />
          It can be manufactured according to exact requirements.
        </>
      ),
      imgSrc: "/images/machinery/mixer-2.png",
      imgAlt: "mixer machine",
      reverse: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="grid mt-10 text-white sm:h-40 place-items-center bg-amber-200">
        <h1 className="text-3xl font-semibold tracking-tight text-center">Machinery</h1>
      </div>
      {sections.map((section, i) => (
        <MachinerySection key={i} {...section} />
      ))}
    </div>
  );
};

export default Machinery;
