import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/preview', label: 'Weekly Plan' },
  { to: '/pricing', label: 'Pricing' },
];

export const TopNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        <Link to="/" className="font-serif font-bold text-lg text-foreground">
          YourMealPlan
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                location.pathname === link.to
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={user ? '/app' : '/auth'}
            className={cn(
              'ml-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors',
              user
                ? 'text-primary bg-primary/10'
                : 'gradient-bg text-primary-foreground'
            )}
          >
            {user ? 'My Plan' : 'Login'}
          </Link>
        </div>
      </div>
    </nav>
  );
};
