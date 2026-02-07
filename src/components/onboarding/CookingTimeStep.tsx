import { CookingTime } from '@/types/meal';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface CookingTimeStepProps {
  selected: CookingTime;
  onSelect: (time: CookingTime) => void;
}

const timeOptions: { id: CookingTime; label: string; description: string }[] = [
  { id: '15', label: '15 min', description: 'Quick & easy meals' },
  { id: '30', label: '30 min', description: 'Most popular choice' },
  { id: '45', label: '45 min', description: 'More variety' },
  { id: '60', label: '60 min', description: 'Weekend cooking' },
];

export const CookingTimeStep = ({ selected, onSelect }: CookingTimeStepProps) => {
  return (
    <div className="px-4 animate-fade-in">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
        How much time do you have?
      </h2>
      <p className="text-muted-foreground mb-8">
        We'll suggest recipes that fit your schedule.
      </p>

      <div className="space-y-3">
        {timeOptions.map(({ id, label, description }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/30'
              )}
            >
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              )}>
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-semibold text-foreground text-lg">{label}</span>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className={cn(
                'w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center',
                isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
              )}>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
