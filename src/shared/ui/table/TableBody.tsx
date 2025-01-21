import { forwardRef } from "react"
import { cn } from "../../lib/utils/cn"
import { TableBodyProps } from "./Table.types"
import { tableStyles } from "./Table.styles"

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody 
      ref={ref} 
      className={cn(tableStyles.body, className)} 
      {...props} 
    />
  )
)
TableBody.displayName = "TableBody"