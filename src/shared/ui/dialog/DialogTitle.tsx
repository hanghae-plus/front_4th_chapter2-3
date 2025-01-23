import * as DialogPrimitive from "@radix-ui/react-dialog"
import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

export const DialogTitle = forwardRef(
  (
    {
      className,
      children,
      ...props
    }: PropsWithChildren<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>>,
    ref,
  ) => (
    <DialogPrimitive.Title
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </DialogPrimitive.Title>
  ),
)

DialogTitle.displayName = DialogPrimitive.Title.displayName
