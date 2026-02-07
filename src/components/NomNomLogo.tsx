interface NomNomLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const NomNomLogo = ({ size = 'md', showTagline = false }: NomNomLogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const plateSizes = {
    sm: 'w-5 h-5 text-[10px]',
    md: 'w-6 h-6 text-xs',
    lg: 'w-10 h-10 text-base',
  };

  const PlateO = () => (
    <span 
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/80 text-accent-foreground font-bold ${plateSizes[size]}`}
      style={{ verticalAlign: 'middle', marginTop: '-2px' }}
    >
      ◡
    </span>
  );

  return (
    <div className="flex flex-col">
      <h1 className={`font-serif font-bold tracking-tight text-foreground ${sizeClasses[size]}`}>
        N<PlateO />mN<PlateO />m
      </h1>
      {showTagline && (
        <p className="text-sm text-muted-foreground mt-1 font-medium">
          Plan meals. Eat happy. 🍽️
        </p>
      )}
    </div>
  );
};
