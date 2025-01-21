import { forwardRef } from 'react';

interface CardTitleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const CardTitle = forwardRef<HTMLInputElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';
