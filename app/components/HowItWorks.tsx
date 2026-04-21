const STEPS = [
  {
    num: "STEP 01",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M10 14L21 3M21 3h-7M21 3v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Paste the URL.",
    desc: "Grab any advertiser URL from the Meta Ad Library. Drop it into AdPeeker. That's the setup.",
  },
  {
    num: "STEP 02",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "We watch, all day.",
    desc: "Our crawler checks every tracked advertiser four times a day. New launches, paused creatives, landing page changes — we catch them all.",
  },
  {
    num: "STEP 03",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16v12H5.5L4 17.5V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Get the digest.",
    desc: "Daily email, Slack pings, or webhooks. Review what's moving, ignore what isn't, stay ahead of the test cycle.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24" id="how-it-works">
      <div className="container">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] mb-4">
          How it works
        </div>
        <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.08] tracking-[-0.025em] font-semibold m-0 mb-5 max-w-[820px]" style={{ textWrap: "balance" }}>
          Up and running in 60 seconds.
        </h2>
        <p className="text-[var(--text-2)] text-[17px] max-w-[680px] m-0">
          Three steps. No onboarding call. No &ldquo;implementation specialist.&rdquo;
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="rounded-[14px] p-7 relative overflow-hidden"
              style={{ border: "1px solid var(--line)", background: "var(--bg-1)" }}
            >
              <div className="font-mono text-xs text-[var(--accent)] tracking-[0.12em] mb-5">
                {step.num}
              </div>
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[var(--accent)] mb-5"
                style={{ background: "var(--accent-dim)" }}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold m-0 mb-2 tracking-[-0.015em]">{step.title}</h3>
              <p className="text-[var(--text-2)] text-[15px] m-0">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
