export const PLANS = {
  starter: {
    name: "Starter",
    priceId: "price_1TOZXBC3MD5twcljcyC575Em",
    price: 5,
  },
  pro: {
    name: "Pro",
    priceId: "price_1TOZXCC3MD5twcljrzGZwH2O",
    price: 19,
    trial: true,
  },
  business: {
    name: "Business",
    priceId: "price_1TOZXCC3MD5twcljoZDwkJPs",
    price: 49,
  },
} as const;

export type PlanId = keyof typeof PLANS;
