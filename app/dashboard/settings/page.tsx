export default function SettingsPage() {
  return (
    <div className="max-w-[600px]">
      <h1 className="text-2xl font-semibold m-0 mb-2 tracking-tight">Settings</h1>
      <p className="text-[var(--text-2)] text-sm m-0 mb-8">
        Manage your account and notification preferences.
      </p>
      <div
        className="rounded-xl p-10 text-center"
        style={{ border: "1px dashed var(--line-strong)", background: "var(--bg-1)" }}
      >
        <p className="text-[var(--text-3)] text-sm m-0">
          Settings page coming soon. Email digest preferences, Slack integration, and API keys will live here.
        </p>
      </div>
    </div>
  );
}
