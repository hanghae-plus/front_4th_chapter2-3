import { forwardRef, memo } from "react";
import type { CardProps } from "@shared/card/types";
export const Card = memo(
  forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  )),
);

Card.displayName = "Card";
