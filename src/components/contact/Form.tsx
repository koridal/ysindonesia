"use client";

import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { RiSendPlaneFill } from "react-icons/ri";
import emailjs from "emailjs-com";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedService, setSelectedService] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      )
      .then(
        () => {
          alert("✅ 메시지가 성공적으로 발송되었습니다!");
          formRef.current?.reset();
          setSelectedService("");
        },
        (error) => {
          console.error("Email error:", error.text);
          alert("❌ 이메일 발송에 실패했습니다.");
        }
      );
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="flex flex-col">
      <div className="flex flex-col gap-[20px] mb-[20px]">
        <Input name="fullname" type="text" placeholder="Full Name" required />
        <Input name="email" type="email" placeholder="Email Address" required />
        <div className="flex flex-col xl:flex-row gap-[20px]">
          <Input name="phone" type="text" placeholder="Phone Number" />

          {/* ShadCN Select + hidden input */}
          <div className="w-full">
            <Select onValueChange={(value) => setSelectedService(value)}>
              <SelectTrigger className="rounded-none h-[72px] outline-none text-foreground">
                <SelectValue placeholder="Select a Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a Service</SelectLabel>
                  <SelectItem value="Construction">Construction</SelectItem>
                  <SelectItem value="Fire-Fighting Equipment">
                    Fire-Fighting Equipment
                  </SelectItem>
                  <SelectItem value="Architectual Design">
                    Architectual Design
                  </SelectItem>
                  <SelectItem value="Electric & Machinery">
                    Electric & Machinery Equipment
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* hidden input → EmailJS에서 읽음 */}
            <input type="hidden" name="service" value={selectedService} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <Textarea
          name="message"
          className="w-full resize-none rounded-none"
          placeholder="Enter Your Message"
          required
        />
      </div>

      {/* 커스텀 버튼 */}
      <Button
        type="submit"
        className="bg-amber-300 w-1/2 rounded-none flex items-center justify-center gap-2 hover:bg-amber-400 transition"
      >
        <span>Send Message</span>
        <div className="bg-black w-6 h-6 flex items-center justify-center">
          <RiSendPlaneFill className="text-white text-sm" />
        </div>
      </Button>
    </form>
  );
}
