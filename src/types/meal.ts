export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type DietaryPreference = 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten-free' 
  | 'dairy-free' 
  | 'keto' 
  | 'paleo'
  | 'mediterranean'
  | 'low-carb';

export type CookingTime = '15' | '30' | '45' | '60';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  checked?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  type: MealType;
  cookTime: number;
  prepTime: number;
  calories: number;
  servings: number;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
}

export interface DayPlan {
  date: string;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snack?: Recipe;
  };
}

export interface UserPreferences {
  dietaryPreferences: DietaryPreference[];
  cookingTime: CookingTime;
  pantryItems: string[];
  servings: number;
}

export interface GroceryItem extends Ingredient {
  category: string;
  recipeId: string;
  recipeName: string;
}
