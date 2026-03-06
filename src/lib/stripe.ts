// Stripe product/price mappings — test mode
export const SUBSCRIPTION_TIERS = {
  weekly: {
    name: 'Weekly',
    price_id: 'price_weekly_test',
    product_id: 'prod_weekly_test',
    price: '₹9',
    priceAmount: 9,
    interval: 'week',
  },
  monthly: {
    name: 'Monthly',
    price_id: 'price_monthly_test',
    product_id: 'prod_monthly_test',
    price: '₹14',
    priceAmount: 14,
    interval: 'month',
  },
  quarterly: {
    name: '3 Month',
    price_id: 'price_quarterly_test',
    product_id: 'prod_quarterly_test',
    price: '₹29',
    priceAmount: 29,
    interval: '3 months',
  },
  yearly: {
    name: 'Yearly',
    price_id: 'price_yearly_test',
    product_id: 'prod_yearly_test',
    price: '₹89',
    priceAmount: 89,
    interval: 'year',
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export const getSubscriptionTierByProductId = (productId: string): SubscriptionTier | null => {
  for (const [tier, config] of Object.entries(SUBSCRIPTION_TIERS)) {
    if (config.product_id === productId) return tier as SubscriptionTier;
  }
  return null;
};
