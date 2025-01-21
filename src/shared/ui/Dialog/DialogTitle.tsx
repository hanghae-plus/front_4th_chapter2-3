import { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
