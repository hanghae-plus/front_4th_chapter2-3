import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export const CardContainer = forwardRef<HTMLDivElement, ComponentPropsWithRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  ),
)
CardContainer.displayName = "Card"
