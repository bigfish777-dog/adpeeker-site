import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

const VALID_TAGS = [
  "UGC",
  "Social proof",
  "Discount-led",
  "Founder POV",
  "Problem-agitate",
  "Before / after",
  "Testimonial",
  "Product demo",
  "Listicle",
  "How-to",
  "Comparison",
  "Urgency",
  "Seasonal",
] as const;

/**
 * Tag an ad using Claude API based on its copy.
 * Falls back to heuristic tagging if ANTHROPIC_API_KEY is not set.
 */
async function generateTags(adCopy: string): Promise<string[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey && adCopy.length > 10) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 200,
          messages: [
            {
              role: "user",
              content: `Classify this ad copy into 1-3 of these creative angles. Return ONLY the matching tags as a JSON array of strings, nothing else.

Valid tags: ${VALID_TAGS.join(", ")}

Ad copy:
${adCopy.slice(0, 500)}`,
            },
          ],
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const text = json.content?.[0]?.text || "[]";
        const match = text.match(/\[[\s\S]*\]/);
        if (match) {
          const parsed = JSON.parse(match[0]) as string[];
          return parsed.filter((t) => VALID_TAGS.includes(t as (typeof VALID_TAGS)[number]));
        }
      }
    } catch (err) {
      console.error("Claude API tagging error:", err);
    }
  }

  // Heuristic fallback
  const tags: string[] = [];
  const lower = adCopy.toLowerCase();
  if (lower.includes("ugc") || lower.includes("creator") || lower.includes("real people")) tags.push("UGC");
  if (lower.includes("review") || lower.includes("★") || lower.includes("rated") || lower.includes("customers")) tags.push("Social proof");
  if (lower.includes("%") || lower.includes("off") || lower.includes("discount") || lower.includes("sale") || lower.includes("save")) tags.push("Discount-led");
  if (lower.includes("founded") || lower.includes("i started") || lower.includes("our story") || lower.includes("ceo")) tags.push("Founder POV");
  if (lower.includes("tired of") || lower.includes("struggling") || lower.includes("problem") || lower.includes("frustrated")) tags.push("Problem-agitate");
  if (lower.includes("before") && lower.includes("after")) tags.push("Before / after");
  if (lower.includes("testimonial") || lower.includes("changed my life") || lower.includes("love this")) tags.push("Testimonial");
  if (lower.includes("demo") || lower.includes("how it works") || lower.includes("watch")) tags.push("Product demo");

  // Default tag if nothing matched
  if (tags.length === 0) tags.push("Product demo");

  return tags.slice(0, 3);
}

/**
 * Tag all untagged ads in the database.
 */
export async function tagUntaggedAds() {
  const db = supabaseAdmin();

  const { data: ads, error } = await db
    .from("ads")
    .select("id, ad_copy")
    .eq("tags", "{}");

  if (error || !ads) {
    console.error("Failed to fetch untagged ads:", error);
    return { tagged: 0 };
  }

  let tagged = 0;
  for (const ad of ads) {
    if (!ad.ad_copy) continue;

    const tags = await generateTags(ad.ad_copy);
    await db.from("ads").update({ tags }).eq("id", ad.id);
    tagged++;
  }

  return { tagged };
}
