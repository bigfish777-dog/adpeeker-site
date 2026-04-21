import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

interface ScrapedAd {
  meta_ad_id: string;
  type: "image" | "video" | "carousel";
  status: "active" | "paused" | "removed";
  ad_copy?: string;
  landing_url?: string;
  thumbnail_url?: string;
  media_url?: string;
}

/**
 * Extract page ID from a Meta Ad Library URL.
 * Supports formats like:
 *   https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&view_all_page_id=123456
 *   https://www.facebook.com/ads/library/?view_all_page_id=123456
 */
function extractPageId(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get("view_all_page_id");
  } catch {
    return null;
  }
}

/**
 * Fetch ads from the Meta Ad Library API.
 *
 * To use the real API, you need:
 *   1. A Facebook App with "ads_read" permission
 *   2. A long-lived access token
 *   3. Set META_ACCESS_TOKEN in your env
 *
 * API docs: https://www.facebook.com/ads/library/api/
 *
 * For now, this returns mock data so the full pipeline works end-to-end.
 * Replace the body of this function with real API calls when ready.
 */
async function fetchAdsFromMeta(pageId: string): Promise<ScrapedAd[]> {
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (accessToken) {
    // --- REAL API CALL ---
    const url = new URL("https://graph.facebook.com/v21.0/ads_archive");
    url.searchParams.set("access_token", accessToken);
    url.searchParams.set("ad_reached_countries", "US");
    url.searchParams.set("search_page_ids", pageId);
    url.searchParams.set("ad_type", "ALL");
    url.searchParams.set(
      "fields",
      "id,ad_creative_bodies,ad_creative_link_captions,ad_creative_link_titles,ad_snapshot_url,byline,page_name"
    );
    url.searchParams.set("limit", "50");

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`Meta API error: ${res.status} ${await res.text()}`);
      return [];
    }

    const json = await res.json();
    return (json.data || []).map((ad: Record<string, unknown>) => ({
      meta_ad_id: ad.id as string,
      type: "image" as const,
      status: "active" as const,
      ad_copy: Array.isArray(ad.ad_creative_bodies)
        ? (ad.ad_creative_bodies as string[])[0]
        : undefined,
      landing_url: ad.ad_snapshot_url as string | undefined,
    }));
  }

  // --- MOCK DATA (remove when META_ACCESS_TOKEN is set) ---
  const mockCount = 2 + Math.floor(Math.random() * 4);
  return Array.from({ length: mockCount }, (_, i) => ({
    meta_ad_id: `${pageId}_mock_${Date.now()}_${i}`,
    type: (["image", "video", "carousel"] as const)[i % 3],
    status: Math.random() > 0.2 ? ("active" as const) : ("paused" as const),
    ad_copy: `Sample ad copy for ad ${i + 1}. This is placeholder text that will be replaced with real ad copy once the Meta API is connected.`,
    landing_url: `https://example.com/lp/${i + 1}`,
  }));
}

/**
 * Scan a single advertiser: fetch their ads and upsert into the database.
 */
async function scanAdvertiser(advertiser: {
  id: string;
  user_id: string;
  meta_url: string;
  meta_page_id: string | null;
}) {
  const db = supabaseAdmin();

  // Extract page ID if not already stored
  let pageId = advertiser.meta_page_id;
  if (!pageId) {
    pageId = extractPageId(advertiser.meta_url);
    if (pageId) {
      await db
        .from("advertisers")
        .update({ meta_page_id: pageId })
        .eq("id", advertiser.id);
    }
  }

  // Use a fallback ID for mock data if URL doesn't contain a page ID
  const lookupId = pageId || advertiser.id;

  const ads = await fetchAdsFromMeta(lookupId);

  // Upsert ads
  for (const ad of ads) {
    const { data: existing } = await db
      .from("ads")
      .select("id")
      .eq("meta_ad_id", ad.meta_ad_id)
      .eq("advertiser_id", advertiser.id)
      .single();

    if (existing) {
      // Update existing ad
      await db
        .from("ads")
        .update({
          status: ad.status,
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      // Insert new ad
      await db.from("ads").insert({
        advertiser_id: advertiser.id,
        user_id: advertiser.user_id,
        meta_ad_id: ad.meta_ad_id,
        type: ad.type,
        status: ad.status,
        ad_copy: ad.ad_copy,
        landing_url: ad.landing_url,
        thumbnail_url: ad.thumbnail_url,
        media_url: ad.media_url,
        tags: [],
      });
    }
  }

  // Update advertiser stats
  const { count } = await db
    .from("ads")
    .select("*", { count: "exact", head: true })
    .eq("advertiser_id", advertiser.id);

  await db
    .from("advertisers")
    .update({
      ad_count: count || 0,
      last_scanned_at: new Date().toISOString(),
    })
    .eq("id", advertiser.id);

  return { advertiser: advertiser.id, adsFound: ads.length };
}

/**
 * Run a full scan across all active advertisers.
 */
export async function runFullScan() {
  const db = supabaseAdmin();

  const { data: advertisers, error } = await db
    .from("advertisers")
    .select("id, user_id, meta_url, meta_page_id")
    .eq("status", "active");

  if (error || !advertisers) {
    console.error("Failed to fetch advertisers:", error);
    return { success: false, error: error?.message };
  }

  const results = [];
  for (const adv of advertisers) {
    try {
      const result = await scanAdvertiser(adv);
      results.push(result);
    } catch (err) {
      console.error(`Error scanning ${adv.id}:`, err);
      results.push({ advertiser: adv.id, error: String(err) });
    }
  }

  return {
    success: true,
    scanned: advertisers.length,
    results,
    timestamp: new Date().toISOString(),
  };
}
