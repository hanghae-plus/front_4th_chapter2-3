import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface TableBodyProps {
  className?: string
}

export const TableBody = forwardRef(({ className, children, ...props }: PropsWithChildren<TableBodyProps>, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
    {/* TableRow */}
    {children}
  </tbody>
))

TableBody.displayName = "TableBody"
