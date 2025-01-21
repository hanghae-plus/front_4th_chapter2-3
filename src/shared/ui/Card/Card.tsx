// 카드 컴포넌트
import { forwardRef } from 'react';

interface CardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Card = forwardRef<HTMLInputElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = 'Card';
