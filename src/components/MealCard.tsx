import { Clock, Flame, RefreshCw } from 'lucide-react';
import { Recipe, MealType } from '@/types/meal';
import { cn } from '@/lib/utils';

interface MealCardProps {
  recipe: Recipe;
  mealType: MealType;
  onSwap: () => void;
  onClick: () => void;
  compact?: boolean;
}

const mealTypeColors: Record<MealType, string> = {
  breakfast: 'bg-meal-breakfast/10 text-meal-breakfast border-meal-breakfast/20',
  lunch: 'bg-meal-lunch/10 text-meal-lunch border-meal-lunch/20',
  dinner: 'bg-meal-dinner/10 text-meal-dinner border-meal-dinner/20',
  snack: 'bg-meal-snack/10 text-meal-snack border-meal-snack/20',
};

const mealTypeLabels: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

export const MealCard = ({ recipe, mealType, onSwap, onClick, compact }: MealCardProps) => {
  return (
    <div
      className={cn(
        'meal-card cursor-pointer animate-fade-in relative group',
        compact ? 'p-3' : 'p-4'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span
            className={cn(
              'inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 border',
              mealTypeColors[mealType]
            )}
          >
            {mealTypeLabels[mealType]}
          </span>
          <h4 className={cn(
            'font-semibold text-foreground leading-tight',
            compact ? 'text-sm line-clamp-2' : 'text-base'
          )}>
            {recipe.name}
          </h4>
          <div className="flex items-center gap-3 mt-2 text-muted-foreground">
            <span className="flex items-center gap-1 text-xs">
              <Clock className="w-3.5 h-3.5" />
              {recipe.cookTime + recipe.prepTime}m
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Flame className="w-3.5 h-3.5" />
              {recipe.calories}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSwap();
          }}
          className="p-2 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Swap meal"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
