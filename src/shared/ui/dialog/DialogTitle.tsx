import * as DialogPrimitive from "@radix-ui/react-dialog"
import { forwardRef } from "react"

export const DialogTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogTitle>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName
