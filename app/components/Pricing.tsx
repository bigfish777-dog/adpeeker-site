"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$5",
    desc: "For anyone kicking the tires on competitor intelligence.",
    features: [
      "3 tracked advertisers",
      "4\u00D7 daily scans",
      "Permanent creative vault",
      "Email digest (daily or weekly)",
    ],
    featured: false,
    cta: "Get started \u2192",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    desc: "For media buyers, DTC founders, and small agencies.",
    features: [
      "15 tracked advertisers",
      "4\u00D7 daily scans",
      "Permanent creative vault",
      "Email + Slack alerts",
      "AI transcription & creative tagging",
      "Weekly AI strategy summary",
    ],
    emphFeature: "7-day free trial, no credit card",
    featured: true,
    cta: "Start free trial \u2192",
  },
  {
    id: "business",
    name: "Business",
    price: "$49",
    desc: "For teams tracking a full competitive landscape.",
    features: [
      "50 tracked advertisers",
      "4\u00D7 daily scans",
      "Permanent creative vault",
      "Email + Slack + Webhook alerts",
      "AI transcription & creative tagging",
      "Weekly AI strategy summary",
      "API access",
      "Priority support",
    ],
    featured: false,
    cta: "Get started \u2192",
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(planId: string) {
    setLoading(planId);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/signup";
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(null);
  }

  return (
    <section className="py-24" id="pricing">
      <div className="container">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] mb-4">
          Pricing
        </div>
        <h2 className="text-[clamp(30px,4vw,44px)] leading-[1.08] tracking-[-0.025em] font-semibold m-0 mb-5 max-w-[820px]" style={{ textWrap: "balance" }}>
          Simple pricing. No overages. No &ldquo;contact sales.&rdquo;
        </h2>
        <p className="text-[var(--text-2)] text-[17px] max-w-[680px] m-0">
          Cancel in two clicks. Keep your vault either way.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4.5 mt-14 items-stretch max-w-[440px] lg:max-w-none mx-auto lg:mx-0">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-8 px-7 flex flex-col relative"
              style={{
                border: plan.featured
                  ? "1px solid rgba(0,229,199,0.45)"
                  : "1px solid var(--line)",
                background: plan.featured
                  ? "linear-gradient(180deg, rgba(0,229,199,0.04), var(--bg-1) 60%)"
                  : "var(--bg-1)",
                boxShadow: plan.featured
                  ? "0 0 0 1px rgba(0,229,199,0.25), 0 40px 80px -40px var(--accent-glow)"
                  : "none",
              }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-2.5 left-7 px-2.5 py-1 rounded-md font-mono text-[10.5px] font-semibold tracking-wider"
                  style={{ background: "var(--accent)", color: "#062826" }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="font-mono text-[13px] text-[var(--text-2)] uppercase tracking-wider mb-4">
                {plan.name}
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-[44px] font-semibold tracking-[-0.02em]">{plan.price}</span>
                <span className="text-[var(--text-3)] text-sm font-mono">/month</span>
              </div>
              <p className="text-[var(--text-2)] text-sm m-0 mb-6 min-h-[40px]">{plan.desc}</p>

              <ul className="list-none p-0 m-0 mb-7 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm text-[var(--text)] py-2 pl-[26px] relative"
                    style={{ borderBottom: "1px dashed var(--line)" }}
                  >
                    <span
                      className="absolute left-0 top-[13px] w-3.5 h-3.5 rounded-full"
                      style={{
                        background: `var(--accent-dim) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'><path d='M2 5.2L4 7L8 3' stroke='%2300E5C7' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>") center/10px no-repeat`,
                      }}
                    />
                    {f}
                  </li>
                ))}
                {plan.emphFeature && (
                  <li className="text-sm text-[var(--accent)] font-medium py-2 pl-[26px] relative">
                    <span
                      className="absolute left-0 top-[13px] w-3.5 h-3.5 rounded-full"
                      style={{
                        background: `var(--accent-dim) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'><path d='M2 5.2L4 7L8 3' stroke='%2300E5C7' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>") center/10px no-repeat`,
                      }}
                    />
                    {plan.emphFeature}
                  </li>
                )}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"} disabled:opacity-50`}
              >
                {loading === plan.id ? "Redirecting..." : plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-[var(--text-3)] text-[13px] font-mono mt-6">
          All plans: cancel anytime. No overage charges. Unlimited users on Business.
        </p>
      </div>
    </section>
  );
}
