import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export const TableHeader = forwardRef<HTMLTableSectionElement, ComponentPropsWithRef<"thead">>(
  ({ className, ...props }, ref) => <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />,
)
TableHeader.displayName = "TableHeader"
