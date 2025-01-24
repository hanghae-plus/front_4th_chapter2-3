import { forwardRef, memo } from "react";
import type { CardContentProps } from "@shared/card/types";

export const CardContent = memo(
  forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  )),
);

CardContent.displayName = "CardContent";
