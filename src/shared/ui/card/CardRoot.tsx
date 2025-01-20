import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface CardRootProps {
  className?: string
}

export const CardRoot = forwardRef(({ className, children, ...props }: PropsWithChildren<CardRootProps>, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {/* CardHeader */}
    {/* CartContent */}
    {children}
  </div>
))

CardRoot.displayName = "Card"
