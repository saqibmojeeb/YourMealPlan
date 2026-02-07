import { format, isToday, parseISO } from 'date-fns';
import { DayPlan, MealType, Recipe } from '@/types/meal';
import { MealCard } from './MealCard';
import { cn } from '@/lib/utils';

interface DayColumnProps {
  dayPlan: DayPlan;
  dayIndex: number;
  onSwapMeal: (dayIndex: number, mealType: keyof DayPlan['meals']) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

const mealOrder: (keyof DayPlan['meals'])[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export const DayColumn = ({ dayPlan, dayIndex, onSwapMeal, onSelectRecipe }: DayColumnProps) => {
  const date = parseISO(dayPlan.date);
  const today = isToday(date);

  return (
    <div className="day-column">
      <div
        className={cn(
          'sticky top-0 z-10 py-3 px-1 bg-background/95 backdrop-blur-sm',
          today && 'text-primary'
        )}
      >
        <p className={cn(
          'text-xs font-medium uppercase tracking-wider',
          today ? 'text-primary' : 'text-muted-foreground'
        )}>
          {format(date, 'EEE')}
        </p>
        <p className={cn(
          'text-lg font-semibold',
          today && 'text-primary'
        )}>
          {format(date, 'd')}
        </p>
        {today && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1" />
        )}
      </div>
      <div className="flex flex-col gap-2 pb-4">
        {mealOrder.map((mealType) => {
          const recipe = dayPlan.meals[mealType];
          if (!recipe) return null;
          return (
            <MealCard
              key={mealType}
              recipe={recipe}
              mealType={mealType as MealType}
              onSwap={() => onSwapMeal(dayIndex, mealType)}
              onClick={() => onSelectRecipe(recipe)}
              compact
            />
          );
        })}
      </div>
    </div>
  );
};
