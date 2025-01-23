import { ReactNode, forwardRef } from "react"

interface Props{
  children?: ReactNode
  className?: string
}

// 테이블 컴포넌트
export const Table = forwardRef<HTMLTableElement, Props>(({ className, children, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} >{children}</table>
  </div>
))
Table.displayName = "Table"

export const TableHeader = forwardRef<HTMLTableSectionElement, Props>(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} >{children}</thead>
))
TableHeader.displayName = "TableHeader"

export const TableBody = forwardRef<HTMLTableSectionElement, Props>(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} >{children}</tbody>
))
TableBody.displayName = "TableBody"

export const TableRow = forwardRef<HTMLTableRowElement, Props>(({ className, children, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  >{children}</tr>
))
TableRow.displayName = "TableRow"

export const TableHead = forwardRef<HTMLTableHeaderCellElement, Props>(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >{children}</th>
))
TableHead.displayName = "TableHead"

export const TableCell = forwardRef<HTMLTableDataCellElement, Props>(({ className, children, ...props }, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} >{children}</td>
))
TableCell.displayName = "TableCell"
