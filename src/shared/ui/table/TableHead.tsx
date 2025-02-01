import { forwardRef } from "react"
import { tableStyles } from "./styles"
import { TableHeadProps } from "./types"

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ className, ...props }, ref) => (
  <th ref={ref} className={`${tableStyles.head} ${className}`} {...props} />
))

TableHead.displayName = "TableHead"
