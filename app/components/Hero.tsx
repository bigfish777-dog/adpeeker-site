"use client";

import { useEffect, useState } from "react";
import { FEED_ROWS } from "../data";
import { FavIcon } from "./FavIcon";

export default function Hero() {
  const [scanTime, setScanTime] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanTime((s) => (s + 3) % 240);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const actionColor = (cls: string) => {
    if (cls === "up") return "var(--accent)";
    if (cls === "down") return "var(--danger)";
    if (cls === "new") return "var(--warn)";
    return "var(--text-2)";
  };

  return (
    <section className="relative py-[72px] pb-24 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 500px at 85% -10%, rgba(0,229,199,0.08), transparent 60%), radial-gradient(700px 400px at 10% 30%, rgba(0,229,199,0.04), transparent 60%)",
        }}
      />

      <div className="container relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        {/* Left: copy */}
        <div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs mb-6"
            style={{
              background: "rgba(0,229,199,0.06)",
              border: "1px solid rgba(0,229,199,0.22)",
              color: "var(--accent)",
            }}
          >
            <span className="live-dot" />
            <span>Live competitor intelligence</span>
          </div>

          <h1
            className="text-[clamp(40px,6vw,68px)] leading-[1.02] tracking-[-0.035em] font-semibold m-0 mb-5.5"
            style={{ textWrap: "balance" }}
          >
            Peek at every Meta ad your competitors{" "}
            <span className="text-[var(--accent)]">run.</span>
          </h1>

          <p className="text-lg text-[var(--text-2)] max-w-[560px] mb-8 leading-relaxed" style={{ textWrap: "pretty" }}>
            AdPeeker monitors your competitors&apos; Facebook and Instagram ads 4&times; daily,
            archives every creative to your vault, and delivers what matters to your inbox.
            Paste one URL. We handle the rest.
          </p>

          <div className="flex gap-3 flex-wrap mb-4">
            <a href="#pricing" className="btn btn-primary">Start 7-day free trial &rarr;</a>
            <a href="#how-it-works" className="btn btn-ghost">See how it works</a>
          </div>

          <div className="font-mono text-[12.5px] text-[var(--text-3)] flex gap-4 flex-wrap">
            <span>No credit card</span>
            <span className="before:content-['·'] before:mr-1.5">Plans from $5/mo</span>
            <span className="before:content-['·'] before:mr-1.5">60-second setup</span>
          </div>
        </div>

        {/* Right: live feed card */}
        <div
          className="relative rounded-2xl p-4.5"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
            border: "1px solid var(--line)",
            boxShadow: "0 40px 80px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,199,0.04)",
          }}
        >
          {/* Top glow border */}
          <div
            className="absolute inset-[-1px] rounded-[17px] pointer-events-none opacity-50"
            style={{
              background: "linear-gradient(180deg, rgba(0,229,199,0.3), transparent 40%)",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: 1,
            }}
          />

          <div className="flex justify-between items-center px-1.5 pt-1 pb-3.5 border-b border-[var(--line)] mb-2.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-2)] uppercase tracking-widest">
              <span className="live-dot" />
              Live feed
            </div>
            <div className="font-mono text-[11.5px] text-[var(--text-3)]">
              Last scan: {scanTime}s ago
            </div>
          </div>

          {FEED_ROWS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[32px_1fr_auto] gap-3 items-center py-3 px-1.5 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              <FavIcon brand={row.brand} />
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="text-sm text-[var(--text)]">{row.brand.name}</div>
                <div className="font-mono text-xs" style={{ color: actionColor(row.cls) }}>
                  <span className="mr-1.5">{row.sym}</span>
                  {row.action}
                </div>
              </div>
              <div className="font-mono text-[11.5px] text-[var(--text-3)] whitespace-nowrap">
                {row.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
