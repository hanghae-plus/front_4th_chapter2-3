import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export const CardContent = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"
