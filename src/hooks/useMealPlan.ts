import { useState, useCallback } from 'react';
import { DayPlan, Recipe, UserPreferences } from '@/types/meal';
import { mockRecipes, getRecipesByType } from '@/data/mockRecipes';
import { addDays, format, startOfWeek } from 'date-fns';

const generateRandomMeal = (type: 'breakfast' | 'lunch' | 'dinner' | 'snack'): Recipe => {
  const recipes = getRecipesByType(type);
  return recipes[Math.floor(Math.random() * recipes.length)];
};

const generateWeekPlan = (): DayPlan[] => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const plan: DayPlan[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    plan.push({
      date: format(date, 'yyyy-MM-dd'),
      meals: {
        breakfast: generateRandomMeal('breakfast'),
        lunch: generateRandomMeal('lunch'),
        dinner: generateRandomMeal('dinner'),
        snack: Math.random() > 0.5 ? generateRandomMeal('snack') : undefined,
      },
    });
  }

  return plan;
};

export const useMealPlan = () => {
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(generateWeekPlan);
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreferences: [],
    cookingTime: '30',
    pantryItems: [],
    servings: 2,
  });

  const regeneratePlan = useCallback(() => {
    setWeekPlan(generateWeekPlan());
  }, []);

  const swapMeal = useCallback((dayIndex: number, mealType: keyof DayPlan['meals']) => {
    setWeekPlan(prev => {
      const newPlan = [...prev];
      const newMeal = generateRandomMeal(mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack');
      newPlan[dayIndex] = {
        ...newPlan[dayIndex],
        meals: {
          ...newPlan[dayIndex].meals,
          [mealType]: newMeal,
        },
      };
      return newPlan;
    });
  }, []);

  const updatePreferences = useCallback((newPrefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  }, []);

  return {
    weekPlan,
    preferences,
    regeneratePlan,
    swapMeal,
    updatePreferences,
  };
};
