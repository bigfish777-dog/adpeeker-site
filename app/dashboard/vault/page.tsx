export default function VaultPage() {
  return (
    <div className="max-w-[900px]">
      <h1 className="text-2xl font-semibold m-0 mb-2 tracking-tight">Creative Vault</h1>
      <p className="text-[var(--text-2)] text-sm m-0 mb-8">
        Every ad we capture is archived here forever.
      </p>
      <div
        className="rounded-xl p-10 text-center"
        style={{ border: "1px dashed var(--line-strong)", background: "var(--bg-1)" }}
      >
        <p className="text-[var(--text-3)] text-sm m-0">
          Your vault will populate as we scan your tracked advertisers. Check back after the first scan completes.
        </p>
      </div>
    </div>
  );
}
