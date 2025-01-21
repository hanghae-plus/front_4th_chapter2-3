import { forwardRef } from "react";
import { TableBodyProps } from "@shared/table/types";
import { cn } from "@/core/utils/cn.ts";

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";
