import { useState } from 'react';
import { Recipe, UserPreferences } from '@/types/meal';
import { useMealPlan } from '@/hooks/useMealPlan';
import { Onboarding } from '@/components/onboarding/Onboarding';
import { WeeklyPlanner } from '@/components/WeeklyPlanner';
import { RecipeDetail } from '@/components/RecipeDetail';
import { GroceryList } from '@/components/GroceryList';
import { SettingsScreen } from '@/components/SettingsScreen';
import { BottomNav } from '@/components/BottomNav';

type AppTab = 'planner' | 'grocery' | 'settings';

const Index = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>('planner');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const { weekPlan, preferences, regeneratePlan, swapMeal, updatePreferences } = useMealPlan();

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    updatePreferences(prefs);
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
      {/* Main Content */}
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
        {activeTab === 'settings' && (
          <SettingsScreen
            preferences={preferences}
            onResetOnboarding={handleResetOnboarding}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Recipe Detail Modal */}
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
