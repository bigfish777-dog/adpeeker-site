import { NextResponse } from "next/server";
import { runFullScan } from "@/lib/scanner";

export const maxDuration = 60;

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron or has the correct secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runFullScan();
  return NextResponse.json(result);
}
