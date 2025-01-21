import { forwardRef, memo } from "react";
import { buttonVariants } from "@shared/button/config/variants.ts";
import { ButtonProps } from "@shared/button/types";

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
  }),
);

Button.displayName = "Button";
