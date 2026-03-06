import { useMemo } from 'react';
import { getRecipesByType } from '@/data/mockRecipes';
import { format, addDays, startOfWeek } from 'date-fns';

export const SampleMealPreview = () => {
  const samplePlan = useMemo(() => {
    const breakfasts = getRecipesByType('breakfast');
    const lunches = getRecipesByType('lunch');
    const dinners = getRecipesByType('dinner');
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    return Array.from({ length: 7 }, (_, i) => ({
      day: format(addDays(start, i), 'EEE'),
      date: format(addDays(start, i), 'MMM d'),
      breakfast: breakfasts[i % breakfasts.length],
      lunch: lunches[i % lunches.length],
      dinner: dinners[i % dinners.length],
    }));
  }, []);

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
        {samplePlan.map((day) => (
          <div
            key={day.day}
            className="w-44 shrink-0 bg-card rounded-2xl border border-border p-3 space-y-2"
          >
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">{day.day}</p>
              <p className="text-xs text-muted-foreground">{day.date}</p>
            </div>

            {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => {
              const meal = day[mealType];
              const colorMap = {
                breakfast: 'bg-[hsl(var(--meal-breakfast))]',
                lunch: 'bg-[hsl(var(--meal-lunch))]',
                dinner: 'bg-[hsl(var(--meal-dinner))]',
              };
              return (
                <div key={mealType} className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${colorMap[mealType]}`} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {mealType}
                    </span>
                  </div>
                  <p className="text-xs text-foreground leading-tight line-clamp-2">
                    {meal.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {meal.calories} cal · {meal.cookTime} min
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
