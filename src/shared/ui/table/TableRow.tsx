import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface TableRowProps {
  className?: string
}

export const TableRow = forwardRef(({ className, children, ...props }: PropsWithChildren<TableRowProps>, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  >
    {/* TableCell */}
    {children}
  </tr>
))

TableRow.displayName = "TableRow"
