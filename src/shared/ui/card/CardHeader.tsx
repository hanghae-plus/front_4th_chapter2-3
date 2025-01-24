import { forwardRef } from "react";
import { CardHeaderProps } from "./Card.types";
import { cardStyles } from "./Card.styles";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, header, ...props }, ref) => (
  <div ref={ref} className={`${cardStyles[header]} ${className}`} {...props} />
))
CardHeader.displayName = "CardHeader"