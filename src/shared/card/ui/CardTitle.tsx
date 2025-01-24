import { forwardRef, memo } from "react";
import type { CardTitleProps } from "@shared/card/types";

export const CardTitle = memo(
  forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
    <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
  )),
);

CardTitle.displayName = "CardTitle";
