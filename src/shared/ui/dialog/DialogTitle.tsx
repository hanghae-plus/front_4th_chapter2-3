import * as DialogPrimitive from "@radix-ui/react-dialog"
import { forwardRef } from "react"

type DialogTitleElement = React.ComponentRef<typeof DialogPrimitive.Title>
type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>

export const DialogTitle = forwardRef<DialogTitleElement, DialogTitleProps>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName
