import { DietaryPreference } from '@/types/meal';
import { cn } from '@/lib/utils';
import { Leaf, Wheat, Milk, Fish, Flame, Apple } from 'lucide-react';

interface DietaryStepProps {
  selected: DietaryPreference[];
  onToggle: (pref: DietaryPreference) => void;
}

const dietaryOptions: { id: DietaryPreference; label: string; icon: typeof Leaf; description: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian', icon: Leaf, description: 'No meat or fish' },
  { id: 'vegan', label: 'Vegan', icon: Apple, description: 'No animal products' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: Wheat, description: 'No wheat or gluten' },
  { id: 'dairy-free', label: 'Dairy-Free', icon: Milk, description: 'No dairy products' },
  { id: 'keto', label: 'Keto', icon: Flame, description: 'Low carb, high fat' },
  { id: 'mediterranean', label: 'Mediterranean', icon: Fish, description: 'Healthy fats & seafood' },
];

export const DietaryStep = ({ selected, onToggle }: DietaryStepProps) => {
  return (
    <div className="px-4 animate-fade-in">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
        Dietary Preferences
      </h2>
      <p className="text-muted-foreground mb-8">
        Select all that apply. We'll customize your meal plans accordingly.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {dietaryOptions.map(({ id, label, icon: Icon, description }) => {
          const isSelected = selected.includes(id);
          return (
            <button
              key={id}
              onClick={() => onToggle(id)}
              className={cn(
                'flex flex-col items-start p-4 rounded-2xl border-2 transition-all duration-200 text-left',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/30'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors',
                isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-foreground">{label}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{description}</span>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-6">
        No restrictions? Just skip this step!
      </p>
    </div>
  );
};
