"use client";

import { useState } from "react";
import { FAQS } from "../data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24" id="faq">
      <div className="container max-w-[820px]">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] mb-4">
          FAQ
        </div>
        <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.08] tracking-[-0.025em] font-semibold m-0 mb-5 max-w-[820px]" style={{ textWrap: "balance" }}>
          The things people actually ask.
        </h2>

        <div className="mt-10 border-t border-[var(--line)]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-[var(--line)]">
                <button
                  className="w-full bg-transparent border-none py-5.5 px-2 flex items-center justify-between text-[var(--text)] text-[17px] font-medium cursor-pointer text-left tracking-[-0.01em] font-[inherit]"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <svg
                    className="ml-4 shrink-0 transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: isOpen ? "var(--accent)" : "var(--text-3)",
                    }}
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? 300 : 0,
                    padding: isOpen ? "0 8px 24px" : "0 8px 0",
                  }}
                >
                  <p className="text-[var(--text-2)] text-[15.5px] m-0 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
