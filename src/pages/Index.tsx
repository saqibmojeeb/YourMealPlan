import { useState } from 'react';
import { Recipe, UserPreferences } from '@/types/meal';
import { useMealPlan } from '@/hooks/useMealPlan';
import { Onboarding } from '@/components/onboarding/Onboarding';
import { WeeklyPlanner } from '@/components/WeeklyPlanner';
import { RecipeDetail } from '@/components/RecipeDetail';
import { GroceryList } from '@/components/GroceryList';
import { SettingsScreen } from '@/components/SettingsScreen';
import { SubscriptionPricing } from '@/components/SubscriptionPricing';
import { BottomNav } from '@/components/BottomNav';

type AppTab = 'planner' | 'grocery' | 'pricing' | 'settings';

const Index = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>('planner');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const { weekPlan, preferences, regeneratePlan, swapMeal, updatePreferences } = useMealPlan();

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    updatePreferences(prefs);
    regeneratePlan();
    setHasOnboarded(true);
  };

  const handleResetOnboarding = () => {
    setHasOnboarded(false);
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex flex-col h-screen bg-background safe-bottom">
      <main className="flex-1 overflow-hidden">
        {activeTab === 'planner' && (
          <WeeklyPlanner
            weekPlan={weekPlan}
            onSwapMeal={swapMeal}
            onSelectRecipe={setSelectedRecipe}
            onRegeneratePlan={regeneratePlan}
          />
        )}
        {activeTab === 'grocery' && (
          <GroceryList weekPlan={weekPlan} />
        )}
        {activeTab === 'pricing' && (
          <div className="flex-1 overflow-y-auto pt-6">
            <SubscriptionPricing />
          </div>
        )}
        {activeTab === 'settings' && (
          <SettingsScreen
            preferences={preferences}
            onResetOnboarding={handleResetOnboarding}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Index;
