import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface CardHeaderProps {
  className?: string
}

export const CardHeader = forwardRef(({ className, children, ...props }: PropsWithChildren<CardHeaderProps>, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {/* CardTitle */}
    {children}
  </div>
))
CardHeader.displayName = "CardHeader"
