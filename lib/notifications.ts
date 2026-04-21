import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

// ─── Email via Resend ───

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

interface DigestData {
  newAds: number;
  pausedAds: number;
  advertisers: { name: string; newAds: number; pausedAds: number }[];
  topTags: string[];
}

function buildDigestHtml(data: DigestData): string {
  const advRows = data.advertisers
    .filter((a) => a.newAds > 0 || a.pausedAds > 0)
    .map(
      (a) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #1C1C26;color:#EDEDF0;font-size:14px;">${a.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1C1C26;color:#00E5C7;font-size:14px;font-family:monospace;">+${a.newAds}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1C1C26;color:#FF6B6B;font-size:14px;font-family:monospace;">${a.pausedAds > 0 ? `-${a.pausedAds}` : "—"}</td>
        </tr>`
    )
    .join("");

  const tagChips = data.topTags
    .map(
      (t) =>
        `<span style="display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;font-family:monospace;border:1px solid rgba(0,229,199,0.3);color:#00E5C7;background:rgba(0,229,199,0.06);margin:2px 4px 2px 0;">${t}</span>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0A0A0B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="margin-bottom:32px;">
      <span style="display:inline-flex;align-items:center;gap:8px;font-family:monospace;font-size:17px;font-weight:600;color:#EDEDF0;">
        <span style="display:inline-block;width:22px;height:22px;border-radius:6px;background:#00E5C7;text-align:center;line-height:22px;color:#062826;font-size:14px;font-weight:700;">P</span>
        adpeeker
      </span>
    </div>

    <h1 style="font-size:24px;font-weight:600;color:#EDEDF0;margin:0 0 8px;letter-spacing:-0.02em;">Your daily digest</h1>
    <p style="color:#A6A6B0;font-size:15px;margin:0 0 28px;">Here's what changed across your tracked advertisers.</p>

    <div style="display:flex;gap:12px;margin-bottom:28px;">
      <div style="flex:1;background:#101014;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;">
        <div style="font-family:monospace;font-size:11px;color:#6B6B77;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">New ads</div>
        <div style="font-size:28px;font-weight:600;color:#00E5C7;">${data.newAds}</div>
      </div>
      <div style="flex:1;background:#101014;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;">
        <div style="font-family:monospace;font-size:11px;color:#6B6B77;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Paused</div>
        <div style="font-size:28px;font-weight:600;color:#FF6B6B;">${data.pausedAds}</div>
      </div>
    </div>

    ${advRows ? `
    <table style="width:100%;border-collapse:collapse;background:#101014;border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;margin-bottom:24px;">
      <thead>
        <tr style="background:#15151C;">
          <th style="padding:10px 12px;text-align:left;font-family:monospace;font-size:11px;color:#6B6B77;text-transform:uppercase;letter-spacing:0.1em;">Advertiser</th>
          <th style="padding:10px 12px;text-align:left;font-family:monospace;font-size:11px;color:#6B6B77;text-transform:uppercase;letter-spacing:0.1em;">New</th>
          <th style="padding:10px 12px;text-align:left;font-family:monospace;font-size:11px;color:#6B6B77;text-transform:uppercase;letter-spacing:0.1em;">Paused</th>
        </tr>
      </thead>
      <tbody>${advRows}</tbody>
    </table>
    ` : ""}

    ${tagChips ? `
    <div style="margin-bottom:28px;">
      <div style="font-family:monospace;font-size:11px;color:#6B6B77;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">Trending tags</div>
      ${tagChips}
    </div>
    ` : ""}

    <div style="text-align:center;margin-top:32px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://adpeeker.com"}/dashboard/vault" style="display:inline-block;padding:12px 24px;background:#00E5C7;color:#062826;font-weight:500;font-size:14px;border-radius:8px;text-decoration:none;">View in vault &rarr;</a>
    </div>

    <div style="margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);">
      <p style="font-size:12px;color:#6B6B77;margin:0;font-family:monospace;">AdPeeker &middot; Competitor ad intelligence</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendEmailDigest(userEmail: string, data: DigestData) {
  const resend = getResend();
  if (!resend) {
    console.log(`[Email] Would send digest to ${userEmail} (RESEND_API_KEY not set)`);
    return { sent: false, reason: "no_api_key" };
  }

  const { error } = await resend.emails.send({
    from: "AdPeeker <digest@adpeeker.com>",
    to: userEmail,
    subject: `AdPeeker: ${data.newAds} new ads, ${data.pausedAds} paused — Daily Digest`,
    html: buildDigestHtml(data),
  });

  if (error) {
    console.error(`[Email] Failed to send to ${userEmail}:`, error);
    return { sent: false, reason: error.message };
  }

  return { sent: true };
}

// ─── Slack webhook ───

export async function sendSlackNotification(webhookUrl: string, data: DigestData) {
  const advSummary = data.advertisers
    .filter((a) => a.newAds > 0 || a.pausedAds > 0)
    .map((a) => `• *${a.name}*: +${a.newAds} new${a.pausedAds > 0 ? `, -${a.pausedAds} paused` : ""}`)
    .join("\n");

  const payload = {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `AdPeeker: ${data.newAds} new ads detected`, emoji: true },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*New ads:* ${data.newAds}  |  *Paused:* ${data.pausedAds}\n\n${advSummary}`,
        },
      },
      ...(data.topTags.length > 0
        ? [
            {
              type: "context",
              elements: [
                { type: "mrkdwn", text: `*Top tags:* ${data.topTags.join(", ")}` },
              ],
            },
          ]
        : []),
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Open Vault" },
            url: `${process.env.NEXT_PUBLIC_APP_URL || "https://adpeeker.com"}/dashboard/vault`,
          },
        ],
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return { sent: res.ok };
}

// ─── Digest runner ───

export async function runDailyDigest() {
  const db = supabaseAdmin();

  // Get all users with active subscriptions
  const { data: subs } = await db
    .from("subscriptions")
    .select("user_id")
    .in("status", ["active", "trialing"]);

  if (!subs || subs.length === 0) {
    return { sent: 0, reason: "no_active_subscribers" };
  }

  const results = [];

  for (const sub of subs) {
    // Get user email
    const { data: userData } = await db.auth.admin.getUserById(sub.user_id);
    if (!userData?.user?.email) continue;

    // Get advertiser stats for last 24h
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: advertisers } = await db
      .from("advertisers")
      .select("id, name")
      .eq("user_id", sub.user_id)
      .eq("status", "active");

    if (!advertisers || advertisers.length === 0) continue;

    const advStats = [];
    let totalNew = 0;
    let totalPaused = 0;
    const allTags: string[] = [];

    for (const adv of advertisers) {
      const { count: newCount } = await db
        .from("ads")
        .select("*", { count: "exact", head: true })
        .eq("advertiser_id", adv.id)
        .gte("first_seen_at", since);

      const { count: pausedCount } = await db
        .from("ads")
        .select("*", { count: "exact", head: true })
        .eq("advertiser_id", adv.id)
        .eq("status", "paused")
        .gte("last_seen_at", since);

      const { data: recentAds } = await db
        .from("ads")
        .select("tags")
        .eq("advertiser_id", adv.id)
        .gte("first_seen_at", since);

      if (recentAds) {
        recentAds.forEach((a) => allTags.push(...(a.tags || [])));
      }

      const n = newCount || 0;
      const p = pausedCount || 0;
      totalNew += n;
      totalPaused += p;
      advStats.push({ name: adv.name, newAds: n, pausedAds: p });
    }

    // No activity? Skip
    if (totalNew === 0 && totalPaused === 0) continue;

    // Top tags by frequency
    const tagCounts: Record<string, number> = {};
    allTags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
    const topTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag]) => tag);

    const digestData: DigestData = {
      newAds: totalNew,
      pausedAds: totalPaused,
      advertisers: advStats,
      topTags,
    };

    // Send email
    const emailResult = await sendEmailDigest(userData.user.email, digestData);
    results.push({ user: userData.user.email, email: emailResult });

    // Send Slack if configured (would need a user settings table)
    // For now, check env var for a global Slack webhook
    const slackUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackUrl) {
      const slackResult = await sendSlackNotification(slackUrl, digestData);
      results.push({ user: userData.user.email, slack: slackResult });
    }
  }

  return { sent: results.length, results };
}
