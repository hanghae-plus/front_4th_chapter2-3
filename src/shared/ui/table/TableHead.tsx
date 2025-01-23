import { forwardRef } from "react"

import type { PropsWithChildren } from "react"

interface TableHeadProps {
  className?: string
}

export const TableHead = forwardRef(({ className, children, ...props }: PropsWithChildren<TableHeadProps>, ref) => (
  <th
    ref={ref}
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </th>
))

TableHead.displayName = "TableHead"
