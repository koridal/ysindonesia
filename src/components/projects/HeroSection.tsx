"use client";

import Link from "next/link";

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  align?: "left" | "center";
};

export default function HeroSection({
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  align = "left",
}: HeroSectionProps) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  const btnWrapCls = align === "center" ? "justify-center" : "";

  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl",
        "border border-white/10",
        "bg-gradient-to-b from-primary/10 via-transparent to-transparent",
        "backdrop-blur-sm",
        "p-8 md:p-12",
        alignCls,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <h1 className="mt-1 text-3xl md:text-5xl font-extrabold tracking-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm md:text-base text-ink/70 dark:text-white/70 mx-auto md:mx-0">
          {subtitle}
        </p>
      )}

      {(primaryHref || secondaryHref) && (
        <div className={["mt-6 flex gap-3", btnWrapCls].join(" ")}>
          {primaryHref && primaryLabel && (
            <Link
              href={primaryHref}
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white shadow hover:shadow-lg transition-all"
            >
              {primaryLabel}
            </Link>
          )}
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-white/5 transition"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}