import { useState, useMemo } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { DayPlan, GroceryItem } from '@/types/meal';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface GroceryListProps {
  weekPlan: DayPlan[];
}

const categorizeIngredient = (name: string): string => {
  const categories: Record<string, string[]> = {
    Produce: ['avocado', 'tomato', 'cucumber', 'pepper', 'asparagus', 'garlic', 'lemon', 'berries', 'basil', 'dill', 'greens', 'carrot'],
    Protein: ['chicken', 'salmon', 'egg', 'fish'],
    Dairy: ['yogurt', 'cheese', 'feta'],
    Grains: ['bread', 'quinoa', 'rice', 'oats', 'granola'],
    Pantry: ['olive oil', 'honey', 'soy sauce', 'fish sauce', 'hummus', 'peanut butter', 'chickpeas', 'olives', 'chocolate'],
    Spices: ['pepper flakes', 'sesame', 'chia'],
  };

  const lowerName = name.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return 'Other';
};

export const GroceryList = ({ weekPlan }: GroceryListProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const groceryItems = useMemo(() => {
    const items = new Map<string, GroceryItem>();

    weekPlan.forEach(day => {
      Object.values(day.meals).forEach(recipe => {
        if (!recipe) return;
        recipe.ingredients.forEach(ingredient => {
          const key = ingredient.name.toLowerCase();
          if (!items.has(key)) {
            items.set(key, {
              ...ingredient,
              category: categorizeIngredient(ingredient.name),
              recipeId: recipe.id,
              recipeName: recipe.name,
            });
          }
        });
      });
    });

    return Array.from(items.values());
  }, [weekPlan]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, GroceryItem[]> = {};
    groceryItems.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [groceryItems]);

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const checkedCount = checkedItems.size;
  const totalCount = groceryItems.length;

  return (
    <div className="flex flex-col h-full">
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-foreground">
              Grocery List
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {checkedCount} of {totalCount} items
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${(checkedCount / totalCount) * 100}%` }}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {Object.entries(groupedItems).map(([category, items]) => (
          <section key={category} className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {category}
            </h3>
            <div className="space-y-2">
              {items.map(item => {
                const isChecked = checkedItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl bg-card cursor-pointer transition-all duration-200',
                      isChecked && 'opacity-50'
                    )}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'font-medium text-foreground transition-all',
                        isChecked && 'line-through text-muted-foreground'
                      )}>
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.amount} {item.unit}
                      </p>
                    </div>
                    {isChecked && (
                      <Check className="w-5 h-5 text-primary animate-scale-in" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
