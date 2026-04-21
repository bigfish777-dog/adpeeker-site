export default function Problem() {
  return (
    <section className="py-24 md:py-12 pt-12">
      <div className="container">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] mb-4">
          The problem
        </div>
        <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.08] tracking-[-0.025em] font-semibold m-0 mb-5 max-w-[820px]" style={{ textWrap: "balance" }}>
          Manual ad tracking is a part-time job you never applied for.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 mt-10">
          <p className="text-[19px] text-[var(--text-2)] leading-relaxed m-0" style={{ textWrap: "pretty" }}>
            You open the Meta Ad Library. You scroll. You screenshot. You forget which brand you were looking at. You close the tab.
          </p>
          <p className="text-[19px] text-[var(--text-2)] leading-relaxed m-0" style={{ textWrap: "pretty" }}>
            Meanwhile, your competitors launched three new creatives this morning, paused two losers by lunch, and shipped a new landing page before you finished your coffee.{" "}
            <strong className="text-[var(--text)] font-medium">
              You&apos;ll never see any of it — unless something watches for you.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
