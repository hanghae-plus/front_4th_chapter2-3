import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithRef<"td">>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
  ),
)
TableCell.displayName = "TableCell"
