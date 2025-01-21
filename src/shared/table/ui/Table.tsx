import { forwardRef } from "react";
import { TableProps } from "@shared/table/types";
import { cn } from "@shared/lib/cn";

export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, wrapperClassName, ...props }, ref) => (
  <div className={cn("w-full overflow-auto", wrapperClassName)}>
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
));
Table.displayName = "Table";
