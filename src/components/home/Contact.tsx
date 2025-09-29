"use client";

import React, { useState, useEffect, useRef } from "react";
import { RiChat1Line, RiMapPin2Line, RiSmartphoneLine } from "react-icons/ri";
import { gsap } from "gsap";
import Form from "./Form";


export default function Contact() {
  const [open, setOpen] = useState(false);

  // refs for animation
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const infoRefs = useRef<HTMLDivElement[]>([]);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 초기 상태 세팅 (깜빡임 방지)
    gsap.set([titleRef.current, ...infoRefs.current, formRef.current], {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    // 애니메이션 실행
    tl.to(titleRef.current, { opacity: 1, y: 0 })
      .to(infoRefs.current, { opacity: 1, y: 0, stagger: 0.2 }, "-=0.3")
      .to(formRef.current, { opacity: 1, y: 0 }, "-=0.2");
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-8" id="contact">
      {/* 제목 */}
      <div className="flex justify-center">
        <h1
          ref={titleRef}
          className="relative text-3xl font-semibold text-foreground dark:text-white mb-10 text-center sm:text-left"
        >
          <span className="sm:pl-3 sm:border-l-4 sm:border-[#504e4d] block">
            Have a question for us or feedback?
          </span>
        </h1>
      </div>

      {/* 본문 */}
      <div className="container mx-auto">
        <div className="w-full xl:h-[640px] shadow-md shadow-gray-400 p-4 xl:p-8 xl:px-[90px] xl:py-[36px] border-t-4 border-amber-200 ">
          <div className="flex flex-col xl:flex-row h-full xl:divide-x xl:divide-amber-200">
            {/* 왼쪽 Contact Info */}
            <div className="w-full xl:max-w-[300px] xl:pr-[40px] h-auto xl:h-[560px]">
              <h4 className="text-2xl font-bold mb-6">Contact Us</h4>
              <div className="flex flex-col gap-[40px] mb-8 xl:mb-16">
                {/* Chat */}
                <div
                  ref={(el) => {
                    if (el) infoRefs.current[0] = el;
                  }}
                  className="flex items-start gap-[20px]"
                >
                  <RiChat1Line className="text-[28px] font-semibold text-amber-300" />
                  <div>
                    <h5 className="text-[18px] font-semibold leading-none mb-2">
                      Chat to us
                    </h5>
                    <p className="mb-4">Our friendly team is here to help.</p>
                    <p className="font-semibold text-foreground">
                      tristan007@naver.com
                    </p>
                  </div>
                </div>

                {/* Office */}
                <div
                  ref={(el) => {
                    if (el) infoRefs.current[1] = el;
                  }}
                  className="flex items-start gap-[20px]"
                >
                  <RiMapPin2Line className="text-[28px] xl:text-[56px] font-semibold text-amber-300" />
                  <div>
                    <h5 className="text-[18px] font-semibold leading-none mb-2">
                      Office
                    </h5>
                    <p className="mb-4">Come and say Hello at our office.</p>
                    <p
                      onClick={() => setOpen(true)}
                      className="cursor-pointer text-sm font-semibold text-foreground underline"
                    >
                      Jl. Cempaka 1 Blok F 16 Delta Silicon Kel.Cibatu, Kec.
                      Cikarang Selatan, Kab Bekasi Jawa Barat 17530
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div
                  ref={(el) => {
                    if (el) infoRefs.current[2] = el;
                  }}
                  className="flex items-start gap-[20px]"
                >
                  <RiSmartphoneLine className="text-[24px] font-semibold text-amber-300" />
                  <div>
                    <h5 className="text-[18px] font-semibold leading-none mb-2">
                      Phone
                    </h5>
                    <p className="mb-4">Mon-Fri 8am to 5pm.</p>
                    <p className="font-semibold text-foreground">
                      021 8263 1845
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 - Form */}
            <div ref={formRef} className="flex-1 xl:pl-[40px] mt-8 xl:mt-0">
              <h2 className="text-xl mb-3">Request A Quote</h2>
              <p className="mb-9">
                We are an industry-leading construction company that provides
                the latest technology, safety and how it impacts your business
                and career. <br />
                Have a question for us or feedback? Please click on the most
                appropriate category and fill out the form to reach us.
              </p>
              <Form />
            </div>
          </div>
        </div>
      </div>

      {/* 지도 모달 */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-[600px] h-[400px] relative shadow-lg flex flex-col">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* 구글 지도 iframe */}
            <iframe
              src="https://www.google.com/maps?q=Jl.+Cempaka+1+Blok+F+16+Delta+Silicon+Kel.Cibatu,+Kec.+Cikarang+Selatan,Kab+Bekasi+Jawa+Barat+17530&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>

            {/* Contact 페이지로 돌아가기 버튼 */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-amber-300 text-black font-semibold rounded hover:bg-amber-400 transition"
              >
                Back to Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
