import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '₹199',
    description: 'Perfect to get started',
    features: [
      'Weekly meal plans',
      'Basic grocery list',
      'Up to 2 dietary filters',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '₹499',
    description: 'Most popular for busy pros',
    features: [
      'Everything in Starter',
      'Unlimited dietary filters',
      'Custom meal swaps',
      'Nutritional breakdown',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '₹999',
    description: 'For serious health goals',
    features: [
      'Everything in Pro',
      'AI-powered meal suggestions',
      'Family meal planning (up to 6)',
      'Grocery delivery integration',
      'Personal nutrition coach',
      '1-on-1 onboarding call',
    ],
  },
];

export const SubscriptionPricing = () => {
  return (
    <div className="px-4 pb-24">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Upgrade for smarter meal planning. Cancel anytime.
        </p>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'rounded-2xl border-2 p-5 transition-all',
              plan.highlighted
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border bg-card'
            )}
          >
            {plan.highlighted && (
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
                Most Popular
              </span>
            )}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

            <ul className="space-y-2 mb-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className={cn(
                'w-full rounded-full',
                plan.highlighted
                  ? 'gradient-bg text-primary-foreground'
                  : 'variant-outline'
              )}
              variant={plan.highlighted ? 'default' : 'outline'}
            >
              Subscribe to {plan.name}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
        All subscriptions auto-renew monthly. You can cancel anytime from your account settings. No hidden fees.
      </p>
    </div>
  );
};
