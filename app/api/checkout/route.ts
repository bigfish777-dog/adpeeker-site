import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PLANS, type PlanId } from "@/lib/stripe-plans";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { planId } = await request.json();

  if (!planId || !(planId in PLANS)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const plan = PLANS[planId as PlanId];

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    metadata: {
      user_id: user.id,
      plan: planId,
    },
    line_items: [{ price: plan.priceId, quantity: 1 }],
    mode: "subscription",
    subscription_data: {
      trial_period_days: "trial" in plan && plan.trial ? 7 : undefined,
      metadata: {
        user_id: user.id,
        plan: planId,
      },
    },
    success_url: `${request.headers.get("origin")}/dashboard?checkout=success`,
    cancel_url: `${request.headers.get("origin")}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}
