import { X, Clock, Flame, Users, ChefHat } from 'lucide-react';
import { Recipe } from '@/types/meal';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeDetail = ({ recipe, onClose }: RecipeDetailProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-serif font-semibold text-foreground">
            Recipe Details
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-4 pb-8">
            {/* Recipe Image Placeholder */}
            <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
              <ChefHat className="w-16 h-16 text-primary/40" />
            </div>

            {/* Title & Meta */}
            <h1 className="text-2xl font-serif font-bold text-foreground mb-4">
              {recipe.name}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {recipe.prepTime + recipe.cookTime} min
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Flame className="w-4 h-4" />
                <span className="text-sm">{recipe.calories} cal</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">{recipe.servings} servings</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="chip chip-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Ingredients */}
            <section className="mb-8">
              <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                Ingredients
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>
                      <strong className="font-medium">{ingredient.amount} {ingredient.unit}</strong>
                      {' '}{ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                Instructions
              </h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-4"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-foreground pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
