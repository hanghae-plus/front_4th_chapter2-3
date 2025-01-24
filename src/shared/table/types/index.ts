import React from "react";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sorted?: "asc" | "desc" | false;
}

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
