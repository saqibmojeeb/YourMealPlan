import { useState } from 'react';
import { Recipe, UserPreferences } from '@/types/meal';
import { useMealPlan } from '@/hooks/useMealPlan';
import { Onboarding } from '@/components/onboarding/Onboarding';
import { WeeklyPlanner } from '@/components/WeeklyPlanner';
import { RecipeDetail } from '@/components/RecipeDetail';
import { TopNav } from '@/components/TopNav';

const Plan = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { weekPlan, regeneratePlan, swapMeal, updatePreferences } = useMealPlan();

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    updatePreferences(prefs);
    regeneratePlan();
    setHasOnboarded(true);
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopNav />
      <main className="flex-1 overflow-hidden">
        <WeeklyPlanner
          weekPlan={weekPlan}
          onSwapMeal={swapMeal}
          onSelectRecipe={setSelectedRecipe}
          onRegeneratePlan={regeneratePlan}
        />
      </main>
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Plan;
