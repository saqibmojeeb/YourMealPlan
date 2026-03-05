import { ChevronRight, User, Bell, Palette, HelpCircle, LogOut } from 'lucide-react';
import { UserPreferences, CookingTime } from '@/types/meal';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe';

interface SettingsScreenProps {
  preferences: UserPreferences;
  onResetOnboarding: () => void;
}

const settingsGroups = [
  {
    title: 'Account',
    items: [
      { id: 'profile', icon: User, label: 'Profile', value: 'Edit' },
      { id: 'notifications', icon: Bell, label: 'Notifications', value: 'On' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'theme', icon: Palette, label: 'Appearance', value: 'System' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', icon: HelpCircle, label: 'Help & FAQ', value: '' },
    ],
  },
];

const cookingTimeLabels: Record<CookingTime, string> = {
  '15': '15 minutes',
  '30': '30 minutes',
  '45': '45 minutes',
  '60': '60 minutes',
};

export const SettingsScreen = ({ preferences, onResetOnboarding }: SettingsScreenProps) => {
  const { user, subscribed, subscriptionTier } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
    navigate('/auth');
  };

  return (
    <div className="flex flex-col h-full">
      <header className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Settings
        </h1>
        {user && (
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        )}
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Subscription Status */}
        {subscribed && subscriptionTier && (
          <section className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Subscription
            </h3>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Current Plan</span>
                <span className="font-bold text-primary">{SUBSCRIPTION_TIERS[subscriptionTier].name}</span>
              </div>
            </div>
          </section>
        )}

        {/* Current Preferences Summary */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Your Meal Plan Settings
          </h3>
          <div className="bg-card rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Cooking time</span>
              <span className="font-medium text-foreground">
                {cookingTimeLabels[preferences.cookingTime]}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Dietary</span>
              <div className="text-right">
                {preferences.dietaryPreferences.length > 0 ? (
                  <span className="font-medium text-foreground">
                    {preferences.dietaryPreferences.join(', ')}
                  </span>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Pantry items</span>
              <span className="font-medium text-foreground">
                {preferences.pantryItems.length} items
              </span>
            </div>
            <button
              onClick={onResetOnboarding}
              className="w-full mt-2 text-primary font-medium text-sm hover:underline"
            >
              Update preferences
            </button>
          </div>
        </section>

        {/* Settings Groups */}
        {settingsGroups.map(group => (
          <section key={group.title} className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {group.title}
            </h3>
            <div className="bg-card rounded-2xl overflow-hidden">
              {group.items.map((item, index) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors text-left"
                  style={{
                    borderBottom: index < group.items.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                  }}
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 font-medium text-foreground">{item.label}</span>
                  {item.value && (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        ))}

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl hover:bg-secondary/50 transition-colors text-left mb-6"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="flex-1 font-medium text-destructive">Sign Out</span>
        </button>

        <p className="text-center text-sm text-muted-foreground mt-8">
          YourMealPlan v1.0.0
        </p>
      </div>
    </div>
  );
};
