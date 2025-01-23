import { forwardRef } from "react"

type TableProps = React.ComponentProps<"table">
type TableHeaderProps = React.ComponentProps<"thead">
type TableBodyProps = React.ComponentProps<"tbody">
type TableRowProps = React.ComponentProps<"tr">
type TableHeadProps = React.ComponentProps<"th">
type TableCellProps = React.ComponentProps<"td">

// 테이블 컴포넌트
export const Table = forwardRef(({ className, ref, ...props }: TableProps) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
))
Table.displayName = "Table"

export const TableHeader = forwardRef(({ className, ref, ...props }: TableHeaderProps) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

export const TableBody = forwardRef(({ className, ref, ...props }: TableBodyProps) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
))
TableBody.displayName = "TableBody"

export const TableRow = forwardRef(({ className, ref, ...props }: TableRowProps) => (
  <tr
    ref={ref}
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
    {...props}
  />
))
TableRow.displayName = "TableRow"

export const TableHead = forwardRef(({ className, ref, ...props }: TableHeadProps) => (
  <th
    ref={ref}
    className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))
TableHead.displayName = "TableHead"

export const TableCell = forwardRef(({ className, ref, ...props }: TableCellProps) => (
  <td ref={ref} className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
))
TableCell.displayName = "TableCell"
