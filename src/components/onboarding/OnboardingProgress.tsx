import { cn } from '@/lib/utils';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress = ({ currentStep, totalSteps }: OnboardingProgressProps) => {
  return (
    <div className="flex items-center gap-2 px-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-1 rounded-full flex-1 transition-all duration-300',
            index < currentStep
              ? 'bg-primary'
              : index === currentStep
              ? 'bg-primary/50'
              : 'bg-border'
          )}
        />
      ))}
    </div>
  );
};
