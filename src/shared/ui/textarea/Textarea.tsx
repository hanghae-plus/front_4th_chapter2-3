import { forwardRef } from "react";
import { TextareaProps } from "./Textarea.types";
import { textareaStyles } from "./Textarea.styles";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, base = "base", ...props }, ref) => {
  return (
    <textarea
      className={`${textareaStyles[base]} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"