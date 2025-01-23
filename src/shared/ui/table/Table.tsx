import { forwardRef } from "react"
import type { ComponentPropsWithRef } from "react"

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithRef<"table">>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))
Table.displayName = "Table"
