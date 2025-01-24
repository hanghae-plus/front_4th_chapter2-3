import { forwardRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react"

// 테이블 컴포넌트
interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string
}
export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
))

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string
}
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
))

interface TableHeadProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  className?: string
}
export const TableHead = forwardRef<HTMLTableHeaderCellElement, TableHeadProps>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))

interface TableCellProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  className?: string
}

export const TableCell = forwardRef<HTMLTableDataCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
))

Table.displayName = "Table"
TableHeader.displayName = "TableHeader"
TableBody.displayName = "TableBody"
TableRow.displayName = "TableRow"
TableHead.displayName = "TableHead"
TableCell.displayName = "TableCell"
