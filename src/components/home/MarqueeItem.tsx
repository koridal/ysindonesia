"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type ImageItem = string | { src: string; alt?: string };

interface MarqueeItemProps {
  images: ImageItem[];
  from?: number | string;
  to?: number | string;
  duration?: number;
  className?: string;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({
  images,
  from = "0%",
  to = "-100%",
  duration = 60,
  className = "",
}) => {
  const normalized = images.map((it) =>
    typeof it === "string" ? { src: it, alt: "" } : it
  );

  const motionProps = {
    initial: { x: from },
    animate: { x: to },
    transition: { duration, repeat: Infinity, ease: "linear" as const },
    className: "flex flex-shrink-0 will-change-transform",
  };

  return (
    <div
      className={`max-w-7xl mx-auto relative overflow-hidden flex MyGradient my-6 ${className}`}
    >
      <motion.div {...motionProps}>
        {normalized.map((img, idx) => (
          <Image
            key={`a-${idx}`}
            src={img.src}
            alt={img.alt ?? `marquee-${idx}`}
            width={320}
            height={80}
            className="h-20 w-80 pr-20 object-contain"
            priority={idx < 2}
          />
        ))}
      </motion.div>

      <motion.div aria-hidden {...motionProps}>
        {normalized.map((img, idx) => (
          <Image
            key={`b-${idx}`}
            src={img.src}
            alt={img.alt ?? `marquee-dup-${idx}`}
            width={320}
            height={80}
            className="h-20 w-80 pr-20 object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeItem;
