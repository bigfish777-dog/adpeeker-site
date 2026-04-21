"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function DashboardContent({ user }: { user: User }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Top bar */}
      <header
        className="border-b border-[var(--line)] px-6 py-3.5 flex items-center justify-between"
        style={{ background: "var(--bg-1)" }}
      >
        <a href="/" className="font-mono text-[17px] font-semibold text-[var(--text)] no-underline flex items-center gap-2">
          <span className="w-[22px] h-[22px] rounded-md bg-[var(--accent)] flex items-center justify-center text-[#062826] font-bold text-sm font-mono">
            P
          </span>
          adpeeker
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--text-2)]">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-[var(--text-3)] hover:text-[var(--text)] bg-transparent border-none cursor-pointer font-[inherit]"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Dashboard body */}
      <div className="max-w-[1000px] mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold m-0 mb-2 tracking-tight">Dashboard</h1>
        <p className="text-[var(--text-2)] text-base m-0 mb-12">
          Welcome to AdPeeker. Start tracking your first competitor.
        </p>

        {/* Empty state */}
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
          <button className="btn btn-primary">
            Track an advertiser &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
