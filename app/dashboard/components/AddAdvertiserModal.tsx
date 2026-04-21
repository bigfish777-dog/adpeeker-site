"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddAdvertiserModal({ open, onClose, onAdded }: Props) {
  const [name, setName] = useState("");
  const [metaUrl, setMetaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/advertisers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, meta_url: metaUrl }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setName("");
    setMetaUrl("");
    setLoading(false);
    onAdded();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-[460px] mx-4 rounded-2xl p-8"
        style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
      >
        <h2 className="text-xl font-semibold m-0 mb-2 tracking-tight">Track a competitor</h2>
        <p className="text-[var(--text-2)] text-sm m-0 mb-6">
          Paste the advertiser&apos;s Meta Ad Library URL. We&apos;ll start scanning within the hour.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[var(--text-2)] mb-1.5">Advertiser name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full py-2.5 px-3 rounded-lg text-[var(--text)] text-sm font-[inherit] placeholder:text-[var(--text-3)] outline-none focus:border-[var(--accent)]"
              style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
              placeholder="e.g. Glossier"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-2)] mb-1.5">Meta Ad Library URL</label>
            <input
              type="url"
              value={metaUrl}
              onChange={(e) => setMetaUrl(e.target.value)}
              required
              className="w-full py-2.5 px-3 rounded-lg text-[var(--text)] text-sm font-[inherit] placeholder:text-[var(--text-3)] outline-none focus:border-[var(--accent)]"
              style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
              placeholder="https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&view_all_page_id=..."
            />
          </div>

          {error && <p className="text-[var(--danger)] text-sm m-0">{error}</p>}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Start tracking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
