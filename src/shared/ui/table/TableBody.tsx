import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export const TableBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithRef<"tbody">>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
  ),
)
TableBody.displayName = "TableBody"
