import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface TableHeaderProps {
  className?: string
}

export const TableHeader = forwardRef(({ className, children, ...props }: PropsWithChildren<TableHeaderProps>, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props}>
    {/* TableRow */}
    {children}
  </thead>
))

TableHeader.displayName = "TableHeader"
