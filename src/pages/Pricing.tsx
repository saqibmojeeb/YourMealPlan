import { TopNav } from '@/components/TopNav';
import { SubscriptionPricing } from '@/components/SubscriptionPricing';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="pt-6 max-w-lg mx-auto">
        <SubscriptionPricing />
      </div>
    </div>
  );
};

export default Pricing;
