import { RefreshCw } from 'lucide-react';
import { DayPlan, Recipe } from '@/types/meal';
import { DayColumn } from './DayColumn';
import { Button } from '@/components/ui/button';

interface WeeklyPlannerProps {
  weekPlan: DayPlan[];
  onSwapMeal: (dayIndex: number, mealType: keyof DayPlan['meals']) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onRegeneratePlan: () => void;
}

export const WeeklyPlanner = ({
  weekPlan,
  onSwapMeal,
  onSelectRecipe,
  onRegeneratePlan,
}: WeeklyPlannerProps) => {
  return (
    <div className="flex flex-col h-full">
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-foreground">
              Your Week
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Tap a meal to see details, swipe to swap
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRegeneratePlan}
            className="gap-2 rounded-full"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Regenerate</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto scrollbar-hide px-4">
        <div className="flex gap-3 pb-4" style={{ minWidth: 'max-content' }}>
          {weekPlan.map((dayPlan, index) => (
            <DayColumn
              key={dayPlan.date}
              dayPlan={dayPlan}
              dayIndex={index}
              onSwapMeal={onSwapMeal}
              onSelectRecipe={onSelectRecipe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
