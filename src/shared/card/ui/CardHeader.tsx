import { forwardRef, memo } from "react";
import type { CardHeaderProps } from "@shared/card/types";

export const CardHeader = memo(
  forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  )),
);

CardHeader.displayName = "CardHeader";
