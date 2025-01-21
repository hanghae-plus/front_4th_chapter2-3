import { forwardRef } from "react"
import { cn } from "../../lib/utils/cn"
import { TableHeadProps } from "./Table.types"
import { tableStyles } from "./Table.styles"

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableStyles.head, className)}
      {...props}
    />
  )
)
TableHead.displayName = "TableHead"