import { forwardRef } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { ComponentPropsWithoutRef } from "react"

export const DialogTitle = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
)
DialogTitle.displayName = DialogPrimitive.Title.displayName
