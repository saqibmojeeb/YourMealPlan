import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '@/lib/stripe';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Plan {
  tier: SubscriptionTier;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    tier: 'weekly',
    description: 'Try it out for a week',
    features: ['7-day meal plan', 'Basic grocery list', 'Email support'],
  },
  {
    tier: 'monthly',
    description: 'Best value for individuals',
    features: ['Weekly meal plans', 'Custom meal swaps', 'Grocery list', 'Nutritional info'],
    highlighted: true,
  },
  {
    tier: 'quarterly',
    description: 'Save more over 3 months',
    features: ['Everything in Monthly', 'Unlimited dietary filters', 'Priority support'],
  },
  {
    tier: 'yearly',
    description: 'Best deal — save over 60%',
    features: [
      'Everything in 3 Month',
      'AI meal suggestions',
      'Family planning (up to 6)',
      'Personal nutrition coach',
    ],
  },
];

export const SubscriptionPricing = () => {
  const { user, subscribed, subscriptionTier } = useAuth();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubscribe = async (tier: SubscriptionTier) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoadingTier(tier);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: SUBSCRIPTION_TIERS[tier].price_id },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to start checkout');
    } finally {
      setLoadingTier(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to open portal');
    }
  };

  return (
    <div className="px-4 pb-24">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Upgrade for smarter meal planning. Cancel anytime.
        </p>
        {subscribed && subscriptionTier && (
          <div className="mt-4">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1">
              Current plan: {SUBSCRIPTION_TIERS[subscriptionTier].name}
            </span>
            <button
              onClick={handleManageSubscription}
              className="block mx-auto mt-2 text-sm text-primary hover:underline font-medium"
            >
              Manage subscription
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {plans.map((plan) => {
          const config = SUBSCRIPTION_TIERS[plan.tier];
          const isCurrentPlan = subscriptionTier === plan.tier;

          return (
            <div
              key={plan.tier}
              className={cn(
                'rounded-2xl border-2 p-5 transition-all',
                isCurrentPlan
                  ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
                  : plan.highlighted
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-card'
              )}
            >
              {isCurrentPlan && (
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-foreground bg-primary rounded-full px-3 py-1 mb-3">
                  Your Plan
                </span>
              )}
              {!isCurrentPlan && plan.highlighted && (
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
                  Most Popular
                </span>
              )}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-foreground">{config.price}</span>
                <span className="text-muted-foreground text-sm">/{config.interval}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{config.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

              <ul className="space-y-2 mb-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {isCurrentPlan ? (
                <Button
                  className="w-full rounded-full"
                  variant="outline"
                  onClick={handleManageSubscription}
                >
                  Manage Plan
                </Button>
              ) : (
                <Button
                  className={cn(
                    'w-full rounded-full',
                    plan.highlighted && 'gradient-bg text-primary-foreground'
                  )}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.tier)}
                  disabled={loadingTier === plan.tier}
                >
                  {loadingTier === plan.tier ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Get {config.name}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
        All subscriptions auto-renew. Cancel anytime. Stripe test mode — no real charges.
      </p>
    </div>
  );
};
