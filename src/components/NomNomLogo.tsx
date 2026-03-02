interface NomNomLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  layout?: 'horizontal' | 'stacked';
}

const SmilingBowl = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
    aria-hidden="true"
  >
    {/* Bowl */}
    <path 
      d="M4 14C4 14 4 24 16 24C28 24 28 14 28 14H4Z" 
      className="fill-accent"
    />
    {/* Bowl rim */}
    <path 
      d="M2 12C2 10.8954 2.89543 10 4 10H28C29.1046 10 30 10.8954 30 12V14H2V12Z" 
      className="fill-accent"
    />
    {/* Left eye */}
    <circle cx="11" cy="17" r="1.5" className="fill-accent-foreground" />
    {/* Right eye */}
    <circle cx="21" cy="17" r="1.5" className="fill-accent-foreground" />
    {/* Smile */}
    <path 
      d="M12 20C12 20 14 22 16 22C18 22 20 20 20 20" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      className="stroke-accent-foreground"
    />
  </svg>
);

export const YourMealPlanLogo = ({ size = 'md', showTagline = false, layout = 'horizontal' }: NomNomLogoProps) => {
  const sizeConfig = {
    sm: { text: 'text-xl', bowl: 'w-6 h-6', tagline: 'text-xs', gap: 'gap-1.5' },
    md: { text: 'text-2xl', bowl: 'w-8 h-8', tagline: 'text-sm', gap: 'gap-2' },
    lg: { text: 'text-4xl', bowl: 'w-12 h-12', tagline: 'text-base', gap: 'gap-3' },
  };

  const config = sizeConfig[size];

  if (layout === 'stacked') {
    return (
      <div className="flex flex-col items-center">
        <SmilingBowl className={config.bowl} />
        <h1 className={`font-serif font-bold tracking-tight text-foreground ${config.text} mt-1`}>
          YourMealPlan
        </h1>
        {showTagline && (
          <p className={`${config.tagline} text-muted-foreground mt-1 font-medium`}>
            Plan meals. Eat happy. 🍽️
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className={`flex items-center ${config.gap}`}>
        <SmilingBowl className={config.bowl} />
        <h1 className={`font-serif font-bold tracking-tight text-foreground ${config.text}`}>
          YourMealPlan
        </h1>
      </div>
      {showTagline && (
        <p className={`${config.tagline} text-muted-foreground mt-1 font-medium`}>
          Plan meals. Eat happy. 🍽️
        </p>
      )}
    </div>
  );
};

export const NomNomLogo = YourMealPlanLogo;
