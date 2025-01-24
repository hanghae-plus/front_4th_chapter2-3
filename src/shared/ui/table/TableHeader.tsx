import { forwardRef } from "react"
import { cn } from "../../lib/utils/cn"
import { TableHeaderProps } from "./Table.types"
import { tableStyles } from "./Table.styles"

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead 
      ref={ref} 
      className={cn(tableStyles.header, className)} 
      {...props} 
    />
  )
)
TableHeader.displayName = "TableHeader"