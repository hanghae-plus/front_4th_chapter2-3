import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface CardContentProps {
  className?: string
}

export const CardContent = forwardRef(({ className, children, ...props }: PropsWithChildren<CardContentProps>, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
))
CardContent.displayName = "CardContent"
