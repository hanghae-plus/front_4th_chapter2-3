import { forwardRef } from "react";
import { CardProps } from "./Card.types";
import { cardStyles } from "./Card.styles";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, card, ...props }, ref) => (
  <div ref={ref} className={`${cardStyles[card]} ${className}`} {...props} />
   
))
Card.displayName = "Card"