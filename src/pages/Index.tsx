import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe, UserPreferences } from '@/types/meal';
import { useMealPlan } from '@/hooks/useMealPlan';
import { useAuth } from '@/contexts/AuthContext';
import { Onboarding } from '@/components/onboarding/Onboarding';
import { WeeklyPlanner } from '@/components/WeeklyPlanner';
import { RecipeDetail } from '@/components/RecipeDetail';
import { GroceryList } from '@/components/GroceryList';
import { SettingsScreen } from '@/components/SettingsScreen';
import { SubscriptionPricing } from '@/components/SubscriptionPricing';
import { BottomNav } from '@/components/BottomNav';
import { toast } from 'sonner';

type AppTab = 'planner' | 'grocery' | 'pricing' | 'settings';

const Index = () => {
  const { user, loading, subscribed } = useAuth();
  const navigate = useNavigate();
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>('planner');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const { weekPlan, preferences, regeneratePlan, swapMeal, updatePreferences } = useMealPlan();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Check for checkout result in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      toast.success('Subscription activated! 🎉');
      window.history.replaceState({}, '', '/app');
    } else if (params.get('checkout') === 'cancel') {
      toast.info('Checkout cancelled.');
      window.history.replaceState({}, '', '/app');
    }
  }, []);

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    updatePreferences(prefs);
    regeneratePlan();
    setHasOnboarded(true);
  };

  const handleResetOnboarding = () => {
    setHasOnboarded(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  // Show pricing if logged in but not subscribed and hasn't onboarded
  if (!subscribed && !hasOnboarded) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-8 max-w-lg mx-auto">
          <div className="text-center mb-4 px-4">
            <h1 className="text-xl font-serif font-bold text-foreground">Welcome! Choose a plan to get started</h1>
            <p className="text-sm text-muted-foreground mt-1">Subscribe to unlock personalized meal planning.</p>
          </div>
          <SubscriptionPricing />
        </div>
      </div>
    );
  }

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
