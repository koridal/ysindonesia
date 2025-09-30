"use client";

import React, { useState } from "react";
import { PiBuildingsFill, PiUserGearFill } from "react-icons/pi";
import { MdFireHydrantAlt, MdElectricBolt } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // ⬅️ 경로 정리
import Link from "next/link";

// 타입 명시(권장)
type ServiceItem = {
  name:
    | "construction"
    | "fire-fighting equipment"
    | "architectual design"
    | "electric & machinery equipment";
  icon: React.ReactNode;
  title: string;
  description: string;
  serviceList: string[];
  thumbs: { url: string }[];
  link: string; // 각 서비스 아이템의 링크 추가
};

const serviceData: ServiceItem[] = [
  {
    name: "construction",
    icon: <PiBuildingsFill />,
    title: "Construction Services",
    description:
      "We build with precision and innovation, ensuring that every structure is strong, reliable, and built to last. From foundation touches, our expertise transforms ideas into reality.",
    serviceList: [
      "Construction builds",
      "Regulation review",
      "Construction of seismic design",
      "Interior Finish",
    ],
    thumbs: [
      { url: "images/products/construction.jpg" },
      { url: "images/products/crane.jpg" },
    ],
    link: "/services/construction", // 링크 추가
  },
  {
    name: "fire-fighting equipment",
    icon: <MdFireHydrantAlt />,
    title: "Fire-Fighting Equipment",
    description:
      "We pursue safety first through fire extinguishing facilities, alarm facilities, evacuation rescue facilities, and fire extinguishing water facilities for rational and structural fire prevention and suppression, and actively respond to strengthened regulations",
    serviceList: [
      "Installation Fire-fighting System",
      "Regulation review",
      "Evacuation facilities",
      "Rescue facilities",
    ],
    thumbs: [
      { url: "images/products/fire-fighting.jpg" }, 
      { url: "images/products/hydrant-1.jpg" }
    ],
    link: "/services/hydrant", // 링크 추가
  },
  {
    name: "architectual design",
    icon: <PiUserGearFill />,
    title: "Architectural Design",
    description:
      "Providing expert guidance for construction and renovation projects. From planning and budgeting to compliance and sustainability, our consulting service ensures project success.",
    serviceList: [
      "Project Plans",
      "Costing",
      "Site Management & Permits",
      "Sustainability & Safety",
    ],
    thumbs: [
      { url: "images/products/design.jpg" }, 
      { url: "images/products/blueprint.jpeg" }
    ],
    link: "/services/architectural-design", // 링크 추가
  },
  {
    name: "electric & machinery equipment",
    icon: <MdElectricBolt />,
    title: "Electric & Machinery Equipment",
    description:
      "It has a strong foundation for comprehensive construction by having the ability to produce or procure most of the mechanical facilities related to production, including electrical facilities, especially conveyor systems, cargo lifts, presses, and rack systems on its own.",
    serviceList: [
      "Installation Electric facility",
      "Machinery facility",
      "Selecting equip for manufacturing process",
      "Energy saving suggestion", 
    ],
    thumbs: [
      { url: "images/products/industrial.jpg" }, 
      { url: "images/products/electric-1.jpg" }
    ],
    link: "/services/electric&machinery", // 링크 추가
  },
];

export default function Services() {
  const [activeTab, setActiveTab] =
    useState<ServiceItem["name"]>("construction");

  return (
    <section className="max-w-7xl mx-auto" id="services">
      <div className="items-center justify-center mx-auto">
        <div>
          <div className="text-center mb-10">
            <h1 className="services-title inline-block px-2 text-2xl font-semibold text-[#1f1c0c] border-l-[4px] border-[#504e4d] dark:text-white">
              Solutions We Provide
            </h1>
          </div>
          <p className="mb-11 text-center text-lg mx-auto">
            Offering tailored construction solutions, from planning to
            completion, with focus on quality and innovation.
          </p>
        </div>

        <Tabs
          defaultValue="construction"
          onValueChange={(value) => setActiveTab(value as ServiceItem["name"])}
          className="flex flex-col xl:flex-row gap-[30px]"
        >
          {/* 왼쪽 탭 리스트 */}
          <TabsList className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-[30px] w-full h-full rounded-none p-0 bg-transparent xl:w-[400px]">
            {serviceData.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <TabsTrigger
                  key={item.name}
                  value={item.name}
                  className="w-full rounded-none h-[100px] flex items-center relative shadow-gray-500 p-0 outline-none border border-gray-200 shadow-xl"
                >
                  <div
                    className={`w-[100px] h-[100px] flex items-center justify-center absolute left-0 transition-colors duration-200
                      ${
                        isActive
                          ? "bg-black text-white"
                          : "bg-yellow-200 text-black hover:bg-yellow-400 hover:text-white"
                      }`}
                  >
                    <div className="text-4xl">{item.icon}</div>
                  </div>
                  <div className="capitalize ml-[110px] text-lg">
                    {item.name}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* 오른쪽 탭 컨텐츠 */}
          <div className="flex-1 bg-white shadow-xl h-[490px] p-[30px] overflow-y-auto">
            {serviceData.map((item) => (
              <TabsContent key={item.name} value={item.name} className="m-0">
                {/* 가로 레이아웃 적용 */}
                <div className="flex flex-col xl:flex-row gap-8">
                  {/* 썸네일 영역 */}
                  <div className="flex md:flex-row xl:flex-col gap-5 xl:gap-[30px]">
                    {item.thumbs.map((thumb, index) => (
                      <div
                        key={index}
                        className="relative w-[140px] xl:w-[200px] h-[140px] xl:h-[200px]"
                      >
                        <Image
                          src={`/${thumb.url}`}
                          alt={`${item.name}-${index}`}
                          fill
                          sizes="(max-width: 1280px) 140px, 200px"
                          className="object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 설명 + 리스트 영역 */}
                  <div className="flex-1">
                    <h1 className="text-lg mb-6 font-semibold">{item.title}</h1>
                    <p className="mb-10 text-gray-700 text-lg">{item.description}</p>

                    <ul className="grid grid-cols-2 gap-4 mb-12">
                      {item.serviceList.map((service, index) => (
                        <li key={index} className="flex items-center gap-4">
                          <div className="w-[6px] h-[6px] bg-yellow-400 rounded-full"></div>
                          <div className="capitalize font-medium text-black">
                            {service}
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Read more 버튼에 링크 추가 */}
                    <Link href={item.link}>
                      <Button>Read more</Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
