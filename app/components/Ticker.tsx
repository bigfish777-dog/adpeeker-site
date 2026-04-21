import { BRANDS, isLight } from "../data";

const VARIANTS = [
  { sym: "▲", text: "active", cls: "up" },
  { sym: "▲", text: "12 new", cls: "up" },
  { sym: "✕", text: "paused 4", cls: "down" },
  { sym: "◆", text: "LP change", cls: "" },
  { sym: "▲", text: "3 new", cls: "up" },
  { sym: "✕", text: "paused 8", cls: "down" },
  { sym: "▲", text: "running 23d", cls: "up" },
];

function TickerCard({ brand, rowIdx }: { brand: typeof BRANDS[0]; rowIdx: number }) {
  const v = VARIANTS[(brand.name.length + rowIdx) % VARIANTS.length];
  const actionColor =
    v.cls === "up" ? "var(--accent)" : v.cls === "down" ? "var(--danger)" : "var(--text-2)";

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3.5 py-2.5 pl-2.5 rounded-[10px] whitespace-nowrap text-[13px]"
      style={{ border: "1px solid var(--line)", background: "rgba(255,255,255,0.015)" }}
    >
      <div
        className="flex items-center justify-center rounded-md font-mono font-semibold"
        style={{
          width: 26, height: 26, fontSize: 11,
          background: brand.bg,
          color: isLight(brand.bg) ? "#111" : "#fff",
        }}
      >
        {brand.letter}
      </div>
      <span className="text-[var(--text)] font-medium">{brand.name}</span>
      <span className="font-mono text-xs" style={{ color: actionColor }}>
        {v.sym} {v.text}
      </span>
    </div>
  );
}

export default function Ticker() {
  const row1 = BRANDS.slice(0, 10);
  const row2 = BRANDS.slice(10, 20);

  return (
    <section className="py-8 pb-16 relative">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        {/* Row 1 - scrolls left */}
        <div className="flex gap-3.5 w-max py-2" style={{ animation: "scrollL 60s linear infinite" }}>
          {[...row1, ...row1].map((b, i) => (
            <TickerCard key={`r1-${i}`} brand={b} rowIdx={0} />
          ))}
        </div>

        {/* Row 2 - scrolls right */}
        <div className="flex gap-3.5 w-max py-2 mt-1.5" style={{ animation: "scrollR 70s linear infinite" }}>
          {[...row2, ...row2].map((b, i) => (
            <TickerCard key={`r2-${i}`} brand={b} rowIdx={1} />
          ))}
        </div>
      </div>
    </section>
  );
}
