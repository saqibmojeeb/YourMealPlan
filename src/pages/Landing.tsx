import { useNavigate } from 'react-router-dom';
import { YourMealPlanLogo } from '@/components/NomNomLogo';
import { Button } from '@/components/ui/button';
import { SampleMealPreview } from '@/components/SampleMealPreview';
import { TopNav } from '@/components/TopNav';
import { useAuth } from '@/contexts/AuthContext';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartPlan = () => {
    navigate('/plan');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      {/* Hero */}
      <section className="px-4 pt-12 pb-8 text-center max-w-2xl mx-auto">
        <YourMealPlanLogo size="lg" showTagline layout="stacked" />
        <p className="text-muted-foreground mt-4 text-base leading-relaxed max-w-md mx-auto">
          Discover delicious, balanced meals for every day of the week. Preview our sample plan below — no sign-up needed.
        </p>
        <Button
          onClick={handleStartPlan}
          size="lg"
          className="mt-6 rounded-full gradient-bg text-primary-foreground px-8 text-base font-semibold"
        >
          Start My Plan
        </Button>
      </section>

      {/* Sample Weekly Meal Preview */}
      <section className="px-4 pb-12 max-w-5xl mx-auto">
        <h2 className="text-xl font-serif font-bold text-foreground text-center mb-6">
          Sample 7-Day Meal Plan
        </h2>
        <SampleMealPreview />
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 text-center">
        <Button
          onClick={handleStartPlan}
          size="lg"
          className="rounded-full gradient-bg text-primary-foreground px-8 text-base font-semibold"
        >
          Start My Plan
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Free to preview. Subscribe to unlock personalized plans.
        </p>
      </section>
    </div>
  );
};

export default Landing;
