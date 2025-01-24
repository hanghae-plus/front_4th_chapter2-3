import { forwardRef } from "react";
import { CardTitleProps } from "./Card.types";
import { cardStyles } from "./Card.styles";

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, title, ...props }, ref) => (
  <h3 ref={ref} className={`${cardStyles[title]} ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"