import { forwardRef, memo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { DialogTitleProps } from "@shared/dialog/types";

export const DialogTitle = memo(
  forwardRef<React.ComponentRef<typeof DialogPrimitive.Title>, DialogTitleProps>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )),
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;
