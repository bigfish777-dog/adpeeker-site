import { VAULT_ITEMS } from "../data";
import { FavIconSmall } from "./FavIcon";

export default function Vault() {
  const tagColors: Record<string, { color: string; border: string; bg: string }> = {
    c1: { color: "var(--accent)", border: "rgba(0,229,199,0.3)", bg: "rgba(0,229,199,0.06)" },
    c2: { color: "#FFB4B4", border: "rgba(255,107,107,0.3)", bg: "rgba(255,107,107,0.06)" },
    c3: { color: "var(--warn)", border: "rgba(255,209,102,0.3)", bg: "rgba(255,209,102,0.06)" },
    c4: { color: "#B4B4FF", border: "rgba(180,180,255,0.3)", bg: "rgba(180,180,255,0.06)" },
  };

  return (
    <section className="py-24">
      <div className="container">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] mb-4">
          Creative vault
        </div>
        <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.08] tracking-[-0.025em] font-semibold m-0 mb-5 max-w-[820px]" style={{ textWrap: "balance" }}>
          Your Creative Vault. Everything. Forever.
        </h2>
        <p className="text-[var(--text-2)] text-[17px] max-w-[680px] m-0">
          Every ad we scrape is archived to your vault — high-res video, images, copy, landing URLs — accessible long after the advertiser takes it down.
        </p>

        <div className="mt-12 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--bg-1)" }}>
          {/* Toolbar */}
          <div className="flex gap-2.5 p-4 border-b border-[var(--line)] flex-wrap items-center">
            {["All advertisers", "All formats", "All tags", "Last 30 days"].map((label) => (
              <button
                key={label}
                className="font-mono text-xs py-1.5 px-3 rounded-[7px] text-[var(--text-2)] cursor-pointer inline-flex items-center gap-1.5"
                style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
              >
                {label}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            ))}
            <input
              className="flex-1 min-w-[200px] py-1.5 px-3 rounded-[7px] text-[var(--text)] text-[13px] font-[inherit] placeholder:text-[var(--text-3)]"
              style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
              placeholder="Search copy, landing URL, or tag..."
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 p-4.5">
            {VAULT_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-[10px] overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
                style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
              >
                {/* Thumbnail */}
                <div className="aspect-[4/5] relative overflow-hidden" style={{ background: item.bg }}>
                  <div
                    className="absolute inset-0"
                    style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 8px, transparent 8px 18px)" }}
                  />
                  <div className="absolute left-2.5 top-2.5 font-mono text-[9.5px] py-0.5 px-1.5 rounded text-white/80 tracking-wider" style={{ background: "rgba(0,0,0,0.55)" }}>
                    {item.type === "video" ? "VIDEO" : "IMAGE"}
                  </div>
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.2)" }}>
                      <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                          <path d="M3 2l7 4-7 4V2z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="p-2.5 px-3">
                  <div className="flex items-center gap-1.5 text-[12.5px] text-[var(--text)] mb-2">
                    <FavIconSmall brand={item.brand} />
                    <span>{item.brand.name}</span>
                  </div>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {item.tags.map((tag) => {
                      const tc = tagColors[tag.c] || { color: "var(--text-2)", border: "var(--line)", bg: "transparent" };
                      return (
                        <span
                          key={tag.l}
                          className="font-mono text-[10px] py-0.5 px-1.5 rounded"
                          style={{ color: tc.color, border: `1px solid ${tc.border}`, background: tc.bg }}
                        >
                          {tag.l}
                        </span>
                      );
                    })}
                  </div>
                  <div className="font-mono text-[10.5px] text-[var(--text-3)] flex items-center gap-1.5">
                    {item.live && (
                      <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
                    )}
                    {!item.live && (
                      <span className="w-[5px] h-[5px] rounded-full bg-[var(--text-3)]" />
                    )}
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
