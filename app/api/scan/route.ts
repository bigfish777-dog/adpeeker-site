import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runFullScan } from "@/lib/scanner";

export const maxDuration = 60;

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runFullScan();
  return NextResponse.json(result);
}
