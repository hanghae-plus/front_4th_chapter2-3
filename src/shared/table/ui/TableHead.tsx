import { forwardRef } from "react";
import { TableHeadProps } from "@shared/table/types";
import { cn } from "@/core/utils/cn.ts";
import { ArrowDown, ArrowUp } from "lucide-react";

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable, sorted, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        sortable && "cursor-pointer select-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortable && sorted && (
          <span className="w-4 h-4">
            {sorted === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          </span>
        )}
      </div>
    </th>
  ),
);
TableHead.displayName = "TableHead";
