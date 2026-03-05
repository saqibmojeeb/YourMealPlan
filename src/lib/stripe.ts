// Stripe product/price mappings
export const SUBSCRIPTION_TIERS = {
  starter: {
    name: 'Starter',
    price_id: 'price_1T7YDxBo9Oi9e7mrPJkASctC',
    product_id: 'prod_U5jhNscXgXiAIc',
    price: '₹199',
    priceAmount: 199,
  },
  pro: {
    name: 'Pro',
    price_id: 'price_1T7YDyBo9Oi9e7mrWfEU3rU5',
    product_id: 'prod_U5jh1NinfJ7QoR',
    price: '₹499',
    priceAmount: 499,
  },
  elite: {
    name: 'Elite',
    price_id: 'price_1T7YDyBo9Oi9e7mrih9eZSW4',
    product_id: 'prod_U5jhFaFumEk2Bq',
    price: '₹999',
    priceAmount: 999,
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export const getSubscriptionTierByProductId = (productId: string): SubscriptionTier | null => {
  for (const [tier, config] of Object.entries(SUBSCRIPTION_TIERS)) {
    if (config.product_id === productId) return tier as SubscriptionTier;
  }
  return null;
};
