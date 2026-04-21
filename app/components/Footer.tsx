export default function Footer() {
  return (
    <footer className="py-10 border-t border-[var(--line)] text-[var(--text-3)]">
      <div className="container flex justify-between items-center gap-6 flex-wrap">
        <div className="flex items-center gap-4 font-mono text-[12.5px]">
          <a href="#top" className="font-mono text-[15px] font-semibold text-[var(--text)] no-underline flex items-center gap-2">
            <span
              className="flex items-center justify-center rounded-md bg-[var(--accent)] text-[#062826] font-bold font-mono"
              style={{ width: 18, height: 18, fontSize: 11 }}
            >
              P
            </span>
            adpeeker
          </a>
          <span>&copy; 2026 AdPeeker. All rights reserved.</span>
        </div>
        <div className="flex gap-5.5 flex-wrap">
          {[
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Contact", href: "#" },
          ].map((link) => (
            <a key={link.label} href={link.href} className="text-[var(--text-3)] text-[13px] no-underline hover:text-[var(--text-2)]">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
