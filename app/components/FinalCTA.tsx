export default function FinalCTA() {
  return (
    <section
      className="py-24 text-center"
      style={{
        background: "radial-gradient(600px 300px at 50% 0%, rgba(0,229,199,0.1), transparent 70%), var(--bg-1)",
        borderTop: "1px solid rgba(0,229,199,0.2)",
        borderBottom: "1px solid rgba(0,229,199,0.2)",
      }}
    >
      <div className="container">
        <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-[-0.025em] font-semibold m-0 mx-auto mb-4 max-w-[760px]" style={{ textWrap: "balance" }}>
          Your competitor&apos;s next winning ad is probably launching right now.
        </h2>
        <p className="text-[var(--text-2)] text-[17px] max-w-[680px] m-0 mx-auto mb-8">
          Find out the same day they do.
        </p>
        <div className="mt-8">
          <a href="#" className="btn btn-primary">Start 7-day free trial &rarr;</a>
        </div>
        <div className="font-mono text-[12.5px] text-[var(--text-3)] flex gap-4 flex-wrap justify-center mt-5">
          <span>Plans from $5/month</span>
          <span className="before:content-['·'] before:mr-1.5">No card required for trial</span>
          <span className="before:content-['·'] before:mr-1.5">Setup in 60 seconds</span>
        </div>
      </div>
    </section>
  );
}
