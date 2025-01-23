import { forwardRef, HTMLAttributes } from 'react';

// 기본이 되는 타입 정의
type CardProps = HTMLAttributes<HTMLElement> & {
  className?: string;
};

// 카드 컴포넌트
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));

Card.displayName = 'Card';
