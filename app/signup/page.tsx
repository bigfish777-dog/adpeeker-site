"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
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
          {success ? (
            <>
              <h1 className="text-2xl font-semibold m-0 mb-2 tracking-tight">Check your email</h1>
              <p className="text-[var(--text-2)] text-sm m-0">
                We sent a confirmation link to <strong className="text-[var(--text)]">{email}</strong>. Click the link to activate your account.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold m-0 mb-2 tracking-tight">Start your free trial</h1>
              <p className="text-[var(--text-2)] text-sm m-0 mb-8">7 days free. No credit card required.</p>

              <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
                    minLength={6}
                    className="w-full py-2.5 px-3 rounded-lg text-[var(--text)] text-sm font-[inherit] placeholder:text-[var(--text-3)] outline-none focus:border-[var(--accent)]"
                    style={{ background: "var(--bg-2)", border: "1px solid var(--line)" }}
                    placeholder="At least 6 characters"
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
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>
            </>
          )}
        </div>

        {!success && (
          <p className="text-center text-sm text-[var(--text-3)] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--accent)] no-underline hover:underline">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
