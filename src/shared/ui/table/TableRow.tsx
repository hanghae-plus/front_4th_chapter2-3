import { forwardRef } from "react"
import { tableStyles } from "./styles"
import { TableRowProps } from "./types"

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr ref={ref} className={`${tableStyles.row} ${className}`} {...props} />
))

TableRow.displayName = "TableRow"
