import { TopNav } from '@/components/TopNav';
import { SampleMealPreview } from '@/components/SampleMealPreview';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Preview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCta = () => navigate('/plan');

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif font-bold text-foreground text-center mb-2">
          Weekly Meal Plan Preview
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          Browse our sample 7-day plan. Sign up to generate your own personalized plan.
        </p>
        <SampleMealPreview />
        <div className="text-center mt-10">
          <Button
            onClick={handleCta}
            size="lg"
            className="rounded-full gradient-bg text-primary-foreground px-8"
          >
            Generate My Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
