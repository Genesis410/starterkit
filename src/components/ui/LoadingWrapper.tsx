import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

interface LoadingWrapperProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  spinnerSize?: 'sm' | 'md' | 'lg';
}

export function LoadingWrapper({ 
  loading, 
  children, 
  className,
  spinnerSize = 'md'
}: LoadingWrapperProps) {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <LoadingSpinner size={spinnerSize} />
      </div>
    );
  }

  return <>{children}</>;
}