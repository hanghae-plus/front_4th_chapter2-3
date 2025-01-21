import { forwardRef } from 'react';

interface CardHeaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const CardHeader = forwardRef<HTMLInputElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';
