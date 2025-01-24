import { forwardRef } from "react"
import { cn } from "../../lib/utils/cn"
import { TableProps } from "./Table.types"
import { tableStyles } from "./Table.styles"

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className={tableStyles.wrapper}>
      <table 
        ref={ref} 
        className={cn(tableStyles.table, className)} 
        {...props} 
      />
    </div>
  )
)
Table.displayName = "Table"