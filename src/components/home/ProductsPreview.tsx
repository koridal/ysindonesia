// components/home/ProductsPreview.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import GlassCard from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { FaBoxOpen, FaFan, FaPumpSoap } from "react-icons/fa6"; // 대체 아이콘 활용
import { TbDeviceAnalytics } from "react-icons/tb";

type ProductItem = {
  title: string;
  desc: string;
  img: string;
  icon: React.ComponentType<{ className?: string }>;
};

const PRODUCTS: ProductItem[] = [
  {
    title: "Panels & Switchgears",
    desc: "High-quality panels and switchgears for robust power distribution.",
    img: "/images/products/panel.jpg",
    icon: FaBoxOpen,
  },
  {
    title: "HVAC",
    desc: "Fan coils, chillers interfaces, and precision ducting modules.",
    img: "/images/products/hvac.jpg",
    icon: FaFan,
  },
  {
    title: "Pumps & Fire Suppression",
    desc: "Reliable pumps and clean-agent systems for fire safety.",
    img: "/images/products/fire-protection.jpg",
    icon: FaPumpSoap,
  },
  {
    title: "Mechanical facilities",
    desc: "Conveyor, lift etc and control units for smart factories.",
    img: "/images/products/conveyor.jpg",
    icon: TbDeviceAnalytics,
  },
];

export default function ProductsPreview() {
  return (
    <section className="py-16">
      <div className="container-site">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink dark:text-white">
              Products
            </h2>
            <p className="mt-2 text-ink/80 dark:text-white/80 max-w-2xl">
              Industrial-grade components built for reliability and scale.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/products">Browse All</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            return (
              <GlassCard key={p.title} className="p-4 glass glass-hover">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/20 dark:border-white/10">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <Icon className="text-teal text-xl" />
                  <div>
                    <h3 className="font-semibold text-ink dark:text-white">
                      {p.title}
                    </h3>
                    <p className="text-sm mt-1 text-ink/80 dark:text-white/80">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
