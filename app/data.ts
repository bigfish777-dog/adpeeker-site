export interface Brand {
  name: string;
  bg: string;
  letter: string;
}

export const BRANDS: Brand[] = [
  { name: "Rhode",          bg: "#C9A27E", letter: "R" },
  { name: "Patagonia",      bg: "#2E5E3E", letter: "P" },
  { name: "Gymshark",       bg: "#1A1A1A", letter: "G" },
  { name: "Allbirds",       bg: "#7FA97C", letter: "A" },
  { name: "Glossier",       bg: "#F7C6BC", letter: "G" },
  { name: "Liquid Death",   bg: "#0E0E0E", letter: "L" },
  { name: "Fenty",          bg: "#B81E3E", letter: "F" },
  { name: "Oatly",          bg: "#FFEBCC", letter: "O" },
  { name: "On Running",     bg: "#E85A2B", letter: "O" },
  { name: "Chubbies",       bg: "#F0B93B", letter: "C" },
  { name: "Ridge Wallet",   bg: "#3C3C3C", letter: "R" },
  { name: "Snowe",          bg: "#D4DDE3", letter: "S" },
  { name: "Brooklinen",     bg: "#5B7D8C", letter: "B" },
  { name: "Olipop",         bg: "#E87F5A", letter: "O" },
  { name: "Magic Spoon",    bg: "#9B5CF0", letter: "M" },
  { name: "Cometeer",       bg: "#1F3D5B", letter: "C" },
  { name: "Haus",           bg: "#B8926B", letter: "H" },
  { name: "Kosas",          bg: "#F5D5C4", letter: "K" },
  { name: "Tracksmith",     bg: "#3D2B1F", letter: "T" },
  { name: "Warby Parker",   bg: "#2A4A5E", letter: "W" },
];

export const FEED_ROWS = [
  { brand: BRANDS[0],  action: "new landing page detected", cls: "new" as const,  sym: "▲", time: "2m ago" },
  { brand: BRANDS[1],  action: "28 new ads",                cls: "up" as const,    sym: "▲", time: "7m ago" },
  { brand: BRANDS[2],  action: "paused 14 ads",             cls: "down" as const,  sym: "✕", time: "12m ago" },
  { brand: BRANDS[3],  action: "19 new ads",                cls: "up" as const,    sym: "▲", time: "18m ago" },
  { brand: BRANDS[13], action: "new creative angle (UGC)",  cls: "new" as const,   sym: "◆", time: "24m ago" },
  { brand: BRANDS[14], action: "6 new ads",                 cls: "up" as const,    sym: "▲", time: "31m ago" },
];

export const FAQS = [
  { q: "What platforms does AdPeeker support?", a: "Today: Meta (Facebook + Instagram) via the Meta Ad Library. On the roadmap: TikTok Creative Center, LinkedIn Ad Library, Google Ads Transparency Center. Subscribers get new platforms as they launch." },
  { q: "How quickly do you detect new ads?", a: "We scan every tracked advertiser four times per day. New launches, paused creatives, and landing page changes typically show up in your vault within a few hours of going live." },
  { q: "What happens if an advertiser deletes their ad?", a: "If we've archived it, it stays in your vault forever — full-res video, images, copy, and landing URLs. The advertiser can't un-ring that bell." },
  { q: "Can I export ads and data?", a: "Yes. CSV export on all plans. Direct video and image downloads. API access on Business." },
  { q: "Is this legal?", a: "AdPeeker uses the publicly available Meta Ad Library, which Meta operates for advertising transparency. We only store and organize information that's already public." },
  { q: "Do I need a credit card for the trial?", a: "No. The 7-day Pro trial doesn't require a card. We'll only ask when the trial ends and you decide to continue." },
  { q: "Can I cancel anytime?", a: "Yes. Monthly billing, two-click cancel, no retention calls." },
];

export const VAULT_ITEMS = [
  { brand: BRANDS[8],  tags: [{ l: "UGC", c: "c1" }], status: "Running 41 days", live: true,  type: "video" as const, bg: "linear-gradient(135deg, #E85A2B, #7A2810)" },
  { brand: BRANDS[4],  tags: [{ l: "Social proof", c: "c4" }, { l: "UGC", c: "c1" }], status: "Running 12 days", live: true, type: "image" as const, bg: "linear-gradient(135deg, #F7C6BC, #C07F77)" },
  { brand: BRANDS[5],  tags: [{ l: "Founder POV", c: "c3" }], status: "Paused yesterday", live: false, type: "video" as const, bg: "linear-gradient(135deg, #0E0E0E, #2A2A2A)" },
  { brand: BRANDS[13], tags: [{ l: "Discount", c: "c2" }, { l: "UGC", c: "c1" }], status: "Running 6 days", live: true, type: "image" as const, bg: "linear-gradient(135deg, #E87F5A, #A0452D)" },
  { brand: BRANDS[1],  tags: [{ l: "Problem-agitate", c: "c3" }], status: "Running 89 days", live: true, type: "video" as const, bg: "linear-gradient(135deg, #2E5E3E, #133322)" },
  { brand: BRANDS[14], tags: [{ l: "UGC", c: "c1" }, { l: "Discount", c: "c2" }], status: "Running 3 days", live: true, type: "image" as const, bg: "linear-gradient(135deg, #9B5CF0, #4A2478)" },
  { brand: BRANDS[9],  tags: [{ l: "Social proof", c: "c4" }], status: "Paused 2d ago", live: false, type: "video" as const, bg: "linear-gradient(135deg, #F0B93B, #8A6815)" },
  { brand: BRANDS[19], tags: [{ l: "Founder POV", c: "c3" }], status: "Running 23 days", live: true, type: "image" as const, bg: "linear-gradient(135deg, #2A4A5E, #122732)" },
];

export function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 170;
}
