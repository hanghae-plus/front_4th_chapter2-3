import { forwardRef } from "react";
import { TableRowProps } from "@shared/table/types";
import { cn } from "@/core/utils/cn.ts";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, selected, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b transition-colors hover:bg-muted/50 h-14", selected && "bg-muted", className)}
    data-state={selected ? "selected" : undefined}
    {...props}
  />
));
TableRow.displayName = "TableRow";
