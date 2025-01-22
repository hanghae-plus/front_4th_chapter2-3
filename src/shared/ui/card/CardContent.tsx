import { forwardRef, HTMLAttributes } from 'react';

// 기본이 되는 타입 정의
type CardContentProps = HTMLAttributes<HTMLElement> & {
  className?: string;
};

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  ),
);
CardContent.displayName = 'CardContent';
