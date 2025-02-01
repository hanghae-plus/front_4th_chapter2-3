import { forwardRef } from "react"
import { tableStyles } from "./styles"
import { TableProps } from "./types"

export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className={tableStyles.wrapper}>
    <table ref={ref} className={`${tableStyles.table} ${className}`} {...props} />
  </div>
))

Table.displayName = "Table"
