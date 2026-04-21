import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmailDigest, sendSlackNotification } from "@/lib/notifications";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { channel } = await request.json();

  const testData = {
    newAds: 12,
    pausedAds: 3,
    advertisers: [
      { name: "Glossier", newAds: 5, pausedAds: 1 },
      { name: "Rhode", newAds: 4, pausedAds: 2 },
      { name: "Allbirds", newAds: 3, pausedAds: 0 },
    ],
    topTags: ["UGC", "Discount-led", "Social proof"],
  };

  if (channel === "email" && user.email) {
    const result = await sendEmailDigest(user.email, testData);
    return NextResponse.json(result);
  }

  if (channel === "slack") {
    const slackUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackUrl) {
      return NextResponse.json({ error: "SLACK_WEBHOOK_URL not configured" }, { status: 400 });
    }
    const result = await sendSlackNotification(slackUrl, testData);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Invalid channel (email or slack)" }, { status: 400 });
}
