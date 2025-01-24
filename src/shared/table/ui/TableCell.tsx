import { forwardRef } from "react";
import { TableCellProps } from "@shared/table/types";
import { cn } from "@/core/utils/cn.ts";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
));
TableCell.displayName = "TableCell";
