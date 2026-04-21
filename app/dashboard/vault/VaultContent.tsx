"use client";

import { useEffect, useState, useCallback } from "react";

interface Ad {
  id: string;
  advertiser_id: string;
  type: "image" | "video" | "carousel";
  status: "active" | "paused" | "removed";
  ad_copy: string | null;
  landing_url: string | null;
  tags: string[];
  first_seen_at: string;
  last_seen_at: string;
  advertisers: { name: string } | null;
}

interface Advertiser {
  id: string;
  name: string;
}

const TAG_COLORS: Record<string, { color: string; border: string; bg: string }> = {
  "UGC":             { color: "#00E5C7", border: "rgba(0,229,199,0.3)", bg: "rgba(0,229,199,0.06)" },
  "Social proof":    { color: "#B4B4FF", border: "rgba(180,180,255,0.3)", bg: "rgba(180,180,255,0.06)" },
  "Discount-led":    { color: "#FFB4B4", border: "rgba(255,107,107,0.3)", bg: "rgba(255,107,107,0.06)" },
  "Founder POV":     { color: "#FFD166", border: "rgba(255,209,102,0.3)", bg: "rgba(255,209,102,0.06)" },
  "Problem-agitate": { color: "#FFD166", border: "rgba(255,209,102,0.3)", bg: "rgba(255,209,102,0.06)" },
  "Before / after":  { color: "#00E5C7", border: "rgba(0,229,199,0.3)", bg: "rgba(0,229,199,0.06)" },
  "Testimonial":     { color: "#B4B4FF", border: "rgba(180,180,255,0.3)", bg: "rgba(180,180,255,0.06)" },
  "Product demo":    { color: "#A6A6B0", border: "rgba(166,166,176,0.3)", bg: "rgba(166,166,176,0.06)" },
};

const DEFAULT_TAG_COLOR = { color: "#A6A6B0", border: "rgba(166,166,176,0.3)", bg: "rgba(166,166,176,0.06)" };

export default function VaultContent({ advertisers }: { advertisers: Advertiser[] }) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    advertiser_id: "",
    type: "",
    status: "",
    tag: "",
    search: "",
  });

  const fetchAds = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.advertiser_id) params.set("advertiser_id", filters.advertiser_id);
    if (filters.type) params.set("type", filters.type);
    if (filters.status) params.set("status", filters.status);
    if (filters.tag) params.set("tag", filters.tag);
    if (filters.search) params.set("search", filters.search);

    const res = await fetch(`/api/ads?${params}`);
    if (res.ok) {
      setAds(await res.json());
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return `hsl(${hash % 360}, 45%, 35%)`;
  }

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="max-w-[1100px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold m-0 mb-1 tracking-tight">Creative Vault</h1>
          <p className="text-[var(--text-2)] text-sm m-0">
            {ads.length} ad{ads.length !== 1 ? "s" : ""} archived
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className="rounded-xl mb-6 p-4 flex gap-2.5 flex-wrap items-center"
        style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
      >
        <select
          value={filters.advertiser_id}
          onChange={(e) => setFilters({ ...filters, advertiser_id: e.target.value })}
          className="font-mono text-xs py-1.5 px-3 rounded-[7px] text-[var(--text-2)] cursor-pointer appearance-none"
          style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
        >
          <option value="">All advertisers</option>
          {advertisers.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="font-mono text-xs py-1.5 px-3 rounded-[7px] text-[var(--text-2)] cursor-pointer appearance-none"
          style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
        >
          <option value="">All formats</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="carousel">Carousel</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="font-mono text-xs py-1.5 px-3 rounded-[7px] text-[var(--text-2)] cursor-pointer appearance-none"
          style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>

        <select
          value={filters.tag}
          onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          className="font-mono text-xs py-1.5 px-3 rounded-[7px] text-[var(--text-2)] cursor-pointer appearance-none"
          style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
        >
          <option value="">All tags</option>
          {Object.keys(TAG_COLORS).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search ad copy..."
          className="flex-1 min-w-[180px] py-1.5 px-3 rounded-[7px] text-[var(--text)] text-[13px] font-[inherit] placeholder:text-[var(--text-3)] outline-none"
          style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-[var(--text-3)] text-sm py-12 text-center">Loading...</div>
      ) : ads.length === 0 ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{ border: "1px dashed var(--line-strong)", background: "var(--bg-1)" }}
        >
          <p className="text-[var(--text-3)] text-sm m-0">
            {Object.values(filters).some(Boolean)
              ? "No ads match your filters."
              : "No ads archived yet. Add advertisers and run a scan to populate your vault."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ads.map((ad) => {
            const brandName = ad.advertisers?.name || "Unknown";
            const bgColor = stringToColor(brandName);

            return (
              <div
                key={ad.id}
                className="rounded-[10px] overflow-hidden cursor-pointer transition-all hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
                style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
              >
                {/* Thumbnail placeholder */}
                <div
                  className="aspect-[4/5] relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${bgColor}, ${bgColor}88)` }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 8px, transparent 8px 18px)" }}
                  />
                  <div className="absolute left-2.5 top-2.5 font-mono text-[9.5px] py-0.5 px-1.5 rounded text-white/80 tracking-wider uppercase" style={{ background: "rgba(0,0,0,0.55)" }}>
                    {ad.type}
                  </div>
                  {ad.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.2)" }}>
                      <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                          <path d="M3 2l7 4-7 4V2z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Ad copy preview */}
                  {ad.ad_copy && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 pt-8" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
                      <p className="text-white/90 text-[11px] leading-relaxed m-0 line-clamp-3">
                        {ad.ad_copy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="p-3">
                  <div className="flex items-center gap-1.5 text-[12.5px] text-[var(--text)] mb-2">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center font-mono font-semibold text-white"
                      style={{ fontSize: 8, background: bgColor }}
                    >
                      {brandName[0]}
                    </div>
                    <span>{brandName}</span>
                  </div>

                  {ad.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mb-2">
                      {ad.tags.map((tag) => {
                        const tc = TAG_COLORS[tag] || DEFAULT_TAG_COLOR;
                        return (
                          <span
                            key={tag}
                            className="font-mono text-[10px] py-0.5 px-1.5 rounded"
                            style={{ color: tc.color, border: `1px solid ${tc.border}`, background: tc.bg }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="font-mono text-[10.5px] text-[var(--text-3)] flex items-center gap-1.5">
                    <span
                      className="w-[5px] h-[5px] rounded-full"
                      style={{ background: ad.status === "active" ? "var(--accent)" : "var(--text-3)" }}
                    />
                    {ad.status === "active" ? `Active` : "Paused"} &middot; {timeAgo(ad.first_seen_at)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
