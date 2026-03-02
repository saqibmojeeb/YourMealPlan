import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { UserPreferences, DietaryPreference, CookingTime } from '@/types/meal';
import { Button } from '@/components/ui/button';
import { OnboardingProgress } from './OnboardingProgress';
import { DietaryStep } from './DietaryStep';
import { CookingTimeStep } from './CookingTimeStep';
import { PantryStep } from './PantryStep';
import { YourMealPlanLogo } from '../NomNomLogo';

interface OnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreferences: [],
    cookingTime: '30',
    pantryItems: [],
    servings: 2,
  });

  const totalSteps = 3;

  const toggleDietary = (pref: DietaryPreference) => {
    setPreferences(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(pref)
        ? prev.dietaryPreferences.filter(p => p !== pref)
        : [...prev.dietaryPreferences, pref],
    }));
  };

  const setCookingTime = (time: CookingTime) => {
    setPreferences(prev => ({ ...prev, cookingTime: time }));
  };

  const setPantryItems = (items: string[]) => {
    setPreferences(prev => ({ ...prev, pantryItems: items }));
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete(preferences);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="pt-8 pb-4 px-4 text-center">
        <YourMealPlanLogo size="lg" showTagline layout="stacked" />
        <div className="mt-6">
          <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-4">
        {step === 0 && (
          <DietaryStep
            selected={preferences.dietaryPreferences}
            onToggle={toggleDietary}
          />
        )}
        {step === 1 && (
          <CookingTimeStep
            selected={preferences.cookingTime}
            onSelect={setCookingTime}
          />
        )}
        {step === 2 && (
          <PantryStep
            items={preferences.pantryItems}
            onUpdate={setPantryItems}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 pb-8">
        <div className="flex gap-3">
          {step > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={prevStep}
              className="rounded-full px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            size="lg"
            onClick={nextStep}
            className="flex-1 rounded-full gap-2 gradient-bg text-primary-foreground"
          >
            {step === totalSteps - 1 ? (
              <>
                <Sparkles className="w-4 h-4" />
                Generate My Plan
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};
