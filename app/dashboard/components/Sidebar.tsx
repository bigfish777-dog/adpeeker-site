"use client";

import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Advertisers",
    href: "/dashboard/advertisers",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Creative Vault",
    href: "/dashboard/vault",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 15l5-5 4 4 4-6 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[220px] shrink-0 border-r border-[var(--line)] h-screen sticky top-0 flex flex-col"
      style={{ background: "var(--bg-1)" }}
    >
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[var(--line)]">
        <a href="/" className="font-mono text-[15px] font-semibold text-[var(--text)] no-underline flex items-center gap-2">
          <span className="w-[20px] h-[20px] rounded-md bg-[var(--accent)] flex items-center justify-center text-[#062826] font-bold text-xs font-mono">
            P
          </span>
          adpeeker
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline transition-colors"
              style={{
                color: isActive ? "var(--text)" : "var(--text-3)",
                background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
              }}
            >
              <span style={{ color: isActive ? "var(--accent)" : "var(--text-3)" }}>
                {item.icon}
              </span>
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
