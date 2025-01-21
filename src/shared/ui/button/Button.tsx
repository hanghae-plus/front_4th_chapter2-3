import { forwardRef } from "react";
import { ButtonProps } from "./Button.types";
import { buttonVariants } from "./Button.style";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
  const classNames = `${buttonVariants({ variant, size })} ${className}`;
  return <button className={classNames} ref={ref} {...props} />
})

Button.displayName = "Button"