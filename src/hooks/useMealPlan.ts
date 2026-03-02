import { useState, useCallback } from 'react';
import { DayPlan, Recipe, UserPreferences } from '@/types/meal';
import { getRecipesByType, getFilteredRecipesByType } from '@/data/mockRecipes';
import { addDays, format, startOfWeek } from 'date-fns';

const generateRandomMeal = (type: 'breakfast' | 'lunch' | 'dinner' | 'snack', preferences: string[] = []): Recipe | undefined => {
  const recipes = preferences.length > 0 
    ? getFilteredRecipesByType(type, preferences)
    : getRecipesByType(type);
  if (recipes.length === 0) return undefined;
  return recipes[Math.floor(Math.random() * recipes.length)];
};

const generateWeekPlan = (preferences: string[] = []): DayPlan[] => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const plan: DayPlan[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    plan.push({
      date: format(date, 'yyyy-MM-dd'),
      meals: {
        breakfast: generateRandomMeal('breakfast', preferences),
        lunch: generateRandomMeal('lunch', preferences),
        dinner: generateRandomMeal('dinner', preferences),
      },
    });
  }

  return plan;
};

export const useMealPlan = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryPreferences: [],
    cookingTime: '30',
    pantryItems: [],
    servings: 2,
  });
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => generateWeekPlan());

  const regeneratePlan = useCallback(() => {
    setWeekPlan(generateWeekPlan(preferences.dietaryPreferences));
  }, [preferences.dietaryPreferences]);

  const swapMeal = useCallback((dayIndex: number, mealType: keyof DayPlan['meals']) => {
    setWeekPlan(prev => {
      const newPlan = [...prev];
      const newMeal = generateRandomMeal(
        mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
        preferences.dietaryPreferences
      );
      newPlan[dayIndex] = {
        ...newPlan[dayIndex],
        meals: {
          ...newPlan[dayIndex].meals,
          [mealType]: newMeal,
        },
      };
      return newPlan;
    });
  }, [preferences.dietaryPreferences]);

  const updatePreferences = useCallback((newPrefs: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs };
      return updated;
    });
  }, []);

  return {
    weekPlan,
    preferences,
    regeneratePlan,
    swapMeal,
    updatePreferences,
  };
};
