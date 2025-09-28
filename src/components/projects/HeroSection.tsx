// HeroSection.tsx (컴포넌트로 써도 되고, 페이지에 바로 넣어도 돼)
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-primary/10 via-transparent to-transparent p-8 md:p-12">
      <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <p className="text-xs font-semibold tracking-widest text-primary uppercase">
        Yunsung Indonesia
      </p>
      <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
        All Projects
      </h1>
      <p className="mt-4 max-w-2xl text-sm md:text-base text-ink/70 dark:text-white/70">
        Browse all our works and case studies.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/projects" className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white shadow hover:shadow-lg transition-all">
          전체 보기
        </Link>
        <Link href="/" className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-white/5 transition">
          홈으로
        </Link>
      </div>
    </section>
  );
}