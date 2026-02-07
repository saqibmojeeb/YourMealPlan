import { CalendarDays, ListChecks, Settings, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: 'planner' | 'grocery' | 'settings';
  onTabChange: (tab: 'planner' | 'grocery' | 'settings') => void;
}

const navItems = [
  { id: 'planner' as const, icon: CalendarDays, label: 'Planner' },
  { id: 'grocery' as const, icon: ListChecks, label: 'Grocery' },
  { id: 'settings' as const, icon: Settings, label: 'Settings' },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200',
              activeTab === id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon
              className={cn(
                'w-6 h-6 transition-transform duration-200',
                activeTab === id && 'scale-110'
              )}
              strokeWidth={activeTab === id ? 2.5 : 2}
            />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
