"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-[border-color] duration-200"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(10,10,11,0.72)",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-3.5 flex items-center justify-between">
        <a href="#top" className="font-mono text-[17px] font-semibold tracking-tight text-[var(--text)] no-underline flex items-center gap-2">
          <span className="w-[22px] h-[22px] rounded-md bg-[var(--accent)] flex items-center justify-center text-[#062826] font-bold text-sm font-mono">
            P
          </span>
          adpeeker
        </a>

        <nav className="hidden md:flex items-center gap-7">
          <a href="#features" className="text-[var(--text-2)] text-sm no-underline hover:text-[var(--text)] transition-colors">Features</a>
          <a href="#how-it-works" className="text-[var(--text-2)] text-sm no-underline hover:text-[var(--text)] transition-colors">How it works</a>
          <a href="#pricing" className="text-[var(--text-2)] text-sm no-underline hover:text-[var(--text)] transition-colors">Pricing</a>
          <a href="#faq" className="text-[var(--text-2)] text-sm no-underline hover:text-[var(--text)] transition-colors">FAQ</a>
          <a href="#" className="text-[var(--text)] text-sm no-underline">Log in</a>
          <a
            href="#"
            className="bg-[var(--accent)] text-[#062826] px-3.5 py-2 rounded-lg font-medium text-[13.5px] no-underline transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_var(--accent-glow)]"
          >
            Start free trial
          </a>
        </nav>

        <button className="md:hidden bg-transparent border-none text-[var(--text)] cursor-pointer" aria-label="menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
