import { forwardRef } from "react";
import { CardContentProps } from "./Card.types";
import { cardStyles } from "./Card.styles";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, content, ...props }, ref) => (
  <div ref={ref} className={`${cardStyles[content]} ${className}`} {...props} />
))
CardContent.displayName = "CardContent"