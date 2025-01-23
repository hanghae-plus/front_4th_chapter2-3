import { TableHTMLAttributes } from "react"

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  className?: string
}

export interface TableHeaderProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export interface TableHeadProps extends TableHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export interface TableCellProps extends TableHTMLAttributes<HTMLTableCellElement> {
  className?: string
}
