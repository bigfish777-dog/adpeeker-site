"use client";

import { useEffect, useState, useCallback } from "react";
import AddAdvertiserModal from "./components/AddAdvertiserModal";

interface Advertiser {
  id: string;
  name: string;
  meta_url: string;
  status: string;
  ad_count: number;
  last_scanned_at: string | null;
  created_at: string;
}

interface Subscription {
  plan: string | null;
  status: string | null;
}

export default function DashboardContent({ subscription }: { subscription: Subscription | null }) {
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchAdvertisers = useCallback(async () => {
    const res = await fetch("/api/advertisers");
    if (res.ok) {
      const data = await res.json();
      setAdvertisers(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAdvertisers();
  }, [fetchAdvertisers]);

  async function handleDelete(id: string) {
    await fetch("/api/advertisers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchAdvertisers();
  }

  const planLabel = subscription?.plan
    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)
    : null;

  const statusLabel = subscription?.status === "trialing" ? "Trial" :
                      subscription?.status === "active" ? "Active" : null;

  return (
    <div className="max-w-[900px]">
      {/* Header row */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold m-0 mb-1 tracking-tight">Overview</h1>
          <p className="text-[var(--text-2)] text-sm m-0">
            {advertisers.length} advertiser{advertisers.length !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <div className="flex items-center gap-3">
          {planLabel && (
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-md"
              style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
            >
              {planLabel} {statusLabel && `\u00B7 ${statusLabel}`}
            </span>
          )}
          <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ padding: "10px 16px", fontSize: 13.5 }}>
            + Add advertiser
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Tracked", value: advertisers.length, sub: "advertisers" },
          { label: "Total ads", value: advertisers.reduce((s, a) => s + a.ad_count, 0), sub: "archived" },
          { label: "Last scan", value: getLastScan(advertisers), sub: "" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5"
            style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
          >
            <div className="font-mono text-[11px] text-[var(--text-3)] uppercase tracking-wider mb-2">{stat.label}</div>
            <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
            {stat.sub && <div className="text-xs text-[var(--text-3)] mt-0.5">{stat.sub}</div>}
          </div>
        ))}
      </div>

      {/* Advertisers list */}
      {loading ? (
        <div className="text-[var(--text-3)] text-sm py-12 text-center">Loading...</div>
      ) : advertisers.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ border: "1px dashed var(--line-strong)", background: "var(--bg-1)" }}
        >
          <div
            className="w-14 h-14 rounded-xl mx-auto mb-6 flex items-center justify-center text-[var(--accent)]"
            style={{ background: "var(--accent-dim)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold m-0 mb-2">Add your first advertiser</h2>
          <p className="text-[var(--text-2)] text-sm m-0 mb-6 max-w-[400px] mx-auto">
            Paste a Meta Ad Library URL to start tracking a competitor. We&apos;ll scan them 4&times; daily and archive every creative.
          </p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            Track an advertiser &rarr;
          </button>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--line)" }}>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-1)" }}>
                <th className="text-left font-mono text-[11px] text-[var(--text-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line)]">Advertiser</th>
                <th className="text-left font-mono text-[11px] text-[var(--text-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line)]">Status</th>
                <th className="text-left font-mono text-[11px] text-[var(--text-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line)]">Ads</th>
                <th className="text-left font-mono text-[11px] text-[var(--text-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line)]">Last scan</th>
                <th className="text-right font-mono text-[11px] text-[var(--text-3)] uppercase tracking-wider px-4 py-3 border-b border-[var(--line)]"></th>
              </tr>
            </thead>
            <tbody>
              {advertisers.map((adv) => (
                <tr key={adv.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 border-b border-[var(--line)]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-semibold text-sm"
                        style={{ background: stringToColor(adv.name), color: "#fff" }}
                      >
                        {adv.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{adv.name}</div>
                        <div className="text-xs text-[var(--text-3)] truncate max-w-[200px]">{adv.meta_url}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b border-[var(--line)]">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                      <span
                        className="w-[6px] h-[6px] rounded-full"
                        style={{ background: adv.status === "active" ? "var(--accent)" : "var(--text-3)" }}
                      />
                      {adv.status === "active" ? "Tracking" : "Paused"}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-[var(--line)] font-mono text-sm text-[var(--text-2)]">
                    {adv.ad_count}
                  </td>
                  <td className="px-4 py-3 border-b border-[var(--line)] font-mono text-xs text-[var(--text-3)]">
                    {adv.last_scanned_at ? timeAgo(adv.last_scanned_at) : "Pending..."}
                  </td>
                  <td className="px-4 py-3 border-b border-[var(--line)] text-right">
                    <button
                      onClick={() => handleDelete(adv.id)}
                      className="text-xs text-[var(--text-3)] hover:text-[var(--danger)] bg-transparent border-none cursor-pointer font-mono"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddAdvertiserModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdded={fetchAdvertisers}
      />
    </div>
  );
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 45%, 35%)`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getLastScan(advertisers: { last_scanned_at: string | null }[]): string {
  const scanned = advertisers
    .filter((a) => a.last_scanned_at)
    .map((a) => new Date(a.last_scanned_at!).getTime());
  if (scanned.length === 0) return "—";
  return timeAgo(new Date(Math.max(...scanned)).toISOString());
}
