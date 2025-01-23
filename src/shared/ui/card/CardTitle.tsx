import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface CardTitleProps {
  className?: string
}

export const CardTitle = forwardRef(({ className, children, ...props }: PropsWithChildren<CardTitleProps>, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
))

CardTitle.displayName = "CardTitle"
