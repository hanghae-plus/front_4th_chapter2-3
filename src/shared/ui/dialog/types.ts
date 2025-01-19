import { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export interface DialogContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  className?: string
  children: ReactNode
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export interface DialogTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string
}
