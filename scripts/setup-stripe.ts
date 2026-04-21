import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS = [
  { name: "Starter", price: 500, description: "3 tracked advertisers, 4× daily scans, email digest" },
  { name: "Pro", price: 1900, description: "15 tracked advertisers, AI tagging, Slack alerts, weekly summary" },
  { name: "Business", price: 4900, description: "50 tracked advertisers, API access, webhooks, priority support" },
];

async function main() {
  for (const plan of PLANS) {
    const product = await stripe.products.create({
      name: `AdPeeker ${plan.name}`,
      description: plan.description,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: "usd",
      recurring: { interval: "month" },
    });

    console.log(`${plan.name}: product=${product.id} price=${price.id}`);
  }
}

main().catch(console.error);
