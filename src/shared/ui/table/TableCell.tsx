import { forwardRef } from "react"
import { tableStyles } from "./styles"
import { TableCellProps } from "./types"

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td ref={ref} className={`${tableStyles.cell} ${className}`} {...props} />
))

TableCell.displayName = "TableCell"
