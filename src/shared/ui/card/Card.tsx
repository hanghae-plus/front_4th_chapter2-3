import * as React from 'react';
import { forwardRef } from 'react';

const baseCardStyles = 'rounded-lg border bg-card text-card-foreground shadow-sm';

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`${baseCardStyles} ${className}`} {...props} />
  ),
);

Card.displayName = 'Card';
