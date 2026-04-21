export default function Features() {
  return (
    <section
      className="py-24"
      id="features"
      style={{ background: "linear-gradient(180deg, transparent, rgba(0,229,199,0.015), transparent)" }}
    >
      <div className="container">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] mb-4">
          Why AdPeeker
        </div>
        <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.08] tracking-[-0.025em] font-semibold m-0 mb-5 max-w-[820px]" style={{ textWrap: "balance" }}>
          Built for people who actually have to ship ads.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
          {/* Feature 1: Scan timeline */}
          <div
            className="rounded-[14px] p-8 flex flex-col min-h-[340px]"
            style={{ border: "1px solid var(--line)", background: "linear-gradient(180deg, var(--bg-1), var(--bg))" }}
          >
            <div
              className="h-40 -mx-2 -mt-2 mb-6 rounded-[10px] overflow-hidden p-3.5"
              style={{ background: "radial-gradient(400px 200px at 50% 100%, rgba(0,229,199,0.12), transparent 60%), #0d0d12" }}
            >
              <div className="font-mono text-[10.5px] text-[var(--text-3)] flex justify-between">
                <span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span>
              </div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-2.5 rounded-sm"
                    style={{
                      background: i % 6 === 0 ? "var(--accent)" : "rgba(255,255,255,0.06)",
                      boxShadow: i % 6 === 0 ? "0 0 8px var(--accent-glow)" : "none",
                    }}
                  />
                ))}
              </div>
              <div className="font-mono text-[11px] text-[var(--accent)] mt-3.5">4 scans/day</div>
              <div className="font-mono text-[10.5px] text-[var(--text-3)] mt-0.5">vs. 1/day category avg</div>
            </div>
            <h3 className="text-xl font-semibold m-0 mb-2.5 tracking-[-0.015em]">Scans that keep up with the test cycle.</h3>
            <p className="text-[var(--text-2)] text-[15px] m-0">
              Most competitor tools scan once per day. By the time you see a winning ad, it&apos;s been running 23 hours and your competitor has already scaled it. AdPeeker scans 4&times; daily so you catch tests while they&apos;re fresh.
            </p>
          </div>

          {/* Feature 2: AI tags */}
          <div
            className="rounded-[14px] p-8 flex flex-col min-h-[340px]"
            style={{ border: "1px solid var(--line)", background: "linear-gradient(180deg, var(--bg-1), var(--bg))" }}
          >
            <div className="h-40 -mx-2 -mt-2 mb-6 rounded-[10px] overflow-hidden flex flex-wrap gap-2 p-4 items-center content-center" style={{ background: "#0d0d12" }}>
              {["UGC", "Social proof", "Discount-led", "Founder POV", "Problem-agitate", "Before / after", "Testimonial", "Product demo", "Auto-transcribed"].map((tag) => {
                const isAccent = ["UGC", "Discount-led", "Before / after", "Auto-transcribed"].includes(tag);
                return (
                  <span
                    key={tag}
                    className="px-2.5 py-1.5 rounded-full font-mono text-[11px]"
                    style={{
                      border: `1px solid ${isAccent ? "rgba(0,229,199,0.3)" : "var(--line)"}`,
                      color: isAccent ? "var(--accent)" : "var(--text-2)",
                      background: isAccent ? "rgba(0,229,199,0.06)" : "transparent",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            <h3 className="text-xl font-semibold m-0 mb-2.5 tracking-[-0.015em]">AI that reads the ads, not just stores them.</h3>
            <p className="text-[var(--text-2)] text-[15px] m-0">
              Every video ad is auto-transcribed. Every creative is tagged by angle: UGC, social proof, discount-led, founder POV, problem-agitate. Every week you get an AI-written summary of what&apos;s shifting in your competitor set.
            </p>
          </div>

          {/* Feature 3: Channels */}
          <div
            className="rounded-[14px] p-8 flex flex-col min-h-[340px]"
            style={{ border: "1px solid var(--line)", background: "linear-gradient(180deg, var(--bg-1), var(--bg))" }}
          >
            <div className="h-40 -mx-2 -mt-2 mb-6 rounded-[10px] overflow-hidden grid grid-cols-3 gap-2 p-3.5" style={{ background: "#0d0d12" }}>
              {[
                { label: "Email", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.6" /></svg> },
                { label: "Slack", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M14 3v6M18 9h-8M18 14v7M14 14h7M9 18H3M9 14v7M5 10v-4M10 5H6a3 3 0 000 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
                { label: "Webhook", icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 12h8m0 0l-3-3m3 3l-3 3M16 6h4v12h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              ].map((ch) => (
                <div
                  key={ch.label}
                  className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg font-mono text-[10.5px] text-[var(--text-2)]"
                  style={{ border: "1px solid var(--line)" }}
                >
                  {ch.icon}
                  {ch.label}
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold m-0 mb-2.5 tracking-[-0.015em]">Alerts that fit your actual workflow.</h3>
            <p className="text-[var(--text-2)] text-[15px] m-0">
              Email digests. Slack channel pings. Webhooks into your own stack. All on every paid plan, not gated behind a $97/mo enterprise tier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
