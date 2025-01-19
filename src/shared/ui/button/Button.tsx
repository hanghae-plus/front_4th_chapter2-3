import { forwardRef } from "react"
import { buttonVariants } from "./styles"
import { ButtonProps } from "./types"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
})

Button.displayName = "Button"
