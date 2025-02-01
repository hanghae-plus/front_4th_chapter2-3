import { forwardRef } from "react"
import { tableStyles } from "./styles"
import { TableBodyProps } from "./types"

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`${tableStyles.body} ${className}`} {...props} />
))

TableBody.displayName = "TableBody"
