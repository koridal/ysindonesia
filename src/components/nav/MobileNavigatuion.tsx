"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { href: string; label: string; sub?: string };

const LINKS: NavLink[] = [
  { href: "/", label: "Home", sub: "Back to main" },
  { href: "/about", label: "About", sub: "Who we are" },
  { href: "/services", label: "Services", sub: "We provide" },
  { href: "/products", label: "Products", sub: "We produce" },
  { href: "/projects", label: "Projects", sub: "Works & case studies" },
  { href: "/contact", label: "Contact", sub: "Get in touch" },
];

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // 라우트 변경 시 자동 닫기
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* 햄버거: 오픈 시 숨김 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 h-12 flex items-center justify-end">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm transition-opacity
            ${open ? "opacity-0 pointer-events-none" : "opacity-100"}
            border-black/10 bg-black/5 text-black
            dark:border-white/10 dark:bg-white/10 dark:text-white
          `}
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-1.5">
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
          </div>
        </button>
      </div>

      {/* 오버레이 */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-50 transition-[opacity,transform] duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* 베이스 다크닝 레이어: 밝은 배경에서도 대비 확보 */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 60%), radial-gradient(50% 50% at 20% 100%, rgba(147,51,234,0.16) 0%, rgba(147,51,234,0) 60%), rgba(0,0,0,0.50)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        />
        {/* 얇은 격자(밝은 배경에서도 보이게 살짝 진하게) */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px, 28px 28px",
          }}
        />

        {/* 컨텐츠 */}
        <div className="relative h-full w-full">
          {/* 상단 바 */}
          <div className="h-14 px-4 sm:px-6 lg:px-12 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Menu</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-white/15 text-white
                         border-white/25 hover:bg-white/25 transition"
            >
              ✕
            </button>
          </div>

          {/* 메뉴 리스트 */}
          <nav className="px-4 sm:px-6 lg:px-12 mt-2">
            <ul className="space-y-2">
              {LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`
                        group relative block overflow-hidden
                        rounded-xl border
                        transition-all
                        ${active
                          ? "bg-white/20 border-white/30"
                          : "bg-white/12 hover:bg-white/18 border-white/20"}
                        text-white
                      `}
                      style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                    >
                      <div className="flex items-center justify-between px-4 py-4">
                        <div>
                          <div className={`text-base font-semibold ${active ? "text-white" : "text-white"}`}>
                            {l.label}
                          </div>
                          {l.sub && (
                            <div className="mt-0.5 text-xs text-white/80">
                              {l.sub}
                            </div>
                          )}
                        </div>
                        <div className="inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs
                                        border-white/30 text-white/90 group-hover:bg-white/20 transition-colors">
                          →
                        </div>
                      </div>
                      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-primary/70 to-fuchsia-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* 하단 구역 */}
            <div className="mt-6 h-px w-full bg-white/20" />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <a href="https://instagram.com" target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white/90 hover:bg-white/15 transition">IG</a>
                <a href="https://linkedin.com" target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white/90 hover:bg-white/15 transition">IN</a>
                <a href="mailto:hello@example.com" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 text-white/90 hover:bg-white/15 transition">@</a>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white text-sm font-medium shadow hover:shadow-lg transition"
              >
                Get in touch
              </Link>
            </div>

            <div className="mb-6" />
          </nav>
        </div>
      </div>
    </div>
  );
}