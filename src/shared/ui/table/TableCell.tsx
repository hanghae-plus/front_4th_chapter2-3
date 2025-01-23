import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface TableCellProps {
  className?: string
}

export const TableCell = forwardRef(({ className, children, ...props }: PropsWithChildren<TableCellProps>, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </td>
))
TableCell.displayName = "TableCell"
