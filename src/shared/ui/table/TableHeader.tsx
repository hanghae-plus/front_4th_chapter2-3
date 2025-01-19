import { forwardRef } from "react"
import { tableStyles } from "./styles"
import { TableHeaderProps } from "./types"

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`${tableStyles.header} ${className}`} {...props} />
))

TableHeader.displayName = "TableHeader"
