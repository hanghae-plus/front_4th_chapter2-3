import { forwardRef } from "react";
import { cn } from "../../../shared/lib/utils/cn";
import { dialogStyles } from "./Dialog.styles";
import { DialogHeaderProps } from "./Dialog.types";

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dialogStyles.header, className)}
      {...props}
    />
  )
);
DialogHeader.displayName = "DialogHeader";