import { forwardRef } from "react"
import { cn } from "../../lib/utils/cn"
import { TableRowProps } from "./Table.types"
import { tableStyles } from "./Table.styles"

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableStyles.row, className)}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"