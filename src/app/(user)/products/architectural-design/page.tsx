"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Design() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prod-hero-title",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.05 }
      );
      gsap.fromTo(
        ".prod-hero-sub",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        ".prod-intro, .prod-keywords",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.2 }
      );
      gsap.fromTo(
        ".prod-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.25 }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const GALLERY = [
    {
      src: "/images/products/blueprint.jpeg",
      alt: "Blueprint",
      caption: "Concept blueprint and layout planning",
    },
    {
      src: "/images/products/design.jpg",
      alt: "Building concept",
      caption: "Architectural study for building massing",
    },
    {
      src: "/images/architectual-design/nesia-19.jpeg",
      alt: "Factory exterior",
      caption: "Factory facade and route planning",
    },
    {
      src: "/images/architectual-design/office.jpg",
      alt: "Office interior",
      caption: "Office interior zoning and flow",
    },
    {
      src: "/images/architectual-design/warehouse.jpg",
      alt: "Warehouse",
      caption: "Warehouse logistics circulation",
    },
  ];

  const KEYWORDS = [
    "Factory",
    "Logistics",
    "Building",
    "Office",
    "Dormitory",
  ];

  return (
    <main
      ref={rootRef}
      className="
        mx-auto max-w-7xl
        px-6 sm:px-8 lg:px-12
        pt-20 md:pt-28 pb-20
        space-y-10
      "
    >
      {/* Hero */}
      <section
        className="
          relative overflow-hidden rounded-2xl
          border border-white/10 bg-gradient-to-b from-primary/10 via-transparent to-transparent
          backdrop-blur-sm p-8 md:p-12
        "
      >
        <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <h1 className="prod-hero-title text-3xl md:text-5xl font-extrabold tracking-tight">
          Architectural Design
        </h1>
        <p className="prod-hero-sub mt-3 max-w-2xl text-ink/80 dark:text-white/80">
          End-to-end architectural planning for factories, logistics, offices, and more — aligned with code and constructability.
        </p>
      </section>

      {/* Intro + Keywords */}
      <section className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Intro text */}
        <div className="prod-intro">
          <div
            className="
              rounded-2xl border border-white/10
              bg-white/60 dark:bg-white/5 backdrop-blur-sm
              p-6
            "
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Design Scope
            </h2>
            <p className="mt-3 text-sm md:text-[15px] text-ink/80 dark:text-white/80 max-w-prose">
              We craft architectural solutions across industrial and commercial facilities.
              From conceptual massing to detailed coordination, our design balances
              regulations, workflows, and future expansion.
            </p>
          </div>
        </div>

        {/* Keywords block */}
        <div className="prod-keywords">
          <div
            className="
              rounded-2xl border border-white/10
              bg-white/60 dark:bg-white/5 backdrop-blur-sm
              p-6
            "
          >
            <h3 className="text-lg md:text-xl font-bold tracking-tight">Focus Areas</h3>
            <ul className="mt-3 grid grid-cols-2 gap-3">
              {KEYWORDS.map((k) => (
                <li
                  key={k}
                  className="
                    rounded-xl border border-white/10
                    bg-white/50 dark:bg-white/5 backdrop-blur-sm
                    px-3 py-2 text-sm font-semibold
                    text-ink dark:text-white
                  "
                >
                  {k}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink/60 dark:text-white/60">
              Zoning, circulation, code compliance, and constructability-first details.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section>
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">Gallery</h3>
          <p className="mt-1 text-sm md:text-[15px] text-ink/80 dark:text-white/80 max-w-prose">
            A consistent 4:3 aspect ratio for visual harmony. Click items in other pages if lightbox is enabled.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY.map((g) => (
            <div
              key={g.src}
              className="
                prod-card relative overflow-hidden
                rounded-2xl border border-white/10
                bg-white/60 dark:bg-white/5 backdrop-blur-sm
                hover:-translate-y-0.5 hover:shadow-2xl transition-all
              "
            >
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <div className="px-4 py-3">
                <h4 className="font-semibold">{g.alt}</h4>
                {g.caption && (
                  <p className="mt-1 text-xs text-ink/70 dark:text-white/70">
                    {g.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="
          relative overflow-hidden rounded-2xl
          border border-white/10 bg-gradient-to-r from-primary/15 via-transparent to-fuchsia-400/10
          backdrop-blur-sm p-8 md:p-10
        "
      >
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">Plan your next facility with us</h3>
        <p className="mt-2 text-ink/80 dark:text-white/80">
          Share footprint, utility needs, and timeline — we’ll respond with a tailored concept draft.
        </p>
        <div className="mt-5">
          <a
            href="/contact"
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white shadow hover:shadow-lg transition-all"
          >
            Contact us
          </a>
        </div>
      </section>
    </main>
  );
}