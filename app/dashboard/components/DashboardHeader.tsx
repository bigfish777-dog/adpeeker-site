"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardHeader({ email }: { email: string }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="border-b border-[var(--line)] px-6 py-3 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--text-2)]">{email}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-[var(--text-3)] hover:text-[var(--text)] bg-transparent border-none cursor-pointer font-[inherit]"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
