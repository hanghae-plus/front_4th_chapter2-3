import { forwardRef } from "react"
import { cn } from "../../lib/utils/cn"
import { TableCellProps } from "./Table.types"
import { tableStyles } from "./Table.styles"

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td 
      ref={ref} 
      className={cn(tableStyles.cell, className)} 
      {...props} 
    />
  )
)
TableCell.displayName = "TableCell"