import { forwardRef } from "react";
import { InputProps } from "./Input.types";
import { inputStyles } from "./Input.styles";

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`${inputStyles} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"