import { forwardRef } from 'react';

interface CardContentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const CardContent = forwardRef<HTMLInputElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  ),
);
CardContent.displayName = 'CardContent';
