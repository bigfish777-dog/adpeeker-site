"use client";

import { useState } from "react";

export default function SettingsContent() {
  const [testingEmail, setTestingEmail] = useState(false);
  const [testingSlack, setTestingSlack] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function testNotification(channel: "email" | "slack") {
    if (channel === "email") setTestingEmail(true);
    else setTestingSlack(true);
    setResult(null);

    const res = await fetch("/api/notifications/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel }),
    });

    const data = await res.json();
    setResult(
      data.sent
        ? `${channel === "email" ? "Email" : "Slack"} test sent successfully!`
        : `Failed: ${data.reason || data.error || "Unknown error"}`
    );

    setTestingEmail(false);
    setTestingSlack(false);
  }

  return (
    <div className="max-w-[600px]">
      <h1 className="text-2xl font-semibold m-0 mb-2 tracking-tight">Settings</h1>
      <p className="text-[var(--text-2)] text-sm m-0 mb-8">
        Manage your notifications and integrations.
      </p>

      {/* Email notifications */}
      <div
        className="rounded-xl p-6 mb-4"
        style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold m-0 mb-1">Email digest</h3>
            <p className="text-[var(--text-2)] text-sm m-0">
              Daily summary of new and paused ads across your tracked advertisers. Sent at 2:00 PM UTC.
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md shrink-0"
            style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
          >
            Active
          </div>
        </div>
        <button
          onClick={() => testNotification("email")}
          disabled={testingEmail}
          className="btn btn-ghost disabled:opacity-50"
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          {testingEmail ? "Sending..." : "Send test email"}
        </button>
      </div>

      {/* Slack */}
      <div
        className="rounded-xl p-6 mb-4"
        style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold m-0 mb-1">Slack notifications</h3>
            <p className="text-[var(--text-2)] text-sm m-0">
              Get pinged in a Slack channel when we detect new ads or significant changes.
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md shrink-0"
            style={{ background: "rgba(255,255,255,0.04)", color: "var(--text-3)" }}
          >
            {process.env.NEXT_PUBLIC_SLACK_CONFIGURED === "true" ? "Connected" : "Not connected"}
          </div>
        </div>
        <p className="text-[var(--text-3)] text-xs m-0 mb-3 font-mono">
          Add SLACK_WEBHOOK_URL to your environment variables to enable.
        </p>
        <button
          onClick={() => testNotification("slack")}
          disabled={testingSlack}
          className="btn btn-ghost disabled:opacity-50"
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          {testingSlack ? "Sending..." : "Send test Slack message"}
        </button>
      </div>

      {/* Webhooks */}
      <div
        className="rounded-xl p-6 mb-4"
        style={{ background: "var(--bg-1)", border: "1px solid var(--line)" }}
      >
        <h3 className="text-base font-semibold m-0 mb-1">Webhooks</h3>
        <p className="text-[var(--text-2)] text-sm m-0 mb-3">
          Push ad events to your own stack via HTTP webhooks.
        </p>
        <div
          className="rounded-lg p-4 text-center"
          style={{ border: "1px dashed var(--line-strong)" }}
        >
          <p className="text-[var(--text-3)] text-xs m-0 font-mono">
            Coming soon on Business plan
          </p>
        </div>
      </div>

      {result && (
        <div
          className="rounded-lg p-3 mt-4 font-mono text-sm"
          style={{
            background: result.includes("success") ? "var(--accent-dim)" : "rgba(255,107,107,0.1)",
            color: result.includes("success") ? "var(--accent)" : "var(--danger)",
            border: `1px solid ${result.includes("success") ? "rgba(0,229,199,0.3)" : "rgba(255,107,107,0.3)"}`,
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}
