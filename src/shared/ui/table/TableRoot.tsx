import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface TableRootProps {
  className?: string
}

export const TableRoot = forwardRef(({ className, children, ...props }: PropsWithChildren<TableRootProps>, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props}>
      {/* TableHeader */}
      {/* TableBody */}
      {children}
    </table>
  </div>
))

TableRoot.displayName = "Table"
