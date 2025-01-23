import { forwardRef, HTMLAttributes } from 'react';

type CardTitleProps = HTMLAttributes<HTMLElement> & {
  className?: string;
};

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';
