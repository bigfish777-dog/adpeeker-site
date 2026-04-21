import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const advertiserId = searchParams.get("advertiser_id");
  const type = searchParams.get("type");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  const status = searchParams.get("status");

  let query = supabase
    .from("ads")
    .select("*, advertisers(name)")
    .eq("user_id", user.id)
    .order("first_seen_at", { ascending: false })
    .limit(50);

  if (advertiserId) query = query.eq("advertiser_id", advertiserId);
  if (type) query = query.eq("type", type);
  if (status === "active") query = query.eq("status", "active");
  if (status === "paused") query = query.eq("status", "paused");
  if (tag) query = query.contains("tags", [tag]);
  if (search) query = query.ilike("ad_copy", `%${search}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
