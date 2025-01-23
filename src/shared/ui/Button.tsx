import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '../config';
import { forwardRef } from 'react';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
  ),
);
Button.displayName = 'Button';

export default Button;
