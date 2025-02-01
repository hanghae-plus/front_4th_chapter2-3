import { forwardRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { dialogStyles } from "./styles"

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogPrimitive.DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={`${dialogStyles.title} ${className}`} {...props} />
  ),
)

DialogTitle.displayName = DialogPrimitive.Title.displayName
