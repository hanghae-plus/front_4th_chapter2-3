import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export const CardTitle = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<"h3">>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"
