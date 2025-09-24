// components/nav/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiPhone } from "react-icons/fi";
import ModeToggle from "../mode-toggle";
import Logo from "../common/Logo";

const MENU = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-20 transition ${
      scrolled ? "backdrop-blur-md bg-white/20 dark:bg-black/20 border-b border-white/20 dark:border-white/10" : "bg-transparent"
    }`}>
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold text-ink dark:text-white">Yunsung Indonesia</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {MENU.map(m => (
            <Link key={m.href} href={m.href} className="text-sm text-ink/80 dark:text-white/80 hover:text-ink dark:hover:text-white">
              {m.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <Link href="/contact"><FiPhone className="mr-2" /> Get Quote</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}