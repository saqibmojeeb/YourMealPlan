import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PantryStepProps {
  items: string[];
  onUpdate: (items: string[]) => void;
}

const suggestedItems = [
  'Olive oil', 'Salt', 'Pepper', 'Garlic', 'Onions', 'Rice', 
  'Pasta', 'Eggs', 'Chicken', 'Butter', 'Lemon', 'Soy sauce'
];

export const PantryStep = ({ items, onUpdate }: PantryStepProps) => {
  const [inputValue, setInputValue] = useState('');

  const addItem = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !items.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      onUpdate([...items, trimmed]);
    }
    setInputValue('');
  };

  const removeItem = (item: string) => {
    onUpdate(items.filter(i => i !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(inputValue);
    }
  };

  const availableSuggestions = suggestedItems.filter(
    s => !items.some(i => i.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="px-4 animate-fade-in">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
        What's in your pantry?
      </h2>
      <p className="text-muted-foreground mb-6">
        Add staples you usually have on hand.
      </p>

      {/* Input */}
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Add an ingredient..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-12 h-12 rounded-xl text-base"
        />
        <button
          onClick={() => addItem(inputValue)}
          disabled={!inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Selected Items */}
      {items.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-2">Your pantry</p>
          <div className="flex flex-wrap gap-2">
            {items.map(item => (
              <span
                key={item}
                className="chip chip-selected flex items-center gap-1.5 pr-1.5"
              >
                {item}
                <button
                  onClick={() => removeItem(item)}
                  className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {availableSuggestions.length > 0 && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Quick add</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 8).map(item => (
              <button
                key={item}
                onClick={() => addItem(item)}
                className="chip bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
