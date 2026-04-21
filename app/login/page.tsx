"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="font-mono text-xl font-semibold text-[var(--text)] no-underline inline-flex items-center gap-2">
            <span className="w-[26px] h-[26px] rounded-md bg-[var(--accent)] flex items-center justify-center text-[#062826] font-bold text-base font-mono">
              P
            </span>
            adpeeker
          </a>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
        >
          <h1 className="text-2xl font-semibold m-0 mb-2 tracking-tight">Welcome back</h1>
          <p className="text-[var(--text-2)] text-sm m-0 mb-8">Log in to your AdPeeker account.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-[var(--text-2)] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2.5 px-3 rounded-lg text-[var(--text)] text-sm font-[inherit] placeholder:text-[var(--text-3)] outline-none focus:border-[var(--accent)]"
                style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-2)] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-2.5 px-3 rounded-lg text-[var(--text)] text-sm font-[inherit] placeholder:text-[var(--text-3)] outline-none focus:border-[var(--accent)]"
                style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
                placeholder="Your password"
              />
            </div>

            {error && (
              <p className="text-[var(--danger)] text-sm m-0">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[var(--text-3)] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[var(--accent)] no-underline hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
